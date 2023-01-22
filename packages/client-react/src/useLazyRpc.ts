import type { RpcHandler } from "@powrpc/server";

import rpc from "@powrpc/client";
import { useCallback } from "react";

export const useLazyRpc = <M, E, A>(handler: RpcHandler<M, E, A>) =>
  useCallback(rpc(handler), [handler]);
