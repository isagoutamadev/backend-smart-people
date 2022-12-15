export interface Role {
    id?: number,
    name?: String,
}

export interface Province {
    id?: number,
    name?: String,
}

export interface Regency {
    id?: number,
    name?: String,
    province_id?: number,
    provinces?: Province,
}

export interface District {
    id?: number,
    name?: String,
    regency_id?: number,    
    regency?: Regency,
}