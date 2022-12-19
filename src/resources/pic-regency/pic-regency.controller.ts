import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { PicRegency } from '@/models/pic-regency.model';
import {  } from '@/schemas/pic-regency.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { PicRegencyService } from './pic-regency.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';

export class PicRegencyController implements Controller {
    public path = 'pic-regencys';
    public router = Router();
    private service = new PicRegencyService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            '/',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            this.get
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}