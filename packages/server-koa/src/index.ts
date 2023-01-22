import type { JsonValue } from "type-fest";

import * as RPC from "@powrpc/server";
import * as f from "fp-ts/function";
import * as Koa from "koa";

export * from "@powrpc/server";

type HttpResponse = readonly [number, JsonValue];

type Ctx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext,
  unknown
>;

const responseIO =
  <C extends Ctx>(ctx: C) =>
  <R extends HttpResponse>([status, response]: R) =>
  () => {
    ctx.response.status = status;
    ctx.response.headers["content-type"] = "application/json";
    ctx.response.body = JSON.stringify(response);
  };

export const handler =
  <MO, EO extends HttpResponse, AO extends HttpResponse>(
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
