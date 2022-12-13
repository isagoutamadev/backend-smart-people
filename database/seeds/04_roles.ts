import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("lt_roles").insert([
        { id: 1, name: "Super Admin" },
    ]);
};
