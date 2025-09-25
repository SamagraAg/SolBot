import express from "express";
import { config } from "dotenv";


const app = express();
config();


//middlewares
app.use(express.json());

export default app;
