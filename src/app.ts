import express from "express";
import morgan from "./helpers/morgan";
import employee from "./routes/employee.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan);

app.use("/employee", employee);

export default app;
