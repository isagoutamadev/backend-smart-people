import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Router, Request, Response } from 'express';
import response from '@/helpers/response.helper';
import { ResponseCode } from '@/utils/responses/global.response';
import { DashboardReservationRealizationCount, DashboardReservationRealizationGraph } from '@/models/dashboard.model';
import { SearchDashboardSchema } from '@/schemas/dashboard.schema';
import { validate, ReqType } from '@/middlewares/validate.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { DashboardService } from './dashboard.service';

export class DashboardController implements Controller {
    public path = 'dashboards';
    public router = Router();
    private service = new DashboardService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            '/count',
            authMiddleware(),
            validate(SearchDashboardSchema, ReqType.QUERY),
            this.getReservationRealizationCount
        );
        
        this.router.get(
            '/graph',
            authMiddleware(),
            validate(SearchDashboardSchema, ReqType.QUERY),
            this.getReservationRealizationGraph
        );
    }

    private getReservationRealizationCount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const data = await this.service.getReservationRealizationCount(req.query);
            return response.ok<DashboardReservationRealizationCount>(data, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
    
    private getReservationRealizationGraph = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const data = await this.service.getReservationRealizationGraph(req.query);
            return response.ok<DashboardReservationRealizationGraph[]>(data, res);
        } catch (err: any) {
            return next(new HttpException(err.message, err.statusCode));
        }
    }
}