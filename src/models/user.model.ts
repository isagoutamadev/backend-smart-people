import { Employee } from "./employee.model";
import { Role } from "./role.model";

export interface User {
    id?: string,
    email?: string,
    role_id?: number,
    employee_id?: string,
    employee?: Employee,
    role?: Role,
    device_id?: string,
    fcm_token?: string,
    is_banned?: number,
    is_active?: number,
    password?: string,
}