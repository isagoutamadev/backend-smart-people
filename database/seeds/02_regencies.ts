import { Knex } from "knex";
import * as regencies from "./regencies.json";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("lt_regencies").insert(regencies.map(item => {
        return {
            id: item.id,
            name: item.name,
            province_id: item.province_id
        }
    }));
};
