import type { JsonValue } from "type-fest";

import * as RPC from "@powrpc/server";
import * as f from "fp-ts/function";
import * as Koa from "koa";
import { Writable } from "stream";

export * from "@powrpc/server";

type HttpResponse = readonly [number, JsonValue];

type SSEResponse = readonly [number, Writable];

type Ctx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext,
  unknown
>;

const responseIO =
  <C extends Ctx>(ctx: C) =>
  <R extends HttpResponse | SSEResponse>([status, response]: R) =>
  () => {
    ctx.response.status = status;

    if (response instanceof Writable) {
      ctx.response.headers["content-type"] = "application/json";
      ctx.response.headers["Cache-Control"] = "no-cache";
      ctx.response.headers["Connection"] = "keep-alive";

      ctx.req.socket.setTimeout(0);
      ctx.req.socket.setNoDelay(true);
      ctx.req.socket.setKeepAlive(true);
      ctx.response.body = response;
    } else {
      ctx.response.headers["content-type"] = "application/json";
      ctx.response.body = JSON.stringify(response);
    }
  };

export const handler =
  <MO, EO extends HttpResponse, AO extends HttpResponse | SSEResponse>(
    handler: (rpc: RPC.RPC<unknown, never, Ctx>) => RPC.RPC<MO, EO, AO>
  ): RPC.RpcHandler<MO, EO, AO> =>
  (ctx: Ctx) =>
    f.pipe(
      RPC.of(ctx),
      handler,
      RPC.chainFirstIOK(responseIO(ctx)),
      RPC.orElseFirstIOK(responseIO(ctx))
    )();

export const method = RPC.method((ctx: Ctx) => ctx.request.method);

export const query = RPC.query((ctx: Ctx) => ctx.request.query);
