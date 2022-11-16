import { User } from "@/models/user.model";
import knex from "@/utils/knex/knex"
import { Pagination, Paging } from "@/utils/responses/pagination.response";

export class UserRepository {
    async get(search: User, page: number, limit: number): Promise<Paging<User>> {
        try {
            const select = [
                "user.id",
                "user.email",
                "user.role_id",
                "user.is_active",
                "user.is_banned",
                knex.raw(`JSON_OBJECT(
                    'id', employee.id,
                    'name', employee.name,
                    'picture', employee.picture,
                    'address', employee.address
                ) as employee`),
                knex.raw(`JSON_OBJECT(
                    'id', role.id,
                    'name', role.name
                ) as role`),
            ];

            const query = knex("m_users as user").select(select)
                .innerJoin("m_employees as employee", "employee.id", "user.employee_id")
                .innerJoin("lt_roles as role", "role.id", "user.role_id");

            if (search.role_id) {
                query.where("user.role_id", search.role_id);
            }

            if (search.email) {
                query.whereILike("user.email", search.email);
            }

            const offset = limit * page - limit;
            const queryCount = knex().count('id as total').from(knex.raw(`(${query.toQuery()}) x`)).first();

            const [datas, count] = await Promise.all([
                await query.limit(limit).offset(offset),
                await queryCount
            ]);
            const pagination = new Pagination<User>(
                datas.map((item: User) => {
                    return {
                        ...item,
                        // @ts-ignore
                        role: JSON.parse(item.role),
                        // @ts-ignore
                        employee: JSON.parse(item.employee),
                    };
                }),
                // @ts-ignore 
                count.total,
                page,
                limit
            );

            return pagination.getPaging();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<User | undefined> {
        try {
            const select = [
                "user.id",
                "user.email",
                "user.role_id",
                "user.is_active",
                "user.is_banned",
                knex.raw(`JSON_OBJECT(
                    'id', employee.id,
                    'name', employee.name,
                    'picture', employee.picture,
                    'address', employee.address
                ) as employee`),
                knex.raw(`JSON_OBJECT(
                    'id', role.id,
                    'name', role.name
                ) as role`),
            ];

            const query = knex("m_users as user").select(select)
                .innerJoin("m_employees as employee", "employee.id", "user.employee_id")
                .innerJoin("lt_roles as role", "role.id", "user.role_id")
                .where("user.id", id)
                .first();

            const user = await query
            if (user) {
                return {
                    ...user,
                    // @ts-ignore
                    role: JSON.parse(user.role),
                    // @ts-ignore
                    employee: JSON.parse(user.employee),
                }
            }
            return undefined;
        } catch (error) {
            throw error;
        }
    }

    async create(user: User): Promise<void> {
        try {
            await knex("m_users").insert({
                ...user,
                created_at: knex.raw("now()"),
            });
        } catch (error) {
            throw error;
        }
    }
}