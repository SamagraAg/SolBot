import { NextFunction, Request, Response } from "express";
import ai from "../config/googleai-config.js";


export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });
    res.status(200).json({ success: true, response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "server error" });
  }
};
