import { Request, Response } from "express";
import { createSession, decryptToken } from "../lib/session";
import { checkEmailExists, checkUserData, createUser } from "../services/users";
import { validateEmailAndPassword } from "../lib/formDataValidators";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);
  const session = await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  res.json({ session });
};

const validateNewUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const validationData = validateEmailAndPassword(email, password);
  if (!validationData.isValid) {
    res.json(validationData);
    return;
  }

  const exists = await checkEmailExists(email);
  if (exists) {
    res.json({
      email: "User with such email already exists",
      password: undefined,
      isValid: false,
    });
    return;
  }
  res.json({
    isValid: true,
  });
};

const getTokenData = async (req: Request, res: Response) => {
  const { session } = req.body;
  const payload = await decryptToken(session);
  res.status(payload !== undefined ? 200 : 401).json({ payload });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await checkUserData(email, password);
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Incorrect combination of email and password",
    });
    return;
  }

  const session = await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  res.json({ success: true, session });
};

export { signup, validateNewUser, getTokenData, login };
