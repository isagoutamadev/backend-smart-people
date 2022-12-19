import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { DashboardController } from "./resources/dashboard/dashboard.controller";
import { InstitutionController } from "./resources/institution/institution.controller";
import { LtController } from "./resources/lt/lt.controller";
import { ReservationRealizationController } from "./resources/reservation-realization/reservation-realization.controller";
import { ReservationController } from "./resources/reservation/reservation.controller";
import { UserController } from "./resources/user/user.controller";

const app = new App([
    new AuthController(),
    new LtController(),
    // new UserController(),
    new DashboardController(),
    new ReservationRealizationController(),
    new ReservationController(),
    new InstitutionController(),
], Number(process.env.PORT || 8000));

app.listen();