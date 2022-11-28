import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { Reservation } from '@/models/reservation.model';
import { ReservationRealizationCountSchema, ReservationSchema } from '@/schemas/reservation.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { ReservationService } from './reservation.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';
import { UUIDSchema } from '@/schemas/global.schema';

export class ReservationController implements Controller {
    public path = 'reservations';
    public router = Router();
    private service = new ReservationService();

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
        
        this.router.get(
            '/current-active',
            // authMiddleware(),
            this.findCurrentActive
        );
        
        this.router.post(
            '/',
            authMiddleware(),
            validate(ReservationSchema, ReqType.BODY),
            this.create
        );
        
        this.router.get(
            '/:uuid',
            authMiddleware(),
            validate(UUIDSchema, ReqType.PARAMS),
            this.find
        );
        
        this.router.put(
            '/:uuid',
            authMiddleware(),
            validate(UUIDSchema, ReqType.PARAMS),
            validate(ReservationSchema, ReqType.BODY),
            this.update
        );

        this.router.delete(
            '/:uuid',
            authMiddleware(),
            validate(UUIDSchema, ReqType.PARAMS),
            this.delete
        );

        this.router.post(
            '/:uuid/activate',
            authMiddleware(),
            validate(UUIDSchema, ReqType.PARAMS),
            this.activate
        );

        this.router.post(
            '/update-realization-count',
            // authMiddleware(),
            validate(ReservationRealizationCountSchema, ReqType.BODY),
            this.updateRealizationCount
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const {uuid, institution, pic, sort_by, page, limit } = req.query;

            const search = {
                institution, 
                pic,
                sort_by,
                uuid
            };

            // @ts-ignore
            const result = await this.service.get(search, page, limit);
            
            return response.ok<Paging<Reservation>>(result, res);
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
            
            return response.created<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private find = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const { uuid } = req.params;

            // @ts-ignore
            const result = await this.service.findByUUID(uuid);
            
            return response.ok<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const { uuid } = req.params;

            const data = {
                uuid,
                ...req.body
            };

            // @ts-ignore
            const result = await this.service.update(data);
            
            return response.ok<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const { uuid } = req.params;

            // @ts-ignore
            const result = await this.service.delete(uuid);
            
            return response.ok<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private findCurrentActive = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            // const { uuid } = req.params;
            const { fields } = req.query;

            // @ts-ignore
            const result = await this.service.findCurrentActive({fields});
            if (fields == 'id') {
                return res.status(200).json({
                    code: 200,
                    ...result
                });
            }
            return response.ok<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private activate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const { uuid } = req.params;

            const result = await this.service.activate(uuid);
            
            return response.ok<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }

    private updateRealizationCount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            // const { uuid } = req.params;

            const data = {
                // uuid,
                ...req.body
            };

            // @ts-ignore
            const result = await this.service.updateRealizationCount(data);
            
            return response.ok<Reservation>(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}