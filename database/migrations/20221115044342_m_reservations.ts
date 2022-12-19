import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("m_reservations", function (table) {
        table.increments("id").primary().notNullable();
        table.uuid("uuid").unique().notNullable();
        table.integer("institution_id").unsigned().notNullable().references("m_institutions.id");
        table.string("leader").notNullable();
        table.integer("count").unsigned().notNullable();
        table.dateTime("reservation_time").notNullable();
        table.timestamps();
        table.timestamp("realization_time").nullable();
        table.timestamp("deleted_at").nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("m_reservations");
}

