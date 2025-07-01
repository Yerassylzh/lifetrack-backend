import { Router } from "express";
import {
  checkToken,
  login,
  signup,
  validateNewUser,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/validate-new-user", validateNewUser);
router.post("/check-token", checkToken);
router.post("/login", login);

export default router;
