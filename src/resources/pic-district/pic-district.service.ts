import { PicDistrict } from "@/models/pic-district.model";
import { Paging } from "@/utils/responses/pagination.response";
import { PicDistrictRepository } from "./pic-district.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class PicDistrictService {
    private repository = new PicDistrictRepository();
    public get = async (search: PicDistrict, page: number, limit: number): Promise<Paging<PicDistrict>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}