import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { Institution } from '@/models/institution.model';
import { CreateInstitutionSchema } from '@/schemas/institution.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { InstitutionService } from './institution.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';
import { UUIDSchema } from '@/schemas/global.schema';

export class InstitutionController implements Controller {
    public path = 'institutions';
    public router = Router();
    private service = new InstitutionService();

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
            authMiddleware(),
            validate(CreateInstitutionSchema, ReqType.BODY),
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
            validate(CreateInstitutionSchema, ReqType.BODY),
            this.update
        );
        
        this.router.delete(
            '/:uuid',
            authMiddleware(),
            validate(UUIDSchema, ReqType.PARAMS),
            this.delete
        );
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                page, 
                limit
            } = req.query;

            // @ts-ignore
            const result = await this.service.get(req.query, page, limit);

            return response.ok(result, res);
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
            const {
                uuid
            } = req.params;

            // @ts-ignore
            const result = await this.service.findByUUID(uuid);

            return response.ok(result, res);
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
            const {
                page, 
                limit
            } = req.query;

            // @ts-ignore
            const result = await this.service.create(req.body);

            return response.created(result, res);
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

            const {uuid} = req.params;

            // @ts-ignore
            const result = await this.service.update({
                uuid,
                ...req.body
            });

            return response.ok(result, res);
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

            const {uuid} = req.params;

            // @ts-ignore
            const result = await this.service.delete(uuid);

            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}