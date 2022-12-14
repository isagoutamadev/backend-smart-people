import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("lt_roles").insert([
        { id: 1, name: "Super Admin" },
        { id: 2, name: "Admin Reservasi" },
        { id: 3, name: "PIC Provinsi" },
        { id: 4, name: "PIC Kota/Kabupaten" },
        { id: 5, name: "PIC Kecamatan" },
    ]);
};
