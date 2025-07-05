import { Request, Response } from "express";
import { getHabitsForMonth as fetchHabitsForMonth } from "../services/habits";
import { getHabitCompletionsForMonth as fetchHabitCompletionsForMonth } from "../services/habits";

async function getHabitsForMonth(req: Request, res: Response) {
  const { startTime, endTime, userId } = req.body;
  const habits = await fetchHabitsForMonth(
    Number(startTime),
    Number(endTime),
    userId
  );

  res.json({ habits });
}

async function getHabitsCompletionsForMonth(req: Request, res: Response) {
  const { startTime, endTime, habitId } = req.body;
  const completions = await fetchHabitCompletionsForMonth(
    habitId,
    startTime,
    endTime
  );
  res.json({ completions });
}

async function handleCreateHabit(req: Request, res: Response) {
  const { userId, name, freq, type } = req.body;
  const habit = await createHabit(userId, name, freq, type);
  res.status(200).json({ habit });
}

export { getHabitsForMonth, getHabitsCompletionsForMonth, handleCreateHabit };
