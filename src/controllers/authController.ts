import { Request, Response } from "express";
import { createSession, decryptToken } from "../lib/session";
import { checkEmailExists, checkUserData, createUser } from "../services/users";
import { validateEmailAndPassword } from "../lib/formDataValidators";
import { isValid } from "zod";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);
  const session = await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  res.json({ session }).status(200);
};

const validateNewUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const validationData = validateEmailAndPassword(email, password);
  if (!validationData.isValid) {
    res.json(validationData).status(200);
    return;
  }

  const exists = await checkEmailExists(email);
  if (exists) {
    res
      .json({
        email: "User with such email already exists",
        password: undefined,
        isValid: false,
      })
      .status(200);
    return;
  }
  res
    .json({
      isValid: true,
    })
    .status(200);
};

const checkToken = async (req: Request, res: Response) => {
  const { session } = req.body;
  const payload = await decryptToken(session);
  res.json({}).status(payload !== undefined ? 200 : 401);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await checkUserData(email, password);
  if (!user) {
    res
      .json({
        success: false,
        message: "Incorrect combination of email and password",
      })
      .status(401);
    return;
  }

  const session = await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  res.json({ success: true, session }).status(200);
};

export { signup, validateNewUser, checkToken, login };
