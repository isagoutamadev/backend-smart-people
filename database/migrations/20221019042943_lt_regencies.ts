import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("lt_regencies", function (table) {
    table.increments("id").primary().notNullable();
    table.integer("province_id").unsigned().notNullable().references("lt_provinces.id");
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("lt_regencies");
}
