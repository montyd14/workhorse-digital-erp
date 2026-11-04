# Phase 2: Internal ERP + CRM

The private area at `/dashboard`, `/crm`, and `/erp` is the company manager the team runs the agency from. It is
built and working. This document explains what is in it, who sees what, and how to turn it on in production.

## What is built

| Area | Route | What it does |
| --- | --- | --- |
| Dashboard | `/dashboard` | New leads this week, pipeline counts by stage, active projects, outstanding invoices, follow-ups due, recent activity |
| Sales: Leads | `/crm` | Every website lead, filterable by stage, search, and "assigned to me". Lead page shows contact, attribution, status and assignment forms, activity log with notes/calls/emails/tasks, and **Convert to client** |
| Sales: Clients | `/crm/clients` | Client list and detail: editable details, projects, invoice records, activity log, add project, add invoice |
| Operations: Projects | `/erp/projects` | Board by stage (planned, building, preview, approved, live, cancelled). Project page: status, type, owner, preview and live URLs, notes, timeline, activity log |
| Billing | `/erp/billing` | Invoice records with outstanding, overdue, paid-this-month, and monthly recurring totals. Card charges still happen in Square; records are logged here |
| Team | `/erp/team` | Add team members, set roles, reset passwords, deactivate |
| Settings | `/erp/settings` | Read-only view of the server configuration and counts |

**Convert to client** creates a Client from the lead, marks the lead Won, and creates one Project per tool the lead asked for (website, CRM, ERP, call handling).

**Timeline stamps** fill in automatically when a project moves to building, preview, approved, or live.

## Roles

| Role | Can see | Can do |
| --- | --- | --- |
| Sales | Dashboard, Leads, Clients, Projects | Move leads, assign, convert, log activity, add projects |
| Operations | Dashboard, Clients, Projects | Update projects, log activity, add projects |
| Manager | All of the above plus Billing and Settings | Add and update invoice records |
| Admin | Everything plus Team | Add, edit, deactivate team members |

Admin outranks Manager, Manager outranks Sales and Operations. Role checks run server-side in every page and action (`lib/guard.ts`); the sidebar only shows what the role can open, and direct URLs to a blocked area redirect to the dashboard with a notice.

## Turning it on in production

1. In the hosting environment set `ENABLE_APP_LOGIN=true` and a strong `AUTH_SECRET` (`openssl rand -base64 32`).
2. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD` (8+ characters), and `ADMIN_NAME`, then run `npm run db:seed` once against the production database. This creates or updates the first Admin account.
3. Redeploy. The **Team / ERP** tab on `/login` becomes a working sign-in form.
4. Sign in as the admin, open **Team**, add the rest of the staff with their roles, and tell them to change their temporary passwords (you can set a new one from the Team page at any time).
5. Remove `ADMIN_PASSWORD` from the environment once the account exists.

With `ENABLE_APP_LOGIN=false` every private route redirects to the login page and the login page shows a placeholder, so nothing is reachable.

## Data model

See `prisma/schema.prisma`. Lead (pipeline), User (roles), Client, Project, Activity (notes, calls, emails, tasks, status changes), Invoice (records only).

## Not built yet

- **Client portal.** The client tab on `/login` is a placeholder. Clients would need their own accounts, a project view with the preview link, and invoice history.
- **Square sync.** Invoices are manual records. A webhook from Square could mark them paid automatically.
- **Email from the CRM.** Activities log emails but do not send them.
- **File attachments** on activities and projects.
