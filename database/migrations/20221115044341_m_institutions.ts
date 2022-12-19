import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_institutions", function (table) {
        table.increments("id").primary().notNullable();
        table.uuid("uuid").unique().notNullable();
        table.integer("district_id").unsigned().notNullable().references("lt_districts.id");
        table.integer("pic_id").unsigned().nullable().references("m_users.id");
        table.string("name").unique().nullable();
        table.timestamps();
        table.timestamp("deleted_at").nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_institutions");
}
