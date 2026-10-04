# PayWhenDone

> Milestone-based payment protection for freelancers and the clients who hire them.

[![CI](https://github.com/YOUR-USERNAME/paywhendone/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR-USERNAME/paywhendone/actions/workflows/ci.yml)

**Status:** Phase 2 of 18 - API skeleton. There are no product features yet; they arrive phase by phase (see the [roadmap](docs/ROADMAP.md)).

## The problem

Freelancers often deliver work and then struggle to get paid, while clients worry about paying for work they never receive. PayWhenDone puts a neutral rule in the middle: the client pays for a milestone up front, the freelancer delivers, and the money is released only when the work is accepted or the review window expires.

The problem comes from Razorpay's [Fix My Itch](https://razorpay.com/m/fix-my-itch/) list of real problems faced by people in India.

## How it will work

1. A client and a freelancer agree on a contract split into milestones.
2. The client pays for a milestone. The payment partner holds the money instead of paying it out.
3. The freelancer submits the work.
4. The client approves and the money is released. If the client stays silent, it is released automatically after a review window. If there is a dispute, the money stays frozen until it is resolved.

## Important disclaimer

This is a learning and portfolio project that runs in Razorpay **test mode only**. No real money moves. PayWhenDone is not a bank, an escrow provider or a licensed payment aggregator. In a real deployment, the licensed payment partner would hold the funds and this application would never touch them. See [ADR 0002](docs/adr/0002-payment-partner-holds-the-money.md).

## Tech stack (planned)

- **Language:** TypeScript everywhere
- **Backend:** Node.js, Express, PostgreSQL, Drizzle ORM
- **Frontend:** React, Vite, Tailwind CSS
- **Quality:** Vitest, ESLint, Prettier, Husky, GitHub Actions
- **Local environment:** Docker

## Repository structure

```text
paywhendone/
  apps/
    api/        Express backend 
    web/        React frontend (Phase 7)
  packages/     Shared code , created when first needed
    shared/     Types and validation shared by both apps (Phase 2)
  docs/         Roadmap, glossary and architecture decision records
  .github/      CI workflow and pull request template
```

## Getting started

You need Node.js 22.22.1 or newer (the project is developed on Node 24).

```text
git clone https://github.com/YOUR-USERNAME/paywhendone.git
cd paywhendone
npm install
cp apps/api/.env.example apps/api/.env
npm run dev
```

The API starts on `http://localhost:3000`. Check it with `GET /health`.

### Useful commands

- `npm run dev` starts the API and restarts it when files change
- `npm test` runs the automated tests
- `npm run typecheck` checks types
- `npm run lint` and `npm run format:check` check code quality
- `npm run build` compiles the API to `apps/api/dist`

## Documentation

- [Roadmap](docs/ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API reference](docs/API.md)
- [Glossary](docs/GLOSSARY.md)
- [Architecture decision records](docs/adr/)
- [Contributing](CONTRIBUTING.md)

## License

[MIT](LICENSE)