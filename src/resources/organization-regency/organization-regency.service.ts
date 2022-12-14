import { OrganizationRegency } from "@/models/organization-regency.model";
import { Paging } from "@/utils/responses/pagination.response";
import { OrganizationRegencyRepository } from "./organization-regency.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class OrganizationRegencyService {
    private repository = new OrganizationRegencyRepository();
    public get = async (search: OrganizationRegency, page: number, limit: number): Promise<Paging<OrganizationRegency>> => {
        try {            
           throw new HttpException("Not Found", ResponseCode.NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}