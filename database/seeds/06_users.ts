import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    await knex("m_users").insert([
        {
            id: 1,
            uuid: "ab924e94-3f5e-49c9-be02-5896f1efc25b",
            name: "Super Admin",
            email: "admin@konekthing.com",
            role_id: 1,
            username: "admin", 
            password: AuthHelper.encrypt("admin"),
            created_by: 1,
        },
        {
            id: 2,
            uuid: "bc924e94-3f5e-49c9-be02-5896f1efc25b",
            name: "PIC Jakarta",
            email: "jakarta@konekthing.com",
            role_id: 3,
            username: "jakarta", 
            password: AuthHelper.encrypt("jakarta"),
            created_by: 1,
        },
        {
            id: 3,
            uuid: "cd924e94-3f5e-49c9-be02-5896f1efc25b", 
            name: "PIC Jaktim",
            email: "jaktim@konekthing.com",
            role_id: 4,
            username: "jaktim", 
            password: AuthHelper.encrypt("jaktim"),
            created_by: 1,
        },
        {
            id: 4,
            uuid: "de924e94-3f5e-49c9-be02-5896f1efc25b",
            name: "PIC Jatinegara",
            email: "jatinegara@konekthing.com",
            role_id: 5,
            username: "jatinegara", 
            password: AuthHelper.encrypt("jatinegara"),
            created_by: 1,
        },
    ]);
};
