import * as Router from "@koa/router";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";

import welcomeMessage from "./api/welcomeMessage";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.type = "html";
    ctx.body = '<html><body><script src="index.js"></script></body></html>';
  })
  .all("/welcomeMessage", welcomeMessage);

new Koa()
  .use(bodyParser())
  .use(serve("cjs/src/client"))
  .use(router.routes())
  .listen(3000);
