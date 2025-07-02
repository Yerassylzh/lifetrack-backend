import { Router } from "express";
import {
  getHabitsForMonth,
  getHabitsCompletionsForMonth,
} from "../controllers/statsController";

const router = Router();

router.post("/get-habits-for-month", getHabitsForMonth);
router.post("/get-habit-completions-for-month", getHabitsCompletionsForMonth);

export default router;
