import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_users").del();
    await knex("m_employees").del();
    await knex("lt_roles").del();
    await knex("m_branch_companies").del();
    await knex("lt_districts").del();
    await knex("lt_regencies").del();
    await knex("lt_provinces").del();
};
