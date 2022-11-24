import { User } from "@/models/user.model";
import AuthHelper from "@/helpers/auth.helper";
import { JWT } from "@/models/jwt.model";
import { AuthRepository } from "./auth.repository";
import HttpException from "@/utils/exceptions/http.exception";
import { ResponseCode } from "@/utils/responses/global.response";

export class AuthService {
    private repository = new AuthRepository();
    public login = async (user: User): Promise<JWT> => {
        try {            
            const encrypted = AuthHelper.encrypt(user.password);
            const data = await this.repository.findByEmailOrUsername(user.username || "");

            if (!data) {
                throw new HttpException("Email atau password salah", ResponseCode.UNPROCESSABLE_ENTITY);
            } else if (data.password !== encrypted) {
                throw new HttpException("Email atau password salah", ResponseCode.UNPROCESSABLE_ENTITY);
            }

            delete data.password;

            return {
                token: AuthHelper.jwtEncode({uuid: data.uuid}),
                user: data
            }  

        } catch (error) {
            throw error;
        }
    }

    public getDetail = async (uuid: string): Promise<User> => {
        try {            
            const data = await this.repository.findbyUUID(uuid);
            
            if (!data) {
                throw new HttpException("User tidak ditemukan", ResponseCode.UNPROCESSABLE_ENTITY);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
    
    public updateById = async (user: User): Promise<void> => {
        try {            
            await this.repository.updateById(user);
        } catch (error) {
            throw error;
        }
    }
}