import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { ReservationRealization } from '@/models/reservation-realization.model';
import { RealizationSchema } from '@/schemas/reservation-realization.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { ReservationRealizationService } from './reservation-realization.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';

export class ReservationRealizationController implements Controller {
    public path = 'reservations/realizations';
    public router = Router();
    private service = new ReservationRealizationService();

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
        
        this.router.post(
            '/',
            // authMiddleware(),
            validate(RealizationSchema, ReqType.BODY),
            this.create
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { limit, page } = req.query;

            // @ts-ignore
            const result = await this.service.get({}, page, limit);
            return response.ok<Paging<ReservationRealization>>(result, res);
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

            const data = req.body;

            // @ts-ignore
            const result = await this.service.create(data);
            
            return response.created<ReservationRealization>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}