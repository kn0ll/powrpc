import type { RpcHandler } from "@powerpc/server";

import rpc from "@powerpc/client";
import { useCallback } from "react";

export const useLazyRpc = <M, E, A>(handler: RpcHandler<M, E, A>) =>
  useCallback(rpc(handler), [handler]);
