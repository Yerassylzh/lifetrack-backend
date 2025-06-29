import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_TOKEN,
});
const prisma = new PrismaClient({ adapter });

export default prisma;
