import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { Role, Province, Regency, District } from '@/models/lt.model';
import {  } from '@/schemas/lt.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { LtService } from './lt.service';
import { Paging } from '@/utils/responses/pagination.response';
import { PagingSchema } from '@/schemas/paging.schema';

export class LtController implements Controller {
    public path = '';
    public router = Router();
    private service = new LtService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            '/roles',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            this.getRoles
        );
        this.router.get(
            '/provinces',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            this.getProvinces
        );
        this.router.get(
            '/regencies',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            this.getRegencies
        );
        this.router.get(
            '/districts',
            authMiddleware(),
            validate(PagingSchema, ReqType.QUERY),
            this.getDistricts
        );
    }

    private getRoles = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                limit,
                page
            } = req.query;

            // @ts-ignore
            const result = await this.service.getRoles(page, limit);
            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private getProvinces = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                limit,
                page
            } = req.query;

            // @ts-ignore
            const result = await this.service.getProvinces(page, limit);
            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private getRegencies = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                limit,
                page,
                province_id,
            } = req.query;

            // @ts-ignore
            const result = await this.service.getRegencies({province_id}, page, limit);
            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private getDistricts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                limit,
                page,
                regency_id,
            } = req.query;

            // @ts-ignore
            const result = await this.service.getDistricts({regency_id}, page, limit);
            return response.ok(result, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}