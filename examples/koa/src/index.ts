import * as Router from "@koa/router";
import * as Koa from "koa";

import welcomeMessage from "./api/welcomeMessage";

const app = new Koa();
const router = new Router();

router.all("/welcomeMessage", welcomeMessage);

app.use(router.routes()).listen(3000);
