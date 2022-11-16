export interface Reservation {
    id?: number,
    uuid?: string,
    institution?: string,
    pic?: string,
    count?: number,
    reservation_date?: Date,
    realization_date?: Date,
}

export interface SearchReservation {
    institution?: string,
    pic?: string,
    sort_by?: string,
}