import * as express from "express";

import welcomeMessage from "./api/welcomeMessage";

express()
  .get("/", (req, res) => {
    res.type("html");
    res.send('<html><body><script src="index.js"></script></body></html>');
  })
  .all("/welcomeMessage", welcomeMessage)
  .use(express.static("cjs/src/client"))
  .listen(3000);
