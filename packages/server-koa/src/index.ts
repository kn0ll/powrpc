import type { DefaultContext, DefaultState, ParameterizedContext } from "koa";

import * as RPC from "@powrpc/server";

export * from "@powrpc/server";

type Ctx = ParameterizedContext<DefaultState, DefaultContext, unknown>;

export const handler = RPC.handler(
  ([ctx]: [Ctx]) => ctx,
  ([ctx]) =>
    ([status, response]) =>
    () => {
      ctx.response.status = status;
      ctx.response.headers["content-type"] = "application/json";
      ctx.response.body = JSON.stringify(response);
    }
);

export const method = RPC.method((ctx: Ctx) => ctx.request.method);

export const query = RPC.query((ctx: Ctx) => ctx.request.query);
