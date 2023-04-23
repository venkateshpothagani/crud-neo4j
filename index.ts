import * as dotenv from "dotenv";

process.env["ROOT_FOLDER"] = __dirname;
dotenv.config();

import app from "./src/app";

import driver from "./src/helpers/database";

app
  .listen(3000, async () => {
    console.log("Server is running on port 3000");
    if (driver) {
      const serverInfo = await driver.getServerInfo();
      console.log(serverInfo);
    }
  })
  .on("error", (err: Error) => {
    console.error(err);
  });
