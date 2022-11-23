import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    await knex("m_users").insert([
        { 
            uuid: "ab924e94-3f5e-49c9-be02-5896f1efc25b", 
            email: "admin@konekthing.com", 
            username: "admin", 
            password: AuthHelper.encrypt("admin"),
        },
    ]);
};
