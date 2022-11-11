import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("lt_roles").insert([
        { id: 1, name: "GA Admin" },
        { id: 2, name: "PIC/Koordinator" },
        { id: 3, name: "Pegawai" }
    ]);
};
