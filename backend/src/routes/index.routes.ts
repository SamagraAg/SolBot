import { Router } from "express";
import userRouter from "./user.routes.js";
import chatRouter from "./chat.routes.js";
const router = Router();

router.use("/user", userRouter); //"domain/v1/api/user"
router.use("/chat", chatRouter); //"domain/v1/api/chat"

export default router;
