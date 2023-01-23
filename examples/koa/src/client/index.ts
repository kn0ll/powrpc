import rpc from "@powrpc/client";

import welcomeMessage from "../api/welcomeMessage";

document.write("loading...");

rpc(welcomeMessage)({
  method: "GET",
  query: { name: "foobar" },
}).then((c) =>
  document.write(
    c._tag === "RemoteSuccess"
      ? `Success: ${JSON.stringify(c.value)}`
      : `Failure: ${JSON.stringify(c.error)}`
  )
);
