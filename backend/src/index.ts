import express from "express";
import { config } from "dotenv";

const app = express();
config();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());

//connections and listeners
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
