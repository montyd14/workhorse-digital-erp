# Architecture

Single Next.js 16 application. Public marketing pages are prerendered static; the lead API and the Phase 2 private
area run on the Node server.

| Part | Purpose | Stack |
| --- | --- | --- |
| `app/(marketing)` | Public lead-gen site | Next.js App Router, Tailwind 4, MDX |
| `app/api/leads` | Lead capture | Route handler, zod, Prisma, Nodemailer |
| `app/(app)` + `proxy.ts` | Phase 2 ERP/CRM shell | Auth.js (JWT), role helpers |
| `prisma/` | Data model | Prisma 7, MySQL via mariadb driver adapter |

Content is code: industries and services are TypeScript objects, blog posts are MDX. Adding content does not require
touching page components.

See [PHASE2.md](../PHASE2.md) for the private side and [README.md](../README.md) for setup and deployment.
