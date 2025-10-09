import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (
  id: string,
  email: string,
  expiresIn: string
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  } as SignOptions);

  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Reads the token from the signed cookies
    const token = req.signedCookies[`${COOKIE_NAME}`];

    //If token empty / token not found, then reject the request
    if (!token || token.trim() === "") {
      return res
        .status(401)
        .json({ success: false, message: "Token Not Received" });
    }

    // verify returns decoded payload if valid, throws error if invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // store the decoded payload (like userId, email, etc.) for later use
    res.locals.jwtData = decoded;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
