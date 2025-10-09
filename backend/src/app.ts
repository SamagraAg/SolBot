import express from "express";
import { config } from "dotenv";
config();
import router from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();

//middlewares
//Parse request bodies as json
app.use(express.json());
// Middleware to "parse" cookies into req.cookies as well as "sign and verify" signed cookies using COOKIE_SECRET
app.use(cookieParser(process.env.COOKIE_SECRET));
//Whitelist the url which is allowed to communicate to backend.And Tell browser it’s allowed to send cookies to backend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//Remove in production
app.use(morgan("dev"));

app.use("/api/v1", router);

export default app;
