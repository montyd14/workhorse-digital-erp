import "server-only";
import { redirect } from "next/navigation";
import { auth, hasRole } from "./auth";
import type { Role } from "@/generated/prisma/enums";

export type AppUser = { id: string; name: string; email: string; role: Role };

/** Reads the session (cookies). Redirects to the team login when signed out. Call inside <Suspense>. */
export async function requireUser(): Promise<AppUser> {
  const session = await auth();
  const u = session?.user;
  if (!u?.id || !u.role) redirect("/login/team");
  return { id: u.id, name: u.name ?? "", email: u.email ?? "", role: u.role };
}

/** Like requireUser, but also checks the role. Sends unauthorized users to the dashboard with a notice. */
export async function requireRole(allowed: Role[]): Promise<AppUser> {
  const user = await requireUser();
  if (!hasRole(user.role, allowed)) redirect("/dashboard?denied=1");
  return user;
}

export const can = {
  sales: (role: Role) => hasRole(role, ["SALES"]),
  ops: (role: Role) => hasRole(role, ["OPS"]),
  billing: (role: Role) => hasRole(role, ["MANAGER"]),
  team: (role: Role) => hasRole(role, ["ADMIN"]),
  settings: (role: Role) => hasRole(role, ["MANAGER"]),
};
