import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "./db";
import type { Role } from "@/generated/prisma/enums";

/**
 * Auth.js (NextAuth v5) configured with a credentials provider against the
 * User table. JWT sessions keep the proxy free of database calls.
 *
 * Login stays disabled until ENABLE_APP_LOGIN=true (Phase 2).
 */
export const APP_LOGIN_ENABLED = process.env.ENABLE_APP_LOGIN === "true";

declare module "next-auth" {
  interface Session {
    user: { id: string; role: Role } & DefaultSession["user"];
  }
  interface User {
    role?: Role;
  }
}

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login/team" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        if (!APP_LOGIN_ENABLED) return null;
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
        if (!user || !user.isActive) return null;
        const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },
});

/* ---------- Role helpers for Phase 2 pages ---------- */

const ROLE_RANK: Record<Role, number> = { SALES: 1, OPS: 1, MANAGER: 2, ADMIN: 3 };

/** True if the role is one of the allowed roles, or outranks them (ADMIN sees all). */
export function hasRole(role: Role | undefined, allowed: Role[]): boolean {
  if (!role) return false;
  if (allowed.includes(role)) return true;
  return ROLE_RANK[role] >= Math.max(...allowed.map((r) => ROLE_RANK[r]));
}

/** Server-side guard for a page or action. Throws if the user is missing or lacks the role. */
export async function requireRole(allowed: Role[]) {
  const session = await auth();
  if (!session?.user || !hasRole(session.user.role, allowed)) {
    throw new Error("Forbidden");
  }
  return session;
}
