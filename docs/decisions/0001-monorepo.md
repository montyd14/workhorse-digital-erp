# ADR 0001: Single Next.js app instead of separate front end and back end

**Status:** Accepted (supersedes the initial monorepo scaffold)
**Date:** 2026-11-02

## Context

The first scaffold split the repo into `apps/web` and `apps/api`. The Phase 1 brief calls for a Next.js site with API
routes, deployed to Hostinger Node.js hosting, which runs one Node process.

## Decision

One Next.js application at the repo root. API routes live in `app/api`. The Phase 2 private area is a route group in
the same app.

## Consequences

- One build, one deploy, one process on Hostinger.
- Shared types need no package boundary.
- If the ERP ever needs a separate service, it can be split out later with the Prisma schema as the contract.
