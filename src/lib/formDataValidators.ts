import { z } from "zod";

const emailValidator = z.string().email({ message: "Invalid email address" });

const passwordValidator = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

export function validateEmailAndPassword(email: string, password: string) {
  const emailResult = emailValidator.safeParse(email);
  const passwordResult = passwordValidator.safeParse(password);

  return {
    email: emailResult.success
      ? undefined
      : emailResult.error.issues[0].message,
    password: passwordResult.success
      ? undefined
      : passwordResult.error.issues[0].message,
    isValid: emailResult.success && passwordResult.success,
  };
}
