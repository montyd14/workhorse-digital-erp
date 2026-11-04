"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { requireRole, requireUser } from "@/lib/guard";
import { INVOICE_KINDS, INVOICE_STATUSES, LEAD_STATUSES, PROJECT_STATUSES, PROJECT_TYPES, ROLES } from "@/lib/status";
import type { LeadStatus, Role } from "@/generated/prisma/enums";

const enumOf = <T extends readonly { value: string }[]>(list: T) =>
  z.enum(list.map((x) => x.value) as [string, ...string[]]);

const optional = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .transform((v) => v || null)
  .refine((v) => v === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Invalid email");

function back(path: string, msg?: string, ok?: string): never {
  const q = msg ? `?error=${encodeURIComponent(msg)}` : ok ? `?ok=${encodeURIComponent(ok)}` : "";
  redirect(`${path}${q}`);
}

function firstError(e: z.ZodError) {
  return e.issues[0]?.message ?? "Please check the form";
}

function obj(formData: FormData) {
  return Object.fromEntries(formData) as Record<string, string>;
}

/* ---------------- Session ---------------- */

export async function signOutAction() {
  await signOut({ redirectTo: "/login/team" });
}

/* ---------------- Leads (Sales) ---------------- */

export async function updateLeadStatus(formData: FormData) {
  const user = await requireRole(["SALES"]);
  const parsed = z.object({ leadId: z.string().min(1), status: enumOf(LEAD_STATUSES) }).safeParse(obj(formData));
  if (!parsed.success) back("/crm", firstError(parsed.error));
  const { leadId, status } = parsed.data;
  const lead = await db.lead.findUnique({ where: { id: leadId }, select: { status: true } });
  if (!lead) back("/crm", "Lead not found");
  await db.$transaction([
    db.lead.update({ where: { id: leadId }, data: { status: status as LeadStatus } }),
    db.activity.create({
      data: { type: "status_change", body: `Status changed from ${lead.status} to ${status}`, leadId, userId: user.id },
    }),
  ]);
  revalidatePath("/crm");
  revalidatePath(`/crm/leads/${leadId}`);
  revalidatePath("/dashboard");
}

export async function assignLead(formData: FormData) {
  await requireRole(["SALES"]);
  const parsed = z.object({ leadId: z.string().min(1), userId: z.string() }).safeParse(obj(formData));
  if (!parsed.success) back("/crm", firstError(parsed.error));
  const { leadId, userId } = parsed.data;
  await db.lead.update({ where: { id: leadId }, data: { assignedToId: userId || null } });
  revalidatePath("/crm");
  revalidatePath(`/crm/leads/${leadId}`);
}

export async function convertLead(formData: FormData) {
  const user = await requireRole(["SALES"]);
  const leadId = String(formData.get("leadId") ?? "");
  const lead = await db.lead.findUnique({ where: { id: leadId }, include: { client: true } });
  if (!lead) back("/crm", "Lead not found");
  if (lead.client) redirect(`/crm/clients/${lead.client.id}`);

  const needs = Array.isArray(lead.needs) ? (lead.needs as string[]) : [];
  const types = needs.filter((n) => ["website", "crm", "erp", "call_handling"].includes(n));

  const client = await db.client.create({
    data: {
      name: lead.businessName,
      industry: lead.industry,
      contactName: lead.name,
      email: lead.email || null,
      phone: lead.phone,
      leadId: lead.id,
      projects: {
        create: types.map((t) => ({
          name: `${lead.businessName} ${PROJECT_TYPES.find((p) => p.value === t)?.label ?? t}`,
          type: t,
          status: "planned",
          ownerId: user.id,
        })),
      },
      activities: { create: { type: "note", body: `Converted from lead by ${user.name}`, userId: user.id } },
    },
  });
  await db.lead.update({ where: { id: leadId }, data: { status: "WON" } });
  revalidatePath("/crm");
  revalidatePath("/crm/clients");
  revalidatePath("/erp/projects");
  revalidatePath("/dashboard");
  redirect(`/crm/clients/${client.id}`);
}

/* ---------------- Activities (shared) ---------------- */

const activitySchema = z.object({
  entity: z.enum(["lead", "client", "project"]),
  entityId: z.string().min(1),
  type: z.enum(["note", "call", "email", "task"]),
  body: z.string().trim().min(1, "Write something first").max(4000),
  dueAt: z.string().optional(),
  returnTo: z.string().startsWith("/"),
});

export async function addActivity(formData: FormData) {
  const user = await requireUser();
  const parsed = activitySchema.safeParse(obj(formData));
  if (!parsed.success) back(String(formData.get("returnTo") ?? "/dashboard"), firstError(parsed.error));
  const { entity, entityId, type, body, dueAt, returnTo } = parsed.data;
  await db.activity.create({
    data: {
      type,
      body,
      userId: user.id,
      dueAt: type === "task" && dueAt ? new Date(`${dueAt}T09:00:00`) : null,
      leadId: entity === "lead" ? entityId : undefined,
      clientId: entity === "client" ? entityId : undefined,
      projectId: entity === "project" ? entityId : undefined,
    },
  });
  revalidatePath(returnTo);
  revalidatePath("/dashboard");
  redirect(returnTo);
}

export async function completeTask(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/dashboard");
  await db.activity.update({ where: { id }, data: { done: true } });
  revalidatePath(returnTo);
  revalidatePath("/dashboard");
}

/* ---------------- Clients ---------------- */

export async function updateClient(formData: FormData) {
  await requireRole(["SALES", "OPS"]);
  const parsed = z
    .object({
      id: z.string().min(1),
      name: z.string().trim().min(1, "Name is required").max(160),
      industry: optional(80),
      contactName: optional(120),
      email: optionalEmail,
      phone: optional(40),
      address: optional(300),
      notes: optional(4000),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back(`/crm/clients/${formData.get("id")}`, firstError(parsed.error));
  const { id, ...data } = parsed.data;
  await db.client.update({ where: { id }, data });
  revalidatePath(`/crm/clients/${id}`);
  revalidatePath("/crm/clients");
  back(`/crm/clients/${id}`, undefined, "Client saved");
}

export async function createClient(formData: FormData) {
  await requireRole(["SALES", "OPS"]);
  const parsed = z
    .object({
      name: z.string().trim().min(1, "Business name is required").max(160),
      industry: optional(80),
      contactName: optional(120),
      email: optionalEmail,
      phone: optional(40),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back("/crm/clients", firstError(parsed.error));
  const client = await db.client.create({ data: parsed.data });
  revalidatePath("/crm/clients");
  redirect(`/crm/clients/${client.id}`);
}

/* ---------------- Projects (Operations) ---------------- */

export async function createProject(formData: FormData) {
  const user = await requireRole(["OPS", "SALES"]);
  const parsed = z
    .object({
      clientId: z.string().min(1, "Pick a client"),
      name: z.string().trim().min(1, "Name is required").max(160),
      type: enumOf(PROJECT_TYPES),
      ownerId: z
        .string()
        .optional()
        .transform((v) => v || user.id),
      previewUrl: optional(300),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back("/erp/projects", firstError(parsed.error));
  const project = await db.project.create({ data: { ...parsed.data, status: "planned" } });
  revalidatePath("/erp/projects");
  revalidatePath(`/crm/clients/${parsed.data.clientId}`);
  redirect(`/erp/projects/${project.id}`);
}

export async function updateProject(formData: FormData) {
  const user = await requireRole(["OPS", "SALES"]);
  const parsed = z
    .object({
      id: z.string().min(1),
      name: z.string().trim().min(1).max(160),
      status: enumOf(PROJECT_STATUSES),
      type: enumOf(PROJECT_TYPES),
      ownerId: z
        .string()
        .optional()
        .transform((v) => v || null),
      previewUrl: optional(300),
      liveUrl: optional(300),
      notes: optional(4000),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back(`/erp/projects/${formData.get("id")}`, firstError(parsed.error));
  const { id, ...data } = parsed.data;
  const before = await db.project.findUnique({ where: { id }, select: { status: true, clientId: true } });
  if (!before) back("/erp/projects", "Project not found");
  const now = new Date();
  const stamps: Record<string, Date> = {};
  if (before.status !== data.status) {
    if (data.status === "building") stamps.startedAt = now;
    if (data.status === "preview") stamps.previewAt = now;
    if (data.status === "approved") stamps.approvedAt = now;
    if (data.status === "live") stamps.liveAt = now;
  }
  await db.$transaction([
    db.project.update({ where: { id }, data: { ...data, ...stamps } }),
    ...(before.status !== data.status
      ? [
          db.activity.create({
            data: {
              type: "status_change",
              body: `Status changed from ${before.status} to ${data.status}`,
              projectId: id,
              userId: user.id,
            },
          }),
        ]
      : []),
  ]);
  revalidatePath("/erp/projects");
  revalidatePath(`/erp/projects/${id}`);
  revalidatePath(`/crm/clients/${before.clientId}`);
  revalidatePath("/dashboard");
  back(`/erp/projects/${id}`, undefined, "Project saved");
}

/* ---------------- Billing ---------------- */

export async function createInvoice(formData: FormData) {
  await requireRole(["MANAGER"]);
  const returnTo = String(formData.get("returnTo") || "/erp/billing");
  const parsed = z
    .object({
      clientId: z.string().min(1, "Pick a client"),
      kind: enumOf(INVOICE_KINDS),
      amount: z.coerce.number().positive("Amount must be more than zero"),
      description: optional(300),
      status: enumOf(INVOICE_STATUSES),
      dueAt: z.string().optional(),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back(returnTo, firstError(parsed.error));
  const { amount, dueAt, status, clientId, kind, description } = parsed.data;
  await db.invoice.create({
    data: {
      clientId,
      kind,
      description,
      amountCents: Math.round(amount * 100),
      status,
      issuedAt: status === "draft" ? null : new Date(),
      paidAt: status === "paid" ? new Date() : null,
      dueAt: dueAt ? new Date(`${dueAt}T12:00:00`) : null,
    },
  });
  revalidatePath("/erp/billing");
  revalidatePath(`/crm/clients/${clientId}`);
  revalidatePath("/dashboard");
  back(returnTo, undefined, "Invoice added");
}

export async function updateInvoiceStatus(formData: FormData) {
  await requireRole(["MANAGER"]);
  const parsed = z
    .object({ id: z.string().min(1), status: enumOf(INVOICE_STATUSES), returnTo: z.string().optional() })
    .safeParse(obj(formData));
  if (!parsed.success) back("/erp/billing", firstError(parsed.error));
  const { id, status, returnTo } = parsed.data;
  const inv = await db.invoice.findUnique({ where: { id }, select: { issuedAt: true, clientId: true } });
  if (!inv) back("/erp/billing", "Invoice not found");
  await db.invoice.update({
    where: { id },
    data: {
      status,
      issuedAt: status === "draft" ? inv.issuedAt : (inv.issuedAt ?? new Date()),
      paidAt: status === "paid" ? new Date() : null,
    },
  });
  revalidatePath("/erp/billing");
  revalidatePath(`/crm/clients/${inv.clientId}`);
  revalidatePath("/dashboard");
  if (returnTo && returnTo.startsWith("/")) redirect(returnTo);
}

/* ---------------- Team (Admin) ---------------- */

export async function createUser(formData: FormData) {
  await requireRole(["ADMIN"]);
  const parsed = z
    .object({
      name: z.string().trim().min(1, "Name is required").max(120),
      email: z.email("Invalid email").transform((v) => v.toLowerCase()),
      password: z.string().min(8, "Password must be at least 8 characters").max(200),
      role: enumOf(ROLES),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back("/erp/team", firstError(parsed.error));
  const { password, ...rest } = parsed.data;
  const exists = await db.user.findUnique({ where: { email: rest.email } });
  if (exists) back("/erp/team", "A user with that email already exists");
  await db.user.create({ data: { ...rest, role: rest.role as Role, passwordHash: await bcrypt.hash(password, 12) } });
  revalidatePath("/erp/team");
  back("/erp/team", undefined, "Team member added");
}

export async function updateUser(formData: FormData) {
  const me = await requireRole(["ADMIN"]);
  const parsed = z
    .object({
      id: z.string().min(1),
      role: enumOf(ROLES),
      isActive: z.string().optional(),
      password: z.string().optional(),
    })
    .safeParse(obj(formData));
  if (!parsed.success) back("/erp/team", firstError(parsed.error));
  const { id, role, isActive, password } = parsed.data;
  if (id === me.id && (role !== "ADMIN" || isActive !== "on")) back("/erp/team", "You cannot demote or deactivate yourself");
  if (password && password.length < 8) back("/erp/team", "Password must be at least 8 characters");
  await db.user.update({
    where: { id },
    data: {
      role: role as Role,
      isActive: isActive === "on",
      ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
    },
  });
  revalidatePath("/erp/team");
  back("/erp/team", undefined, "Team member updated");
}
