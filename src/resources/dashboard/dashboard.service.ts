import { SearchDasboardReservationRealization, DashboardReservationRealizationCount, DashboardReservationRealizationGraph } from "@/models/dashboard.model";
import { Paging } from "@/utils/responses/pagination.response";
import { DashboardRepository } from "./dashboard.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class DashboardService {
    private repository = new DashboardRepository();
    public getReservationRealizationCount = async (search: SearchDasboardReservationRealization): Promise<DashboardReservationRealizationCount> => {
        try {
            const data = await this.repository.getReservationRealizationCount(search);
            if (data) {
                return data;
            }
            throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
    
    public getReservationRealizationGraph = async (search: SearchDasboardReservationRealization): Promise<DashboardReservationRealizationGraph[]> => {
        try {
            const data = await this.repository.getReservationRealizationGraph(search);
            return data;
        } catch (error) {
            throw error;
        }
    }
}