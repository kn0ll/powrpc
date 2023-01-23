import type { Request, Response } from "express";
import type { ParsedQs } from "qs";

import * as RPC from "@powrpc/server";

export * from "@powrpc/server";

type Req = Request<unknown, any, any, ParsedQs, Record<string, any>>;

type Res = Response<any, Record<string, any>>;

export const handler = RPC.handler(
  ([req]: [req: Req, res: Res]) => req,
  ([_req, res]) =>
    ([status, response]) =>
    () => {
      res.status(status);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(response));
    }
);

export const method = RPC.method((req: Req) => req.method);

export const query = RPC.query((req: Req) => req.query);
