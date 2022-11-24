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
            throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }

    public create = async (data: BodyReservationRealization): Promise<ReservationRealization> => {
        try {
            const reservation = await this.reservationRepository.findByUUID(data.reservation_uuid);
            if (!reservation) {
                throw new HttpException("Reservation not found", ResponseCode.NOT_FOUND);
            }
            console.log(reservation);

            if (!reservation.realization_time) {
                throw new HttpException("Reservasi belum diaktifasi", ResponseCode.UNPROCESSABLE_ENTITY);
            }
            
            if (reservation.deactivated_time) {
                throw new HttpException("Reservasi telah dinonaktifkan", ResponseCode.UNPROCESSABLE_ENTITY);
            }
            
            const existData = await this.repository.find(data);
            console.log(existData);
            if (existData) {
                throw new HttpException("Biometric already exist", ResponseCode.CONFLICT);
            }

            const dataInsert: ReservationRealization = {
                reservation_id: reservation.id,
                biometric: data.biometric
            };

            await this.repository.create(dataInsert);

            return dataInsert;
        } catch (error) {
            throw error;
        }
    }
}