import type { NextApiRequest, NextApiResponse } from "next";
import type { JsonValue } from "type-fest";

import * as RPC from "@powrpc/server";
import * as f from "fp-ts/function";
import * as IO from "fp-ts/IO";

export * from "./plugin";
export * from "@powrpc/server";

type HttpResponse = readonly [number, JsonValue];

const responseIO =
  <NR extends NextApiResponse<JsonValue>>(res: NR) =>
  <R extends HttpResponse>([status, response]: R) =>
    IO.of(res.status(status).json(response));

export const handler =
  <MO, EO extends HttpResponse, AO extends HttpResponse>(
    handler: (
      rpc: RPC.RPC<unknown, never, NextApiRequest>
    ) => RPC.RPC<MO, EO, AO>
  ): RPC.RpcHandler<MO, EO, AO> =>
  (req: NextApiRequest, res: NextApiResponse<EO[1] | AO[1]>) =>
    f.pipe(
      RPC.of(req),
      handler,
      RPC.chainFirstIOK(responseIO(res)),
      RPC.orElseFirstIOK(responseIO(res))
    )();

export const method = RPC.method((req: NextApiRequest) => req.method);

export const query = RPC.query((req: NextApiRequest) => req.query);
