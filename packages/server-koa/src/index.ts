import type { JsonValue } from "type-fest";

import * as RPC from "@powerpc/server";
import * as f from "fp-ts/function";
import * as Koa from "koa";

export * from "@powerpc/server";

type HttpResponse = readonly [number, JsonValue];

type Ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>;

const koaResponseIO =
  <C extends Ctx>(ctx: C) =>
  <R extends HttpResponse>([status, response]: R) =>
  () => {
    ctx.response.status = status;
    ctx.response.body = response;
  };

export const koaHandler =
  <MO, EO extends HttpResponse, AO extends HttpResponse>(
    handler: (rpc: RPC.RPC<unknown, never, Ctx>) => RPC.RPC<MO, EO, AO>
  ): RPC.RpcHandler<MO, EO, AO> =>
  (ctx: Ctx) =>
    f.pipe(
      RPC.of(ctx),
      handler,
      RPC.chainFirstIOK(koaResponseIO(ctx)),
      RPC.orElseFirstIOK(koaResponseIO(ctx))
    )();

export const method = RPC.method((ctx: Ctx) => ctx.request.method);

export const query = RPC.query((ctx: Ctx) => ctx.request.query);
