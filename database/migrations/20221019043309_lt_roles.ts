import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("lt_roles", function (table) {
    table.increments("id").primary().notNullable();
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("lt_roles");
}
