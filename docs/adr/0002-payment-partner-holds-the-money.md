# ADR 0002: The payment partner holds the money

- **Status:** Accepted, to be validated in Phase 9
- **Date:** 2026-10-05

## Context

PayWhenDone needs to hold a client's payment until a milestone is approved. Holding other people's money is regulated in India.

Our reading of the Reserve Bank of India's Master Direction on Payment Aggregators (15 September 2025) is that a payment aggregator may not run its own marketplace, and non-bank aggregators must keep merchant funds in escrow accounts with scheduled commercial banks. This is the author's reading of public sources and is not legal advice.

## Decision

PayWhenDone acts as a marketplace that uses Razorpay as its licensed payment partner. The application never holds funds itself. It records intent and state, and asks the payment partner to hold and release money.

All calls to the payment partner go through a provider interface, so the real Razorpay implementation can be replaced by a fake one in tests.

## Consequences

- The project makes no escrow claims and runs in test mode only.
- Razorpay Route supports holding a transfer's settlement (`on_hold`), but the author's test-mode dashboard redirected away from Route. Phase 9 verifies what is possible.
- If Route is unavailable, the fallback is a simulated provider that implements the same interface and keeps holds in our own ledger. This keeps the engineering work valid but must be described honestly.
- Real-world holds may be limited by Razorpay's policies and by settlement-time rules, so milestone holds are designed to be short.