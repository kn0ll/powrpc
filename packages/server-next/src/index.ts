import type { NextApiRequest, NextApiResponse } from "next";

import * as RPC from "@powrpc/server";

export * from "./plugin";
export * from "@powrpc/server";

export const handler = RPC.handler(
  ([req]: [req: NextApiRequest, res: NextApiResponse<unknown>]) => req,
  ([req, res]) =>
    ([status, response]) =>
    () =>
      res.status(status).json(response)
);

export const method = RPC.method((req: NextApiRequest) => req.method);

export const query = RPC.query((req: NextApiRequest) => req.query);
