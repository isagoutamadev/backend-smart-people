import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    await knex("m_users").insert([
        { 
            uuid: "ab924e94-3f5e-49c9-be02-5896f1efc25b", 
            email: "admin@konekthing.com",
            role_id: 1,
            username: "admin", 
            password: AuthHelper.encrypt("admin"),
        },
        { 
            uuid: "bc924e94-3f5e-49c9-be02-5896f1efc25b", 
            email: "jakarta@konekthing.com",
            role_id: 3,
            username: "jakarta", 
            password: AuthHelper.encrypt("jakarta"),
        },
        { 
            uuid: "cd924e94-3f5e-49c9-be02-5896f1efc25b", 
            email: "jaktim@konekthing.com",
            role_id: 4,
            username: "jaktim", 
            password: AuthHelper.encrypt("jaktim"),
        },
        { 
            uuid: "de924e94-3f5e-49c9-be02-5896f1efc25b", 
            email: "jatinegara@konekthing.com",
            role_id: 5,
            username: "jatinegara", 
            password: AuthHelper.encrypt("jatinegara"),
        },
    ]);
};
