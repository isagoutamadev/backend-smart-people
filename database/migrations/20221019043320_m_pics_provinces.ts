import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_pics_provinces", function (table) {
        table.increments("id").primary().notNullable();
        table.uuid("uuid").unique().notNullable();
        table.integer("provinces_id").unsigned().notNullable().references("lt_provinces.id");
        table.integer("user_id").unsigned().unique().nullable().references("m_users.id");
        table.integer("created_by").unsigned().notNullable().references("m_users.id");
        table.integer("updated_by").unsigned().nullable().references("m_users.id");
        table.integer("deleted_by").unsigned().nullable().references("m_users.id");
        table.timestamps();
        table.timestamp("deleted_at").nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_pics_provinces");
}
