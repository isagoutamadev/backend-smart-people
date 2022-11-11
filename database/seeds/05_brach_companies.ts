import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("m_branch_companies").insert([
        { 
            id: "b06ad12b-7bdd-4dc9-a0b5-a6e342e8813c", 
            name: "Konekthing Depok",
            user_id: "cfc22b87-f571-42e9-9fd7-9a0b0e73ecd1",
            district_id: 3276050,
            address: "Kemiri Muka, Beji, Depok City, West Java, Indonesia"
        }
    ]);
};
