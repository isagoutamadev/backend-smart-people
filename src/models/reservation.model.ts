export interface Reservation {
    id?: number,
    uuid?: string,
    institution?: string,
    institution_leader?: string,
    pic?: string,
    count?: number,
    reservation_time?: Date,
    realization_time?: Date,
    deactifated_time?: Date,
}

export interface SearchReservation {
    institution?: string,
    pic?: string,
    sort_by?: string,
}