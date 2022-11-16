import { ReservationRealization } from "@/models/reservation-realization.model";
import { Paging } from "@/utils/responses/pagination.response";
import { ReservationRealizationRepository } from "./reservation-realization.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class ReservationRealizationService {
    private repository = new ReservationRealizationRepository();
    public get = async (search: ReservationRealization, page: number, limit: number): Promise<Paging<ReservationRealization>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}