# Glossary

Plain-language definitions of terms used in this project. New terms are added as they appear.

**Contract**
An agreement between a client and a freelancer, split into one or more milestones.

**Milestone**
One deliverable inside a contract, with its own price and its own payment.

**Hold**
Money that has been paid by the client but is not yet paid out to the freelancer.

**Release**
Paying a held amount out to the freelancer, after approval or after the review window expires.

**Escrow**
A third party holds money until agreed conditions are met. In India, holding other people's money this way is regulated, so this project avoids the word for its own behavior. See ADR 0002.

**Payment aggregator**
A licensed company, such as Razorpay, that collects payments from customers and settles them to merchants.

**Razorpay Route**
Razorpay's product for splitting a payment and sending parts of it to other parties (called linked accounts).

**Linked account**
A third party, here the freelancer, that receives money through Route.

**Ledger**
An append-only record of every money movement. Entries are never edited, only added.

**Idempotency**
Doing the same operation twice has the same effect as doing it once. This prevents paying twice if a request is repeated.

**Webhook**
A message that Razorpay sends to our server when something happens, such as a payment succeeding.

**Monorepo**
One repository that holds several related projects, here the backend, the frontend and shared code.

**Conventional Commits**
A naming style for commit messages, such as `feat: add login`, that makes history easy to read.

**CI (continuous integration)**
Automatic checks that run on every push or pull request.