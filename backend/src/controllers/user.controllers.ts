import { NextFunction, Request, Response } from "express";
import User from "../models/User.model.js";
import { hash } from "bcrypt";

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
    return res.status(500).json({ success: false, error: "server error" });
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
    return res.status(201).json({ success: true, id: newuser._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "server error" });
  }
};
