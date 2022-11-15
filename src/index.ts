import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
import { UserController } from "./resources/user/user.controller";

const app = new App([
    new AuthController(),
    new UserController(),
], Number(process.env.PORT || 8000));

app.listen();