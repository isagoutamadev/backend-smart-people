import { Knex } from "knex";
import * as districts from "./districts.json";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("lt_districts").insert(districts.map(item => {
        return {
            id: item.id,
            name: item.name,
            regency_id: item.regency_id,
            alt_name: item.alt_name
        }
    }));
};
