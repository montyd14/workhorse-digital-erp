# ADR 0001: Use a single monorepo for web and api

**Status:** Accepted
**Date:** 2026-11-02

## Context

The front end and back end will be developed together by a small team and share types and
validation logic.

## Decision

Keep both apps and shared code in one repository using npm workspaces.

## Consequences

- One place for issues, CI, and releases.
- Shared types stay in sync without publishing packages.
- CI must be scoped so that changes to one app do not needlessly rebuild the other.
