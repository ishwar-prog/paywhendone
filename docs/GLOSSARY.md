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

**Middleware**
A function that runs on every request before the final handler, such as logging or reading the request body. Requests pass through middleware in order.

**Environment variable**
A setting supplied from outside the code, such as the port number. Keeps configuration and secrets out of the repository.

**Fail fast**
Stopping immediately with a clear message when something is wrong, instead of continuing and failing in a confusing way later.

**Structured logging**
Writing each log entry as data (JSON) instead of a sentence, so tools can search and filter it.

**Request ID**
A unique identifier given to each request. It links the log lines, the response and any error report for that one request.

**Graceful shutdown**
When the server is told to stop, it finishes the requests already in progress before exiting.

**Health check**
A simple endpoint that reports whether the application is running. Used by hosting platforms and monitoring.

**Dependency injection**
Passing the things a piece of code needs (like a logger) in as arguments instead of creating or importing them inside. Makes code easy to test.