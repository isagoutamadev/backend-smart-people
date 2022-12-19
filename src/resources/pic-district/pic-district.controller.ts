import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { PicDistrict } from '@/models/pic-district.model';
import {  } from '@/schemas/pic-district.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { PicDistrictService } from './pic-district.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';

export class PicDistrictController implements Controller {
    public path = 'pic-districts';
    public router = Router();
    private service = new PicDistrictService();

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