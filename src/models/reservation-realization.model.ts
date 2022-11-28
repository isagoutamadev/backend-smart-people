import { Reservation } from "./reservation.model";

export interface ReservationRealization {
    reservation_id?: number;
    reservation?: Reservation;
    biometric?: string;
}

export interface BodyReservationRealization {
    reservation_uuid: string;
    biometric?: string;
}

export interface SearchReservationRealization {
    sort_by?: string;
    reservation_uuid?: string;
    reservation_id?: number;
    biometric?: string;
}