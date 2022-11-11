import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("m_employees", function (table) {
    table.uuid("id").primary().notNullable();
    table.string("name").notNullable();
    table.uuid("branch_company_id").notNullable();
    table.integer("district_id").unsigned().references("lt_districts.id").notNullable();
    table.string("picture").nullable();
    table.text("address").nullable();
    table.uuid("created_by").nullable();
    table.uuid("updated_by").nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("m_employees");
}