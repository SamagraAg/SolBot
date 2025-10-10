import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat.controllers.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";

//protected apis
const chatRouter = Router();

//adding new chat
chatRouter.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

//fetching all chats
chatRouter.get("/all-chats", verifyToken, sendChatsToUser);

//delete user chats
chatRouter.delete("/delete", verifyToken, deleteChats);

export default chatRouter;
