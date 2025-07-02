import prisma from "../lib/prisma";

const userEmail = "zhasulanov.erasyl@mail.ru";

const habitNames = [
  "Morning Workout",
  "Read 10 Pages",
  "Meditate 5 Minutes",
  "Drink 2L Water",
  "Write Journal Entry",
];

function getRandomDaysOfMonth(max = 10): Date[] {
  const days = new Set<number>();
  const now = new Date(new Date().getFullYear(), 5, 29);
  const year = now.getFullYear();
  const month = now.getMonth();

  while (days.size < max) {
    const day = Math.floor(Math.random() * 28) + 1;
    days.add(day);
  }

  return Array.from(days).map((day) => new Date(year, month, day));
}

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    console.error(`User with email ${userEmail} not found.`);
    return;
  }

  for (const name of habitNames) {
    const habit = await prisma.habit.create({
      data: {
        userId: user.id,
        name,
        completions: {
          create: getRandomDaysOfMonth(10).map((date) => ({
            date,
          })),
        },
        createdAt: new Date(Date.UTC(2025, 5, 1)),
      },
    });

    console.log(`Created habit: ${habit.name}`);
  }

  console.log("✅ 5 habits with completions seeded.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
