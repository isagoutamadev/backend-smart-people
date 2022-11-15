import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    // await knex("m_users").insert([
    //     { 
    //         id: "ab924e94-3f5e-49c9-be02-5896f1efc25b", 
    //         email: "admin@konekthing.com", 
    //         password: AuthHelper.encrypt("admin123"),
    //         is_active: 1,
    //         is_banned: 0,
    //         role_id: 1
    //     },
    //     { 
    //         id: "0b39090a-3566-46ad-89c5-f58c1824a570", 
    //         email: "ghisda@konekthing.com", 
    //         password: AuthHelper.encrypt("ghisda123"),
    //         is_active: 1,
    //         is_banned: 0,
    //         role_id: 3
    //     },
    //     { 
    //         id: "cfc22b87-f571-42e9-9fd7-9a0b0e73ecd1", 
    //         email: "endang@konekthing.com", 
    //         password: AuthHelper.encrypt("endang123"),
    //         is_active: 1,
    //         is_banned: 0,
    //         role_id: 2
    //     },
    // ]);
};
