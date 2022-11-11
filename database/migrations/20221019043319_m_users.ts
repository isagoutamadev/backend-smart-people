import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("m_users", function (table) {
    table.uuid("id").primary().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.boolean("is_active").notNullable();
    table.boolean("is_banned").notNullable();
    table.timestamp("last_login").nullable();
    table.uuid("employee_id").unique().references("m_employees.id").notNullable();
    table.integer("role_id").unsigned().references("lt_roles.id").notNullable();
    table.string("device_id").nullable();
    table.string("fcm_token").nullable();
    table.uuid("created_by").nullable();
    table.uuid("updated_by").nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("m_users");
}
