import { DashboardReservationRealizationCount, DashboardReservationRealizationGraph, SearchDasboardReservationRealization } from "@/models/dashboard.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class DashboardRepository {
    async getReservationRealizationCount(search: SearchDasboardReservationRealization): Promise<DashboardReservationRealizationCount | undefined> {
        try {
            const queryMain = knex("m_reservations as reservation").select([
                "reservation.id",
                "reservation.count",
                knex.raw("count(o.biometric) as realization_count"),
            ]);
            queryMain.leftJoin("o_reservation_realizations as o", "o.reservation_id", "reservation.id");
            queryMain.whereNull("reservation.deleted_at");
            queryMain.groupBy("reservation.id");

            const select = [
                knex.raw("count(x.id) as total_reservation"),
                knex.raw("sum(x.count) as total_count_reservation"),
                knex.raw("sum(x.realization_count) as total_count_realization"),
            ];
            const query = knex().select(select).from(knex.raw(`(${queryMain.toQuery()}) x`)).first();

            const datas = await query;

            // @ts-ignore
            return datas;
        } catch (error) {
            throw error;
        }
    }
    
    async getReservationRealizationGraph(search: SearchDasboardReservationRealization): Promise<DashboardReservationRealizationGraph[]> {
        try {
            const select: any[] = [
                "reservation.id",
                "reservation.reservation_time",
                "reservation.count as total_count_reservation",
                knex.raw("count(o.biometric) as total_count_realization"),
            ];

            const query = knex("m_reservations as reservation").select(select);
            query.leftJoin("o_reservation_realizations as o", "o.reservation_id", "reservation.id");
            query.whereNull("reservation.deleted_at");
            query.groupBy("reservation.id");

            const selectGraph: any[] = [
                knex.raw("count(data.id) as total_reservation"),
                knex.raw("sum(data.total_count_realization) as total_count_realization"),
                knex.raw("sum(data.total_count_reservation) as total_count_reservation"),
            ];
            if (search.group_time === 'monthly') {
                selectGraph.push(knex.raw("CONVERT_TZ(CONCAT(YEAR(reservation_date), '-', MONTH(reservation_date), '-15 17:00:00'),'UTC','UTC') as datetime"));
            } else {
                selectGraph.push("reservation_time as datetime");
            }
            const queryGraph = knex().select(selectGraph).from(knex.raw(`(${query.toQuery()}) data`)).groupByRaw("datetime").orderByRaw("datetime asc");

            const datas = await queryGraph;

            return datas;
        } catch (error) {
            throw error;
        }
    }
}