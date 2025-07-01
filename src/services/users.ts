import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import { comparePasswords, hashPassword } from "../lib/password";

async function createUser(name: string, email: string, password: string) {
  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
  });
  return user as User;
}

async function checkEmailExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return false;
  }
  return true;
}

async function checkUserData(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }
  return (await comparePasswords(password, user.password)) ? user : null;
}

export { createUser, checkEmailExists, checkUserData };
