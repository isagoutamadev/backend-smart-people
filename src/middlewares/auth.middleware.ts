import { Request, Response, NextFunction } from "express";
import response from "@/helpers/response.helper";
import AuthHelper from "@/helpers/auth.helper";

export function authMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const authorization = req.headers.authorization || "";
            let token = authorization.replace("Basic ", "");
            token = token.replace("Bearer ", "");
            const decoded = AuthHelper.jwtDecode(token);
            res.app.locals.auth = decoded;

            return next();
        }
        catch (err: any) {
            console.log(err);
            
            return response.unauthorized({
                result: err.message
            }, res);
        }
    }
}