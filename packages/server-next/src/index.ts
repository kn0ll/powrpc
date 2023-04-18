import type { NextApiRequest, NextApiResponse } from "next";

import * as RPC from "@powrpc/server";

export * from "./plugin";
export * from "@powrpc/server";

export const handler = RPC.handler(
  (req: NextApiRequest, res: NextApiResponse) =>
    ({
      method: req.method,
      query: req.query,
      body: req.body,
      text: ({ status, body }) => res.status(status).send(body),
      json: ({ status, body }) => res.status(status).json(body),
    } as const)
);
