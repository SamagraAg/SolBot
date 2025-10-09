import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletion } from "../controllers/chat.controllers.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";

//protected apis
const chatRouter = Router();

chatRouter.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
export default chatRouter;
