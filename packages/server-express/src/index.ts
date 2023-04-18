import type { Request, Response } from "express";
import type { ParsedQs } from "qs";

import * as RPC from "@powrpc/server";

export * from "@powrpc/server";

export const handler = RPC.handler(
  (
    req: Request<unknown, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) =>
    ({
      method: req.method,
      query: req.query,
      body: req.body,
      text: ({ status, body }) => res.status(status).send(body),
      json: ({ status, body }) =>
        res
          .status(status)
          .setHeader("content-type", "application/json")
          .send(JSON.stringify(body)),
    } as const)
);
