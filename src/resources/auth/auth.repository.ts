import { User } from "@/models/user.model";
import knex from "@/utils/knex/knex"

export class AuthRepository {
    public findByEmail = async (email: string): Promise<User|undefined> => {
        try {
            const select = [
                "user.id",
                "user.email",
                "user.password",
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
            .where("user.email", email)
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
    
    async updateById (user: User): Promise<void> {
        try {
            await knex("m_users").update({
                ...user
            }).where("id", user.id);
        } catch (error) {
            throw error;
        }
    }
}