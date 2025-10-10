import { NextFunction, Request, Response } from "express";
import ai from "../config/googleai-config.js";
import UserModel from "../models/User.model.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not registered OR Token malfunctioned",
      });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      parts: [{ text: content }],
    }));
    // chats.push({ role: "user", parts: [{ text: message }] });

    // send all chats with new one to gemini API
    const chat = ai.chats.create({ model: "gemini-2.5-flash", history: chats });

    // get latest response
    const response = await chat.sendMessage({ message });
    user.chats.push({ content: message, role: "user" });
    user.chats.push({ role: "model", content: response.text });
    await user.save();
    return res.status(200).json({ success: true, chats: user.chats });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not registered OR Token malfunctioned",
      });
    return res.status(200).json({ success: true, chats: user.chats });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not registered OR Token malfunctioned",
      });
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server side error: ${error.message}` });
  }
};
