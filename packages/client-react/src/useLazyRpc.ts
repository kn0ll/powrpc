import type { RpcHandler } from "@pow-rpc/server";

import rpc from "@pow-rpc/client";
import { useCallback } from "react";

export const useLazyRpc = <M, E, A>(handler: RpcHandler<M, E, A>) =>
  useCallback(rpc(handler), [handler]);
