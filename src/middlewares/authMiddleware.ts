import { NextFunction, Request, Response } from "express";
import { decryptToken } from "../lib/session";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userData = token ? await decryptToken(token) : undefined;
  if (!token || !userData) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.body.userId && req.body.userId !== userData.user.id) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.body.userId = userData.user.id;
  next();
};

export { authMiddleware };
