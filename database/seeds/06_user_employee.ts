import { Knex } from "knex";
import AuthHelper from "../../src/helpers/auth.helper";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("m_employees").insert([
        { 
            id: "97599bfe-de62-4b63-8fcd-7f762db11cf5", 
            name: "Admin",
            branch_company_id: "b06ad12b-7bdd-4dc9-a0b5-a6e342e8813c",
            district_id: 3276050,
        },
        { 
            id: "38f7c7ea-44d6-40f4-a4d4-02987b557754", 
            name: "Ghisda Gabriella",
            branch_company_id: "b06ad12b-7bdd-4dc9-a0b5-a6e342e8813c",
            district_id: 3276050,
        },
        { 
            id: "388984e6-7635-422b-91c7-514f2198f00d", 
            name: "Mas Endang",
            branch_company_id: "b06ad12b-7bdd-4dc9-a0b5-a6e342e8813c",
            district_id: 3276050,
        },
    ]);

    await knex("m_users").insert([
        { 
            id: "ab924e94-3f5e-49c9-be02-5896f1efc25b", 
            email: "admin@konekthing.com", 
            password: AuthHelper.encrypt("admin123"),
            is_active: 1,
            is_banned: 0,
            employee_id: "97599bfe-de62-4b63-8fcd-7f762db11cf5",
            role_id: 1
        },
        { 
            id: "0b39090a-3566-46ad-89c5-f58c1824a570", 
            email: "ghisda@konekthing.com", 
            password: AuthHelper.encrypt("ghisda123"),
            is_active: 1,
            is_banned: 0,
            employee_id: "38f7c7ea-44d6-40f4-a4d4-02987b557754",
            role_id: 3
        },
        { 
            id: "cfc22b87-f571-42e9-9fd7-9a0b0e73ecd1", 
            email: "endang@konekthing.com", 
            password: AuthHelper.encrypt("endang123"),
            is_active: 1,
            is_banned: 0,
            employee_id: "388984e6-7635-422b-91c7-514f2198f00d",
            role_id: 2
        },
    ]);
};
