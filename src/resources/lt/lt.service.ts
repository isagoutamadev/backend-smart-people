import { District, Province, Regency, Role } from "@/models/lt.model";
import { Paging } from "@/utils/responses/pagination.response";
import { LtRepository } from "./lt.repository";

export class LtService {
    private repository = new LtRepository();
    public getRoles = async (page: number, limit: number): Promise<Paging<Role>> => {
        try {            
           const result = await this.repository.getRoles(page, limit);
           return result;
        } catch (error) {
            throw error;
        }
    }
    
    public getProvinces = async (page: number, limit: number): Promise<Paging<Province>> => {
        try {            
           const result = await this.repository.getProvinces(page, limit);
           return result;
        } catch (error) {
            throw error;
        }
    }
    
    public getRegencies = async (search: Regency, page: number, limit: number): Promise<Paging<Regency>> => {
        try {            
           const result = await this.repository.getRegency(search, page, limit);
           return result;
        } catch (error) {
            throw error;
        }
    }
    
    public getDistricts = async (search: District, page: number, limit: number): Promise<Paging<District>> => {
        try {            
           const result = await this.repository.getDistricts(search, page, limit);
           return result;
        } catch (error) {
            throw error;
        }
    }
}