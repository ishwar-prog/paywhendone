# Roadmap

The project is built in small phases, roughly one per day. Each phase ends with a pull request.

- [ ] **Phase 1:** Repository, monorepo, tooling, CI, README, first pull request
- [ ] **Phase 2:** API skeleton, configuration, logging, error handling, first tests in CI
- [ ] **Phase 3:** PostgreSQL in Docker, Drizzle ORM, migrations, users table
- [ ] **Phase 4:** Authentication and security middleware
- [ ] **Phase 5:** Contract and milestone state machine
- [ ] **Phase 6:** Contracts and milestones API with roles
- [ ] **Phase 7:** Frontend foundation and auth screens
- [ ] **Phase 8:** Money ledger
- [ ] **Phase 9:** Razorpay spike: provider interface, held transfer, release
- [ ] **Phase 10:** Webhooks and idempotency
- [ ] **Phase 11:** Release engine, auto-release job, concurrency test
- [ ] **Phase 12:** Frontend: contracts, milestone timeline, approve and dispute
- [ ] **Phase 13:** Disputes, admin review, audit log
- [ ] **Phase 14:** Reconciliation job and reputation score
- [ ] **Phase 15:** GitHub integration, part 1
- [ ] **Phase 16:** GitHub integration, part 2
- [ ] **Phase 17:** Hardening: security review, benchmarks, end-to-end test
- [ ] **Phase 18:** Deployment, documentation polish, demo

This list is a plan, not a promise. Phases may be split, merged or reordered as we learn more. Known risk: Razorpay Route could not be opened in the author's test-mode dashboard, so Phase 9 includes a fallback (see [ADR 0002](adr/0002-payment-partner-holds-the-money.md)).