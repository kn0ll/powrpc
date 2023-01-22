import * as Router from "@koa/router";
import * as Koa from "koa";

import welcomeMessage from "./api/welcomeMessage";

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
  ctx.type = "html";
  ctx.body =
    '<html><body><script type="text/javascript" src="foo.js" /></body></html>';
});

router.all("/welcomeMessage", welcomeMessage);

app.use(router.routes()).listen(3000);
