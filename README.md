# Workhorse Digital ERP

Internal platform for Workhorse Digital, a digital marketing agency. This repository holds the
public-facing website, the client portal, and the back-office API in a single monorepo.

## Repository layout

```
workhorse-digital-erp/
├── apps/
│   ├── web/        # Front end (marketing site + client portal)
│   └── api/        # Back end (REST API, auth, business logic)
├── packages/
│   └── shared/     # Code shared between web and api (types, validation, constants)
├── docs/           # Architecture notes, decisions, runbooks
├── scripts/        # Developer and CI helper scripts
└── .github/        # CI workflows, issue and PR templates
```

## Getting started

Requirements: Node 22+ and npm 10+.

```bash
npm install
cp .env.example .env
npm run dev
```

Each app has its own README with details once it is scaffolded.

## Branching

- `main` is always deployable.
- Work happens on short-lived branches (`feature/...`, `fix/...`, `chore/...`).
- Open a pull request to merge into `main`. CI must pass.

## Documentation

See [docs/](docs/) for architecture, decisions, and runbooks.
