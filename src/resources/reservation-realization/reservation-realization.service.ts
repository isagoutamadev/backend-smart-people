import { BodyReservationRealization, ReservationRealization } from "@/models/reservation-realization.model";
import { Paging } from "@/utils/responses/pagination.response";
import { ReservationRealizationRepository } from "./reservation-realization.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { ReservationRepository } from "../reservation/reservation.repository";

export class ReservationRealizationService {
    private repository = new ReservationRealizationRepository();
    private reservationRepository = new ReservationRepository();
    public get = async (search: ReservationRealization, page: number, limit: number): Promise<Paging<ReservationRealization>> => {
        try {
            const result = await this.repository.get(search, page, limit);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public create = async (data: ReservationRealization): Promise<ReservationRealization> => {
        try {
            const reservation = await this.reservationRepository.findByID(Number(data.reservation_id));
            if (!reservation) {
                throw new HttpException("Reservation not found", ResponseCode.NOT_FOUND);
            }

            if (!reservation.realization_time) {
                throw new HttpException("Reservasi belum diaktifasi", ResponseCode.UNPROCESSABLE_ENTITY);
            }
            
            if (reservation.deactivated_time) {
                throw new HttpException("Reservasi telah dinonaktifkan", ResponseCode.UNPROCESSABLE_ENTITY);
            }

            const dataInsert: ReservationRealization = {
                reservation_id: reservation.id,
                biometric: reservation.id + '_' + data.biometric
            };

            await this.repository.create(dataInsert);

            return dataInsert;
        } catch (error) {
            //@ts-ignore
            if (error.message && error.message.includes('Duplicate')) {
                throw new HttpException("Biometric already exist", ResponseCode.CONFLICT);
            }
            throw error;
        }
    }
}