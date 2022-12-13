export interface DashboardReservationRealizationCount {
    total_reservation?: number;
    total_count_reservation?: number;
    total_count_realization?: number;
}

export interface DashboardReservationRealizationGraph {
    datetime?: Date;
    total_count_reservation?: number;
    total_count_realization?: number;
}

export interface SearchDasboardReservationRealization {
    start_date?: Date;
    end_date?: Date;
    group_time?: string;
    reservation_uuid?: string;
}