import * as RPC from "@powrpc/server-next";
import * as f from "fp-ts/function";
import * as D from "io-ts/Decoder";

const handle = f.flow(
  RPC.method("GET"),
  RPC.query(D.struct({ name: D.string })),
  RPC.chain(({ query }) => RPC.of([200, `hello ${query.name}`] as const))
);

export default RPC.handler(handle);
