# Workhorse Digital

Public lead-generation website for Workhorse Digital, plus the foundation for the Phase 2 internal ERP/CRM.

**Stack:** Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, Prisma 7 with MySQL, Auth.js, Nodemailer.

## Project layout

```
app/
  (marketing)/      Public site: home, services, industries, how-it-works, free-build,
                    thank-you, about, contact, blog, privacy, terms
  (app)/            Phase 2 private area (dashboard, crm, erp). Protected by proxy.ts.
  login/            Login page. Disabled until ENABLE_APP_LOGIN=true.
  api/leads/        Lead form endpoint (zod validation, honeypot, rate limit, DB, email)
  api/auth/         Auth.js route handler
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.png, apple-icon.png
components/         Nav, footer, lead forms, FAQ, CTA, JSON-LD, UI primitives
content/
  industries/       One file per industry. Add a file + list it in index.ts = new landing page.
  services.ts       The four services
  blog/             MDX posts with frontmatter
lib/                db.ts (Prisma), auth.ts (Auth.js + role helpers), seo.ts (metadata + JSON-LD),
                    site.ts (settings), mail.ts, rate-limit.ts, analytics.ts, blog.ts, lead-schema.ts
prisma/schema.prisma
proxy.ts            Protects (app) routes. (Next.js 16 name for middleware.ts.)
public/brand/       Logo assets
PHASE2.md           Plan for the internal ERP/CRM
```

## Local setup

Requirements: Node 20.9+ (22 recommended), a MySQL 8 database.

```bash
npm install                 # also runs prisma generate
cp .env.example .env        # fill in DATABASE_URL at minimum
npx prisma migrate dev --name init   # creates tables locally
npm run dev                 # http://localhost:3000
```

Useful scripts:

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server                                    |
| `npm run build`     | `prisma generate` + production build          |
| `npm start`         | Production server (uses `PORT` if set)        |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | Route type generation + `tsc`                 |
| `npm run db:migrate`| Apply migrations in production                |
| `npm run db:studio` | Prisma Studio to browse leads                 |

## Adding content

- **Industry page:** copy `content/industries/vending.ts`, change the fields, import and add it to the array in `content/industries/index.ts`. The landing page, sitemap entry, form dropdown, footer link, and service cross-links are generated.
- **Blog post:** add an `.mdx` file to `content/blog/` with `title`, `description`, `publishedAt`, optional `industry` (slug) and `services` (array of service slugs) in the frontmatter.
- **Brand colors and fonts:** `app/globals.css` (`@theme` block) and the two `next/font` loaders in `app/layout.tsx`.
- **Phone, email, booking link, social links:** env vars, see `.env.example`.

## Deploying to Hostinger (Node.js hosting)

Hostinger's Node.js hosting runs `npm install`, `npm run build`, then `npm start`, and provides MySQL.

1. **Create the MySQL database** in hPanel (Databases → Management). Note the database name, user, password, and host. Build the connection string:
   `mysql://USER:PASSWORD@HOST:3306/DATABASE`
2. **Create the Node.js app** in hPanel (Websites → your domain → Node.js, or "Web apps"). Connect this GitHub repository and choose the `main` branch.
3. **Set environment variables** in the app settings. Copy every key from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` must be your real domain with `https://`.
   - `DATABASE_URL` from step 1.
   - SMTP settings for lead emails. Use a Hostinger mailbox: host `smtp.hostinger.com`, port `465`.
   - `AUTH_SECRET`: run `openssl rand -base64 32` locally and paste the result.
   - `ENABLE_APP_LOGIN=false` until Phase 2.
   - `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` once you have them.
4. **Set the commands** if Hostinger asks: build `npm run build`, start `npm start`. Node version 22.
5. **Create the tables.** On first deploy, run the migration against the production database. Either:
   - From your machine with `DATABASE_URL` pointed at Hostinger (enable Remote MySQL in hPanel and allow your IP), run `npx prisma migrate deploy`, or
   - Use Hostinger's SSH/terminal on the app and run `npm run db:migrate`.
6. **Deploy.** Push to `main`. Hostinger builds and restarts the app.
7. **Verify:** open the site, submit the free-build form, confirm the row appears in the `Lead` table and the notification email arrives. Check `/sitemap.xml` and `/robots.txt`.
8. **Search Console:** add the property, verify with the meta tag env var, and submit `/sitemap.xml`.

Notes:

- Prisma runs without a native engine binary (driver adapter), so it works on shared Node hosting.
- Rate limiting is in memory. That is fine for one Node instance. If you ever scale to several instances, move it to the database.
- `next/image` optimization works on the Node server. If Hostinger's image optimizer is slow, set `images.unoptimized: true` in `next.config.ts` and serve pre-sized images.

## CI

GitHub Actions runs lint, type check, and a production build on every push and pull request.
