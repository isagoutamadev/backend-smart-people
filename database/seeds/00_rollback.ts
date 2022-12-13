import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_users").del();
    await knex("lt_roles").del();
    await knex("lt_districts").del();
    await knex("lt_regencies").del();
    await knex("lt_provinces").del();
    await knex("m_institutions").del();
    await knex("m_reservations").del();
};
