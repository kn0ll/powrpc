import rpc from "@powerpc/client";

import welcomeMessage from "../api/welcomeMessage";

console.log("hello world");

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
