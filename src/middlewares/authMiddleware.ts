import { NextFunction, Request, Response } from "express";
import { decryptToken } from "../lib/session";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  if (!token || decryptToken(token) === undefined) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

export { authMiddleware };
