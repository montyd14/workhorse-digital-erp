# Architecture

## Overview

Workhorse Digital ERP is a monorepo with two deployable apps and one shared package.

| Part             | Purpose                                              | Planned stack                         |
| ---------------- | ---------------------------------------------------- | ------------------------------------- |
| `apps/web`       | Marketing site and client portal                     | Next.js, TypeScript, Tailwind CSS     |
| `apps/api`       | REST API, auth, client/project/invoice management    | Node.js, TypeScript, Fastify, Prisma  |
| `packages/shared`| Types, validation, constants shared by both          | TypeScript, Zod                       |

## Planned ERP modules

- Clients and contacts
- Projects and deliverables
- Campaign tracking and reporting
- Proposals, invoices, and payments
- Team and task management

## Environments

- `development` – local machines
- `staging` – pre-release testing
- `production` – live

Details to be filled in as each piece is built.
