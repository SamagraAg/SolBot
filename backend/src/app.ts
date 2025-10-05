import express from "express";
import { config } from "dotenv";
import router from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
config();

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Remove in production
app.use(morgan("dev"));

app.use("/api/v1", router);

export default app;
