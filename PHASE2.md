# Phase 2: Internal ERP + CRM

Phase 1 ships the public site and lead capture. Phase 2 turns the private `(app)` area into the internal system the
team runs the agency from. This document records what is already in place and where each feature plugs in.

## What exists today

| Piece | Location | Status |
| --- | --- | --- |
| Database schema | `prisma/schema.prisma` | Lead fully used; User, Client, Project, Activity, Invoice stubbed |
| Auth.js config | `lib/auth.ts` | Credentials provider wired to User; disabled by `ENABLE_APP_LOGIN` |
| Route protection | `proxy.ts` | Redirects `/dashboard`, `/crm`, `/erp` to `/login` when no session |
| Role helpers | `lib/auth.ts` (`hasRole`, `requireRole`) | Ready for page and action guards |
| Private layout | `app/(app)/layout.tsx` | Sidebar shell with placeholder nav |
| Login page | `app/login/` | Styled; shows placeholder until the flag is on |

## Schema

### Lead (live)

Every public form submission. Fields: contact info, industry, needs, website, message, attribution (source page, UTM, referrer), `status`, `assignedToId`.

`status` is the CRM pipeline:

```
new → contacted → discovery_booked → building → preview_sent → won | lost
```

### User

Internal team members. `role` is one of `SALES`, `OPS`, `MANAGER`, `ADMIN`. `passwordHash` is bcrypt.

### Client (stub)

Created when a lead is won. Links back to the lead. TODO: billing contact, address, notes, portal access.

### Project (stub)

The build for a client: `type` (website, crm, erp, call_handling) and `status` (planned, building, preview, approved, live, cancelled). TODO: milestones, preview URL, approval and go-live dates, assigned team.

### Activity (stub)

Notes, calls, emails, and status changes on a lead or client, attributed to a user. TODO: attachments, follow-up reminders, email threading.

### Invoice (stub)

Record only. Card billing happens in Square outside the system. TODO: line items, recurring monthly schedule, Square reference sync.

## Roles

| Role | Sees | Can |
| --- | --- | --- |
| SALES | Leads, own activities | Move leads through the pipeline, log activities |
| OPS | Clients, projects | Update project status, log activities |
| MANAGER | Everything above plus team and billing views | Assign leads, approve projects |
| ADMIN | Everything | Manage users and settings |

`hasRole(role, allowed)` treats higher ranks as superset (ADMIN passes any check). Use `requireRole([...])` at the top of a server component or action.

## Turning on login

1. Set `AUTH_SECRET` and `ENABLE_APP_LOGIN=true`.
2. Create the first admin user. A seed script is the cleanest way:
   ```ts
   // prisma/seed.ts (to be added)
   await db.user.create({ data: { email, name, role: "ADMIN", passwordHash: await bcrypt.hash(password, 12) } });
   ```
3. `/login` renders the real form. The proxy allows `(app)` routes once the session cookie exists.

## Where each feature plugs in

| Feature | Route | Data | Notes |
| --- | --- | --- | --- |
| Dashboard | `app/(app)/dashboard` | Lead counts by status, projects by status, invoices due | Server component with `requireRole(["SALES","OPS"])` |
| Leads / CRM | `app/(app)/crm` | Lead, Activity, User | Kanban by `status`; assign via `assignedToId`; convert to Client on `won` |
| Clients | `app/(app)/crm/clients` | Client, Project, Invoice | Detail page with tabs |
| Projects | `app/(app)/erp/projects` | Project | Build tracker; preview URL and approval flow |
| Billing | `app/(app)/erp/billing` | Invoice | Record setup and monthly invoices; mark paid from Square |
| Team | `app/(app)/erp/team` | User | ADMIN only; invite, deactivate, change role |
| Settings | `app/(app)/erp/settings` | — | Notification email, pipeline stage labels, industries list |

The nav list lives in `app/(app)/layout.tsx` (`appNav`). Replace the "Phase 2" badge as each section ships.

## Conventions to keep

- Marketing pages stay fully static. Anything that reads the session goes inside `(app)` and behind `<Suspense>`.
- Data access in server components or server actions only. No Prisma in client components or in `proxy.ts`.
- Lead status changes should write an `Activity` row of type `status_change`.
- The public lead API keeps working unchanged; the CRM reads the same table.
