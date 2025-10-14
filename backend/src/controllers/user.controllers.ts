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
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
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
        .json({ success: false, message: "User already exist" });
    const hashedPassword = await hash(password, 10);
    const newuser = new User({ name, email, password: hashedPassword });
    await newuser.save();

    // create token and store cookie

    // Clear any existing auth cookie first
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    // Generate a new JWT valid for 7 days
    const token = createToken(newuser._id.toString(), newuser.email, "7d");

    // Compute expiry date for the cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //Note: This line set expiry date for cookie. Expiry date for token has already been set. Also we always need to match cookie and token expiry date so that cookie don't expire before token expires(because if it would the valid jwt would not be in browser and user needs to login again)

    // Set new signed cookie having JWT
    res.cookie(COOKIE_NAME, token, {
      path: "/", // Cookie valid for all routes
      domain: "localhost", // Only valid for localhost
      expires, // Expiry date (7 days)
      httpOnly: true, // Prevent JS access to cookie
      signed: true, // Signs cookie using COOKIE_SECRET
    });

    return res
      .status(201)
      .json({ success: true, name: newuser.name, email: newuser.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
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

    // Clear any existing auth cookie first
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    // Generate a new JWT valid for 7 days
    const token = createToken(user._id.toString(), user.email, "7d");

    // Compute expiry date for the cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Set new signed cookie having JWT
    res.cookie(COOKIE_NAME, token, {
      path: "/", // Cookie valid for all routes
      domain: "localhost", // Only valid for localhost
      expires, // Expiry date (7 days)
      httpOnly: true, // Prevent JS access to cookie
      signed: true, // Signs cookie using COOKIE_SECRET
    });

    return res
      .status(200)
      .json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};
export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { name, email, photoURL } = req.body;
    const user = await User.findOne({ email });
    if (user) {
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
        path: "/", // Cookie valid for all routes
        domain: "localhost", // Only valid for localhost
        expires, // Expiry date (7 days)
        httpOnly: true, // Prevent JS access to cookie
        signed: true, // Signs cookie using COOKIE_SECRET
      });
      return res
        .status(200)
        .json({ success: true, name: user.name, email: user.email });
    }
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(generatedPassword, 10);
    const newuser = new User({ name, email, password: hashedPassword });
    await newuser.save();
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
      path: "/", // Cookie valid for all routes
      domain: "localhost", // Only valid for localhost
      expires, // Expiry date (7 days)
      httpOnly: true, // Prevent JS access to cookie
      signed: true, // Signs cookie using COOKIE_SECRET
    });
    return res
      .status(201)
      .json({ success: true, name: newuser.name, email: newuser.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not registered OR Token malfunctioned",
      });
    return res
      .status(200)
      .json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not registered OR Token malfunctioned",
      });

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};
