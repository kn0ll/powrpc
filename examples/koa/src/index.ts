import * as Router from "@koa/router";
import * as Koa from "koa";
import * as serve from "koa-static";

import welcomeMessage from "./api/welcomeMessage";

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
  ctx.type = "html";
  ctx.body = '<html><body><script src="index.js"></script></body></html>';
});

router.all("/welcomeMessage", welcomeMessage);

app.use(serve("cjs/src/client")).use(router.routes()).listen(3000);
