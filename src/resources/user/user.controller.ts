import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { User } from '@/models/user.model';
import { UserSearchSchema, UserBodySchema } from '@/schemas/user.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { UserService } from './user.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';

// const service = new AuthService();

export class UserController implements Controller {
    public path = 'users';
    public router = Router();
    private service = new UserService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            '/',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            validate(UserSearchSchema, ReqType.QUERY),
            this.getUsers
        );
        
        this.router.get(
            '/:id',
            authMiddleware(),
            this.detail
        );

        this.router.post(
            '/',
            authMiddleware(),
            validate(UserBodySchema, ReqType.BODY),
            this.create
        );
    }

    private getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { auth } = res.app.locals;
            const { email, role_id, page, limit } = req.query;

            const search = {
                email, 
                role_id
            };

            // @ts-ignore
            const result = await this.service.getUsers(search, page, limit);
            
            return response.global<Paging<User>>(res, {
                code: ResponseCode.OK,
                result: result,
            });
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private detail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { auth } = res.app.locals;
            const { id } = req.params;

            console.log({id});  
            const result = await this.service.getDetail(id);
            
            return response.global<User>(res, {
                code: ResponseCode.OK,
                result: result,
            });
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { auth } = res.app.locals;

            const {user, employee} = req.body;
            const result = await this.service.create({
                ...user,
                created_by: auth.id,
            });
            
            return response.created<User>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}
