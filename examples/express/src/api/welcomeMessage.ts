import { flow } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import * as Schema from "@effect/schema/Schema";
import * as RPC from "@powrpc/server-express";

const handle = flow(
  RPC.method("GET"),
  RPC.query(Schema.parseEither(Schema.struct({ name: Schema.string }))),
  Effect.map(
    ({ query }) => ({ status: 200, body: `Hello ${query.name}` } as const)
  )
);

export default RPC.handler(handle);
