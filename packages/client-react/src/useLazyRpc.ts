import type { RpcHandler } from "@powrpc/server";

import rpc from "@powrpc/client";
import { useCallback } from "react";

export const useLazyRpc = <M, E, A, ARG extends unknown[]>(
  handler: RpcHandler<M, E, A, ARG>
) => useCallback(rpc(handler), [handler]);
