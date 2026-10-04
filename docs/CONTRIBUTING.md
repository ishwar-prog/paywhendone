# Contributing

This is a solo learning project, but it follows the same workflow a professional team would.

## Setup

```text
git clone https://github.com/YOUR-USERNAME/paywhendone.git
cd paywhendone
npm install
```

`npm install` also activates the Git hooks (via Husky), so every commit is checked automatically.

## Workflow

1. Create a branch from `main`. Name it `type/short-description`, for example `feat/auth-sessions`.
2. Make small commits. Each commit should do one thing.
3. Push the branch and open a pull request. Fill in the template.
4. Wait for CI to pass, then merge using **Create a merge commit** so the individual commits stay in the history.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `type: short summary`.

- `feat:` a new feature
- `fix:` a bug fix
- `docs:` documentation only
- `test:` adding or fixing tests
- `refactor:` code change that neither fixes a bug nor adds a feature
- `chore:` tooling and maintenance
- `ci:` CI configuration

Examples: `feat: add milestone state machine`, `docs: explain the ledger design`.

## Checks

```text
npm run lint
npm run format:check
```

CI runs the same commands on every pull request.