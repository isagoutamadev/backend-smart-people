import { User } from "./user.model";

export interface JWT {
    token?: string,
    user?: User
}