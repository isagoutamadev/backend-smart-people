import { Reservation, SearchReservation } from "@/models/reservation.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";
import { Knex } from "knex";

export class ReservationRepository {
    async get(search: SearchReservation, page: number, limit: number, sort?: string): Promise<Paging<Reservation>> {
        try {
            const select: Array<any> = [
                "reservation.id",
                "reservation.uuid",
                "reservation.institution",
                "reservation.institution_leader",
                "reservation.pic",
                "reservation.count",
                "reservation.reservation_time",
                knex.raw("max(o.created_at) as realization_time"),
            ];

            const query = knex("m_reservations as reservation").select(select);
            query.leftJoin("o_reservation_realizations as o", "o.reservation_id", "reservation.id");

            query.whereNull("reservation.deleted_at");

            query.groupBy("reservation.id");

            // const sortBy = search.sort_by || "reservation.institution";
            // const sortDirection = sort || "asc";

            // query.orderByRaw(sortBy + " " + sortDirection);

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            select.push(knex.raw("count(o.biometric) as realization_count"));

            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<Reservation>(
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

    async create(data: Reservation): Promise<void> {
        try {
            await knex("m_reservations").insert({
                ...data,
                created_at: knex.raw("now()")
            });
        } catch (error) {
            throw error;
        }
    }

    async findByUUID(uuid: string): Promise<Reservation | undefined> {
        try {
            const select = [
                "reservation.id",
                "reservation.uuid",
                "reservation.institution",
                "reservation.pic",
                "reservation.count",
                "reservation.reservation_date",
            ];
            return await knex("m_reservations").where("uuid", uuid)
                .whereNull("deleted_at").first();
        } catch (error) {
            throw error;
        }
    }

    async update(data: Reservation): Promise<void> {
        try {
            await knex("m_reservations").update({
                ...data,
                updated_at: knex.raw("now()")
            }).where("uuid", data.uuid);
        } catch (error) {
            throw error;
        }
    }

    async deleteByUUID(uuid: string): Promise<void> {
        try {
            await knex("m_reservations").update({
                deleted_at: knex.raw("now()")
            }).where("uuid", uuid);
        } catch (error) {
            throw error;
        }
    }
}