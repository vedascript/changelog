import * as dotenv from "dotenv";
dotenv.config();

import app from "./server.ts";

app.listen(3001, () => {
  console.log("server is listening.");
});
