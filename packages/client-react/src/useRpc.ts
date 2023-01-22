import type { RemoteData } from "@devexperts/remote-data-ts";
import type { RpcHandler } from "@pow-rpc/server";

import { useEffect, useState } from "react";

import { useLazyRpc } from "./useLazyRpc";

export const useRpc = <
  MT extends string,
  M extends { method?: MT; query?: Record<string, string> },
  E,
  A
>(
  handler: RpcHandler<M, E, A>,
  init: M
) => {
  const [result, setResult] = useState<RemoteData<E | [number, string], A>>({
    _tag: "RemoteInitial",
  });

  const useLazyHandler = useLazyRpc(handler);

  useEffect(() => {
    setResult({ _tag: "RemotePending", progress: { _tag: "None" } });
    useLazyHandler(init).then(setResult);
  }, [useLazyHandler, init]);

  return result;
};
