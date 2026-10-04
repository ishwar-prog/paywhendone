# ADR 0004: ES modules with NodeNext resolution

- **Status:** Accepted
- **Date:** 2026-10-05

## Context

Node.js supports two module systems: the older CommonJS (`require`) and the modern ES modules (`import`). TypeScript must be told which rules to follow so that compiled code runs correctly in Node.

## Decision

Use ES modules everywhere (`"type": "module"`) with TypeScript's `NodeNext` module resolution. Relative imports in TypeScript files end in `.js`, for example `import { createApp } from './app.js'`, because that is the file name Node will see after compilation.

During development, `tsx` runs the TypeScript directly. For production, `tsc` compiles to `dist/` and Node runs the output.

## Consequences

- Compiled output runs on plain Node with no extra tooling.
- The `.js` in imports looks odd in `.ts` files at first, but it is the standard for modern Node and TypeScript.
- Tools in the project must support ES modules. All current ones do.