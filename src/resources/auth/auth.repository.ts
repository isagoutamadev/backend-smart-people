import { User } from "@/models/user.model";
import knex from "@/utils/knex/knex"

export class AuthRepository {
    public findByEmailOrUsername = async (useremail: string): Promise<User|undefined> => {
        try {
            const select = [
                "user.id",
                "user.email",
                "user.username",
                "user.password",
            ];

            const query = knex("m_users as user").select(select)
            .where("user.email", useremail).orWhere("user.username", useremail)
            .first();

            const user = await query
            if (user) {
                return {
                    ...user,
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