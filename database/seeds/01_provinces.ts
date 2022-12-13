import { Knex } from "knex";
import * as provinces from "./provinces.json"

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("lt_provinces").insert(provinces.map(item => {
        return {
            id: item.id,
            name: item.name
        }
    }));
};
