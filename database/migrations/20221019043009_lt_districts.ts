import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("lt_districts", function (table) {
    table.increments("id").primary().notNullable();
    table.integer("regency_id").unsigned().references("lt_regencies.id").notNullable();
    table.string("name").notNullable();
    table.string("alt_name").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("lt_districts");
}