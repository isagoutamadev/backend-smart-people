import { OrganizationDistrict } from "@/models/organization-district.model";
import { Paging } from "@/utils/responses/pagination.response";
import { OrganizationDistrictRepository } from "./organization-district.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class OrganizationDistrictService {
    private repository = new OrganizationDistrictRepository();
    public get = async (search: OrganizationDistrict, page: number, limit: number): Promise<Paging<OrganizationDistrict>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}