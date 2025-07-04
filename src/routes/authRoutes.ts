import { Router } from "express";
import {
  getTokenData,
  login,
  signup,
  validateNewUser,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/validate-new-user", validateNewUser);
router.post("/decrypt-token", getTokenData);
router.post("/login", login);

export default router;
