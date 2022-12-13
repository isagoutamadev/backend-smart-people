import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_organizations_districts", function (table) {
        table.increments("id").primary().notNullable();
        table.uuid("uuid").unique().notNullable();
        table.integer("district_id").unsigned().notNullable().references("lt_districts.id");
        table.integer("org_regency_id").unsigned().notNullable().references("m_organizations_regencies.id");
        table.integer("pic").unsigned().unique().nullable().references("m_users.id");
        table.string("name", 50).unique().nullable();
        table.timestamps();
        table.timestamp("deleted_at").nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_organizations_districts");
}
