import prisma from "../lib/prisma";

async function getHabitsForMonth(
  startTime: number,
  endTime: number,
  userId: string
) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const habits = await prisma.habit.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });

  return habits.reverse();
}

async function getHabitCompletionsForMonth(
  id: string,
  startTime: number,
  endTime: number
) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  return await prisma.habit.findMany({
    where: {
      id: id,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      completions: {
        select: {
          date: true,
        },
      },
    },
  });
}

async function createHabit(
  userId: string,
  name: string,
  freq: number,
  type: "Checkbox" | "Numeric"
) {
  return await prisma.habit.create({
    data: {
      userId,
      name,
    },
  });
}

export { getHabitsForMonth, getHabitCompletionsForMonth };
