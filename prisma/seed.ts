import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

/** Creates (or updates) the first ADMIN user from ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME. */
async function main() {
  const url = process.env.DATABASE_URL;
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Admin";
  if (!url || !email || !password) throw new Error("DATABASE_URL, ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  if (password.length < 8) throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  const u = new URL(url);
  const prisma = new PrismaClient({
    adapter: new PrismaMariaDb({
      host: u.hostname,
      port: u.port ? Number(u.port) : 3306,
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
    }),
  });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name, role: "ADMIN", isActive: true },
    create: { email, passwordHash, name, role: "ADMIN" },
  });
  console.log(`Admin ready: ${user.email} (${user.role})`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
