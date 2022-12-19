import { PicProvince } from "@/models/pic-province.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class PicProvinceRepository {
    async get(search: PicProvince, page: number, limit: number): Promise<Paging<PicProvince>> {
        try {
            const select = [
                "id",
            ];

            const query = knex("").select(select);

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`${query.toQuery()} x`)).first();

            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<PicProvince>(
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
}