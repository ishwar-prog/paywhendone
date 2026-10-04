# ADR 0003: Express 5, Zod and pino for the API

- **Status:** Accepted
- **Date:** 2026-10-05

## Context

The backend needs a web framework, a way to validate configuration and input, and a logger. The author knows Express already, and one goal of the project is to understand how each part works.

## Decision

- **Express 5** as the web framework.
- **Zod** to validate environment variables now, and request data later.
- **pino** (with pino-http) for structured JSON logging.

## Alternatives considered

- **Fastify:** a modern framework with built-in validation and logging. A good choice, but it hides some of the mechanics we want to learn and adds a second thing to learn.
- **NestJS:** a full framework with many conventions. It is heavier than this project needs and would hide the fundamentals.

## Consequences

- Express 5 forwards errors from async handlers to the error handler automatically, so we need no wrapper code. A test proves this.
- Zod schemas give both runtime validation and TypeScript types from one definition.
- pino writes JSON, which is easy for tools to search, and supports redacting sensitive fields.
- Express leaves structure to us, so consistency depends on the rules in the architecture document.