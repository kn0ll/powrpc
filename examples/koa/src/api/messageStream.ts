import * as RPC from "@powrpc/server-koa";
import * as f from "fp-ts/function";
import * as D from "io-ts/Decoder";
import { PassThrough } from "stream";

const handler = f.flow(
  RPC.method("GET"),
  RPC.query(D.struct({ name: D.string })),
  RPC.chain(({ query, req }) => {
    const stream = new PassThrough();

    const interval = setInterval(() => {
      console.log("writing");
      stream.write(`data: ${query.name} ${new Date()}\n\n`);
    }, 1000);

    req.on("close", () => {
      console.log("Request closed");
      clearInterval(interval);
    });

    return RPC.of([200, stream] as const);
  })
);

export default RPC.handler(handler);
