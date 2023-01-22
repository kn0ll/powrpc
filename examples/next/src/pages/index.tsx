import { useRpc } from "@powerpc/client-react";
import { useMemo } from "react";

import welcomeMessage from "./api/welcomeMessage";

export default () => {
  const result = useRpc(
    welcomeMessage,
    useMemo(
      () => ({
        method: "GET",
        query: { name: "world" },
      }),
      []
    )
  );

  return result._tag === "RemoteInitial" ? (
    <p>Waiting...</p>
  ) : result._tag === "RemotePending" ? (
    <p>Loading...</p>
  ) : result._tag === "RemoteFailure" ? (
    <p>Failed with: {JSON.stringify(result.error)}</p>
  ) : (
    <p>Succeeded with: {JSON.stringify(result.value)}</p>
  );
};

// import { fold3 } from "@devexperts/remote-data-ts";
// import rpc from "@powerpc/server/lib/src/rpc";
// import * as f from "fp-ts/function";

// import test from "./api/test1";

// export default () =>
//   f.pipe(
//     usePowRpc(test, undefined),
//     fold3(
//       () => "Loading...",
//       () => "Error!",
//       (result) => `Success: ${result}`
//     )
//   );
