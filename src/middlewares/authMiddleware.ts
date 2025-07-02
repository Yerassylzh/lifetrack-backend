import { NextFunction, Request, Response } from "express";
import { decryptToken } from "../lib/session";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || decryptToken(token) === undefined) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userData = await decryptToken(token);
  if (!userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.body.userId = userData.user.id;
  next();
};

export { authMiddleware };
