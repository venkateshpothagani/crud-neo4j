import morgan from "morgan";
import fs from "fs";
import path from "path";

const logDirectory = path.join(process.env["ROOT_FOLDER"] as string, "logs");
fs.mkdirSync(logDirectory, { recursive: true });

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

export default morgan("combined", { stream: accessLogStream });
