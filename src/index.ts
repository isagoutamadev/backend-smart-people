import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { CompanyController } from "./resources/company/company.controller";
import { EmployeeController } from "./resources/employee/employee.controller";
import { LtController } from "./resources/lt/lt.controller";
import { UserController } from "./resources/user/user.controller";

const app = new App([
    new AuthController(),
    new UserController(),
    new CompanyController(),
    new LtController(),
    new EmployeeController(),
], Number(process.env.PORT || 8000));

app.listen();