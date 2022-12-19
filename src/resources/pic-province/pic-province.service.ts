import { PicProvince } from "@/models/pic-province.model";
import { Paging } from "@/utils/responses/pagination.response";
import { PicProvinceRepository } from "./pic-province.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class PicProvinceService {
    private repository = new PicProvinceRepository();
    public get = async (search: PicProvince, page: number, limit: number): Promise<Paging<PicProvince>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}