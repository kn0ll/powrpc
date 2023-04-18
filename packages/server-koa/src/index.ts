import type { DefaultContext, DefaultState, ParameterizedContext } from "koa";

import * as RPC from "@powrpc/server";

export * from "@powrpc/server";

// TODO: a limitation of the handler API is that we cannot lazily decode the request body.
// naive solutions to  this degrade ergonomics, so i'd like to think about this more.
// additionally, this implementation requires the user manually provide body through something like `koa-bodyparser`.

export const handler = RPC.handler(
  (ctx: ParameterizedContext<DefaultState, DefaultContext, unknown>) =>
    ({
      method: ctx.request.method,
      query: ctx.request.query,
      body: ctx.request.body,
      text: ({ status, body }) => {
        ctx.response.status = status;
        ctx.response.body = body;
      },
      json: ({ status, body }) => {
        ctx.response.status = status;
        ctx.response.headers["content-type"] = "application/json";
        ctx.response.body = JSON.stringify(body);
      },
    } as const)
);
