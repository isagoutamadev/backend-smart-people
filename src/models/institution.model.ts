import { District } from "./lt.model";

export interface Institution {
    id?: number,
    uuid?: string,
    district_id?: number,
    district?: District,
    pic_id?: number,
    name?: String,
}