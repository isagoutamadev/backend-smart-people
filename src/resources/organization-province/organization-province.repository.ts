import { OrganizationProvince } from "@/models/organization-province.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class OrganizationProvinceRepository {
    async get(search: OrganizationProvince, page: number, limit: number): Promise<Paging<OrganizationProvince>> {
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
            const pagination = new Pagination<OrganizationProvince>(
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