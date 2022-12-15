import { District, Province, Regency, Role } from "@/models/lt.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class LtRepository {
    async getRoles(page: number, limit: number): Promise<Paging<Role>> {
        try {
            const select = [
                "id",
                "name"
            ];

            const query = knex("lt_roles").select(select);

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<Role>(
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
    
    async getProvinces(page: number, limit: number): Promise<Paging<Province>> {
        try {
            const select = [
                "id",
                "name"
            ];

            const query = knex("lt_provinces").select(select);

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            query.orderBy("name", "asc");
            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<Province>(
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
    
    async getRegency(search: Regency,page: number, limit: number): Promise<Paging<Regency>> {
        try {
            const select = [
                "id",
                "name"
            ];

            const query = knex("lt_regencies").select(select);

            if (search.province_id) {
                query.where("province_id", search.province_id);
            }

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            query.orderBy("name", "asc");
            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<Regency>(
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
    
    async getDistricts(search: District,page: number, limit: number): Promise<Paging<District>> {
        try {
            const select = [
                "id",
                "name"
            ];

            const query = knex("lt_districts").select(select);

            if (search.regency_id) {
                query.where("regency_id", search.regency_id);
            }

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            query.orderBy("name", "asc");
            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<District>(
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