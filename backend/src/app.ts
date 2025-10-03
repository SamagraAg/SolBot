import express from "express";
import { config } from "dotenv";
import router from "./routes/index.routes.js";
import morgan from "morgan";

const app = express();
config();

//middlewares
app.use(express.json());

//Remove in production
app.use(morgan("dev"));

app.use("/api/v1", router);

export default app;
