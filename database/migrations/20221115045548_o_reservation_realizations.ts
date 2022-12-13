import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("o_reservation_realizations", function (table) {
        table.integer("reservation_id").unsigned().notNullable().references("m_reservations.id");
        table.string("biometric").unique().notNullable();
        table.date("captured_date").notNullable();
        table.string("captured_picture").nullable();
        table.timestamp("created_at").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("o_reservation_realizations");
}