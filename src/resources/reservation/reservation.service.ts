import { Reservation, SearchReservation } from "@/models/reservation.model";
import { Paging } from "@/utils/responses/pagination.response";
import { ReservationRepository } from "./reservation.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { v4 as uuidV4 } from "uuid";

export class ReservationService {
    private repository = new ReservationRepository();
    public get = async (search: SearchReservation, page: number, limit: number, sort?: string): Promise<Paging<Reservation>> => {
        try {
            return await this.repository.get(search, page, limit, sort);
        } catch (error) {
            throw error;
        }
    }

    public create = async (data: Reservation): Promise<Reservation> => {
        try {
            data.uuid = uuidV4();
            data.institution = String(data.institution).toUpperCase();
            data.institution_leader = String(data.institution_leader).toUpperCase();
            data.pic = String(data.pic).toUpperCase();
            await this.repository.create(data);
            return data;
        } catch (error) {
            throw error;
        }
    }

    public findByUUID = async (uuid: string): Promise<Reservation> => {
        try {
            const data = await this.repository.findByUUID(uuid); 
            if (data) {
                return data;
            }
            throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }

    public update = async (data: Reservation): Promise<Reservation> => {
        try {
            data.institution = String(data.institution).toUpperCase();
            data.institution_leader = String(data.institution_leader).toUpperCase();
            data.pic = String(data.pic).toUpperCase();
            await this.repository.update(data);
            return data;
        } catch (error) {
            throw error;
        }
    }

    public delete = async (uuid: string): Promise<Reservation> => {
        await this.repository.deleteByUUID(uuid);
        return {};
    }
    
    public findCurrentActive = async (): Promise<Reservation> => {
        try {
            const data = await this.repository.findCurrentActive(); 
            if (data) {
                return data;
            }
            throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
    
    public activate = async (uuid: string): Promise<Reservation> => {
        try {
            const reservation = await this.repository.findByUUID(uuid);
            if (!reservation) {
                throw new HttpException("Reservation not found", ResponseCode.NOT_FOUND);
            }

            if (reservation.realization_time) {
                return reservation;
            }

            await this.repository.activateByUUID(uuid);

            return reservation;;
        } catch (error) {
            throw error;
        }
    }
}