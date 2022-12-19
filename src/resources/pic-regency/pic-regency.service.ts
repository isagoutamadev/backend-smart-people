import { PicRegency } from "@/models/pic-regency.model";
import { Paging } from "@/utils/responses/pagination.response";
import { PicRegencyRepository } from "./pic-regency.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class PicRegencyService {
    private repository = new PicRegencyRepository();
    public get = async (search: PicRegency, page: number, limit: number): Promise<Paging<PicRegency>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}