"use strict";
exports.__esModule = true;
var RPC = require("@powerpc/server-koa");
var f = require("fp-ts/function");
var D = require("io-ts/Decoder");
var handler = f.flow(RPC.method("GET"), RPC.query(D.struct({ name: D.string })), RPC.chain(function (_a) {
    var query = _a.query;
    return RPC.of([200, "hello ".concat(query.name)]);
}));
exports["default"] = RPC.koaHandler(handler);
//# sourceMappingURL=welcomeMessage.js.map