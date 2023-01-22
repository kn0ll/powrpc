import * as Koa from "koa";

import welcomeMessage from "./api/welcomeMessage";

const app = new Koa();

app.use(welcomeMessage).listen(3000);
