import { ReservationRealization, SearchReservationRealization } from "@/models/reservation-realization.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class ReservationRealizationRepository {
    async get(search: SearchReservationRealization, page: number, limit: number, sort?: string): Promise<Paging<ReservationRealization>> {
        try {
            const select = [
                "reservation.id",
                "reservation.uuid",
                "reservation.institution",
                "reservation.pic",
                "reservation.reservation_date",
                "reservation.realization_date",
                knex.raw("count(o.*) as realization_count")
            ];

            const query = knex("m_reservations as reservation").select(select);

            query.leftJoin("o_reservation_realizations as o", "o.reservation_id", "reservation.id");

            query.groupBy("reservation.id");
            const sortBy = search.sort_by || "reservation.institution";
            const sortDirection = sort || "asc";

            query.orderByRaw(sortBy + " " + sortDirection);

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`${query.toQuery()} x`)).first();

            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<ReservationRealization>(
                datas,
                //@ts-ignore
                count.total,
                page,
                limit
            );

            return pagination.getPaging();
        } catch (error) {
            throw error;
        }
    }

    async find(search: SearchReservationRealization): Promise<ReservationRealization | undefined> {
        try {
            const select  = [
                "o.biometric",
            ];
            const query = knex("o_reservation_realizations as o");
            query.innerJoin("m_reservations as reservation", "reservation.id", "o.reservation_id");
            query.whereNull("reservation.deleted_at");
            if (search.reservation_uuid) {
                query.where("reservation.uuid", search.reservation_uuid);
            }
            if (search.reservation_id) {
                query.where("reservation.id", search.reservation_id);
            }
            if (search.biometric) {
                query.where("biometric", search.biometric);
            }
            return await query.first();
        } catch (error) {
            throw error;
        }
    }

    async create(data: ReservationRealization): Promise<void> {
        try {
            await knex("o_reservation_realizations").insert({
                ...data,
                captured_date: knex.raw("now()"),
            });
        } catch (error) {
            throw error;
        }
    }
}