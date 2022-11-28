export interface Reservation {
    id?: number,
    uuid?: string,
    institution?: string,
    institution_leader?: string,
    pic?: string,
    count?: number,
    reservation_time?: Date,
    realization_time?: Date,
    realization_count?: number,
    deactivated_time?: Date,
}

export interface SearchReservation {
    institution?: string,
    uuid?: string,
    pic?: string,
    sort_by?: string,
    fields?: string,
}