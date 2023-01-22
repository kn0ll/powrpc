import type { RemoteFailure, RemoteSuccess } from "@devexperts/remote-data-ts";
import type { RpcHandler } from "@powerpc/server";

const success = <S>(value: S) => ({ _tag: "RemoteSuccess", value } as const);

const failure = <E>(error: E) => ({ _tag: "RemoteFailure", error } as const);

const rpc =
  <
    MT extends string,
    M extends { method?: MT; query?: Record<string, string> },
    E,
    A
  >(
    fn: RpcHandler<M, E, A>
  ) =>
  (init: M): Promise<RemoteFailure<E | [number, string]> | RemoteSuccess<A>> =>
    fetch(
      `${fn}?${init.query ? new URLSearchParams(init.query).toString() : ""}`,
      { method: init.method }
    ).then((response) =>
      response
        .json()
        .then((json) =>
          response.ok
            ? success([response.status, json] as A)
            : failure([response.status, json] as E)
        )
        .catch((e) =>
          failure([
            response.status,
            e instanceof Error ? e.message : "Unexpected error parsing JSON.",
          ])
        )
    );

export default rpc;
