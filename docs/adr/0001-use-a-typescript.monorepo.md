# ADR 0001: Use a TypeScript monorepo

- **Status:** Accepted
- **Date:** 2026-10-05

## Context

The project has a backend, a frontend and code both need, such as request and response types. Keeping them in separate repositories would make it easy for the two sides to drift apart.

## Decision

Use one repository with npm workspaces: `apps/api`, `apps/web` and `packages/shared`. Use TypeScript in all of them.

## Consequences

- A change to a shared type is checked against both apps at once.
- One CI pipeline, one place for documentation, one history of commits.
- npm workspaces are built into npm, so there is nothing extra to install.
- The repository grows larger over time, and the apps must still be kept independent of each other.