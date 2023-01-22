import * as RPC from "@powerpc/server-koa";
import * as f from "fp-ts/function";
import * as D from "io-ts/Decoder";

const handler = f.flow(
  RPC.method("GET"),
  RPC.query(D.struct({ name: D.string })),
  RPC.chain(({ query }) => RPC.of([200, `hello ${query.name}`] as const))
);

const x = RPC.koaHandler(handler);

export default x;
