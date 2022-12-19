import { Institution } from "@/models/institution.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class InstitutionRepository {
    async get(search: Institution, page: number, limit: number): Promise<Paging<Institution>> {
        try {
            const select = [
                "institution.id",
                "institution.uuid",
                "institution.name",
                "institution.pic_id",
                "pic.name as pic",
                "institution.district_id",
                knex.raw("JSON_OBJECT('id', district.id, 'name', district.name) as district"),
            ];

            const query = knex("m_institutions as institution").select(select);
            query.innerJoin("m_users as pic", "pic.id", "institution.pic_id");

            query.innerJoin("lt_districts as district", "district.id", "institution.district_id");
            query.innerJoin("lt_regencies as regency", "regency.id", "district.regency_id");
            query.innerJoin("lt_provinces as province", "province.id", "regency.province_id");

            query.whereNull("institution.deleted_at");

            const offset = limit * page - limit;
            const queryCount = knex().count("id as total").from(knex.raw(`(${query.toQuery()}) x`)).first();

            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<Institution>(
                datas.map(data => {
                    return {
                        ...data,
                        district: JSON.parse(data.district)
                    }
                }),
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
    
    async findByUUID(uuid: string): Promise<Institution> {
        try {
            const select = [
                "institution.id",
                "institution.uuid",
                "institution.name",
                "pic.name as pic",
                "institution.district_id",
                knex.raw("JSON_OBJECT('id', district.id, 'name', district.name) as district"),
            ];

            const query = knex("m_institutions as institution").select(select);
            query.innerJoin("m_users as pic", "pic.id", "institution.pic_id");

            query.innerJoin("lt_districts as district", "district.id", "institution.district_id");
            query.innerJoin("lt_regencies as regency", "regency.id", "district.regency_id");
            query.innerJoin("lt_provinces as province", "province.id", "regency.province_id");

            query.where("institution.uuid", uuid);
            query.whereNull("institution.deleted_at");

            const data = await query.first();
            if (data) {
                return {
                    ...data,
                    district: JSON.parse(data.district)
                }
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async create(data: Institution): Promise<void> {
        try {
            await knex("m_institutions").insert({
                ...data,
                created_at: knex.raw("now()")
            });
        } catch (error) {
            throw error;
        }
    }
    
    async update(data: Institution): Promise<void> {
        try {
            await knex("m_institutions").update({
                ...data,
                updated_at: knex.raw("now()")
            }).where("uuid", data.uuid);
        } catch (error) {
            throw error;
        }
    }
    
    async delete(uuid: string): Promise<void> {
        try {
            await knex("m_institutions").update({
                name: knex.raw("concat('deleted-', name, uuid)"),
                deleted_at: knex.raw("now()")
            }).where("uuid", uuid).whereNull("deleted_at");
        } catch (error) {
            throw error;
        }
    }
}