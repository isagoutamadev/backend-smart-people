import { OrganizationProvince } from "@/models/organization-province.model";
import { Paging } from "@/utils/responses/pagination.response";
import { OrganizationProvinceRepository } from "./organization-province.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class OrganizationProvinceService {
    private repository = new OrganizationProvinceRepository();
    public get = async (search: OrganizationProvince, page: number, limit: number): Promise<Paging<OrganizationProvince>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}