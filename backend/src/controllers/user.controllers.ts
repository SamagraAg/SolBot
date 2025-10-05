import { NextFunction, Request, Response } from "express";
import User from "../models/User.model.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(409)
        .json({ success: false, error: "User already exist" });
    const hashedPassword = await hash(password, 10);
    const newuser = new User({ name, email, password: hashedPassword });
    await newuser.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(newuser._id.toString(), newuser.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ success: true, name: newuser.name, email: newuser.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }

    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "server side error" });
  }
};
