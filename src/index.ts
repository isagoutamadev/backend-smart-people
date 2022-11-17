import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { DashboardController } from "./resources/dashboard/dashboard.controller";
import { ReservationController } from "./resources/reservation/reservation.controller";
import { UserController } from "./resources/user/user.controller";

const app = new App([
    // new AuthController(),
    // new UserController(),
    new DashboardController(),
    new ReservationController()
], Number(process.env.PORT || 8000));

app.listen();