import { Institution } from "@/models/institution.model";
import { Paging } from "@/utils/responses/pagination.response";
import { InstitutionRepository } from "./institution.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";
import { v4 as uuidV4 } from "uuid";
import knex from "@/utils/knex/knex";

export class InstitutionService {
    private repository = new InstitutionRepository();
    public get = async (search: Institution, page: number, limit: number): Promise<Paging<Institution>> => {
        try {            
           const result = await this.repository.get(search, page, limit);

           return result;
        } catch (error) {
            throw error;
        }
    }
    
    public findByUUID = async (uuid: string): Promise<Institution> => {
        try {            
           const result = await this.repository.findByUUID(uuid);

           if (result) {
               return result;
           }

           throw new HttpException("Institution not found", ResponseCode.NOT_FOUND);
           
        } catch (error) {
            throw error;
        }
    }

    public create = async (data: Institution): Promise<Institution> => {
        try {
            data.uuid = uuidV4();
            await this.repository.create(data);

            return data;
        } catch (error: any) {
            if (error.message .includes("m_institutions_name_unique")) {
                throw new HttpException("Nama institusi telah terdaftar", ResponseCode.CONFLICT);
            }
            throw error;
        }
    }
    
    public update = async (data: Institution): Promise<Institution> => {
        try {
            await this.repository.update(data);

            return data;
        } catch (error: any) {
            if (error.message .includes("m_institutions_name_unique")) {
                throw new HttpException("Nama institusi telah terdaftar", ResponseCode.CONFLICT);
            }
            throw error;
        }
    }
    
    public delete = async (uuid: string): Promise<Institution> => {
        try {
            await this.repository.delete(uuid);

            return {
                uuid
            };
        } catch (error) {
            throw error;
        }
    }
}