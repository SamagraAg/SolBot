import { Router } from "express";
import { getAllChats } from "../controllers/chat.controllers.js";
const chatRouter = Router();

chatRouter.get("/", getAllChats);

export default chatRouter;
