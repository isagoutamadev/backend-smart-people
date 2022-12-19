import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("m_users", function (table) {
    table.increments("id").primary().notNullable();
    table.uuid("uuid").unique().notNullable();
    table.integer("role_id").unsigned().notNullable().references("lt_roles.id");
    table.string("name", 50).notNullable();
    table.string("username", 50).unique().notNullable();
    table.string("email", 50).unique().notNullable();
    table.string("password").notNullable();
    table.integer("created_by").unsigned().notNullable().references("m_users.id");
    table.integer("updated_by").unsigned().nullable().references("m_users.id");
    table.integer("deleted_by").unsigned().nullable().references("m_users.id");
    table.timestamps();
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  // return knex.schema.dropTable("m_users");
}
