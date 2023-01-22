"use strict";
exports.__esModule = true;
var Router = require("@koa/router");
var Koa = require("koa");
var serve = require("koa-static");
var welcomeMessage_1 = require("./api/welcomeMessage");
var app = new Koa();
var router = new Router();
router.get("/", function (ctx) {
    ctx.type = "html";
    ctx.body = '<html><body><script src="index.js"></script></body></html>';
});
router.all("/welcomeMessage", welcomeMessage_1["default"]);
app.use(serve("cjs/src/client")).use(router.routes()).listen(3000);
//# sourceMappingURL=index.js.map