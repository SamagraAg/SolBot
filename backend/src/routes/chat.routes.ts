import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletion } from "../controllers/chat.controllers.js";
const chatRouter = Router();

chatRouter.post("/new", generateChatCompletion);
export default chatRouter;
