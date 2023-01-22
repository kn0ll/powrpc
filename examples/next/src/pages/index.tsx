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

  return (
    <p>
      {result._tag === "RemoteInitial"
        ? "Waiting..."
        : result._tag === "RemotePending"
        ? "Loading..."
        : result._tag === "RemoteFailure"
        ? `Failed with: ${JSON.stringify(result.error)}`
        : `Succeeded with: ${JSON.stringify(result.value)}`}
    </p>
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
