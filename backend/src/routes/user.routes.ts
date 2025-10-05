import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user.controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
const userRouter = Router();

userRouter.get("/", getAllUsers);

//request goes through validation middleware, on success it goes to route handler for signup
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login",validate(loginValidator),userLogin);

export default userRouter;
