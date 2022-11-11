import { BranchCompany } from "./branch_company.model";
import { District } from "./district.model";
import { Province } from "./province.model";
import { Regency } from "./regency.model";

export interface Employee {
    id?: string,
    name?: string,
    branch_company_id?: string,
    branchCompany?: BranchCompany,
    district_id?: number,
    district?: District,
    regency?: Regency,
    province?: Province,
    picture?: string,
    address?: string,
}

export interface SearchEmployee {
    name?: string,
    branch_company_id?: string,
    district_id?: number,
    regency_id?: number,
    province_id?: number,
}