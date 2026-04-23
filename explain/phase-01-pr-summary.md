# Phase 01 PR Summary

這份文件可以直接當成 PR description 的底稿。

## Summary

This PR cleans up the Phase 01 foundation so the repo is easier to understand, easier to run locally, and closer to a junior-friendly implementation style.

## What Changed

### Web

- refactored landing page to route-based i18n with `app/[locale]`
- kept the landing page mostly as server components
- reduced client-side usage to a small theme toggle island
- removed the old landing provider approach
- kept the existing visual design and CSS feel

### API

- simplified Phase 01 API code into a more direct structure
- kept `/`, `/v1/health`, and `/v1/meta/runtime`
- made `/v1/health` perform real PostgreSQL and Redis checks
- kept Alembic, models, Redis helpers, and DB session flow aligned with local dev
- added endpoint smoke tests for Phase 01

### Docs

- rewrote root, web, and api README files
- updated `DEV_CHECKLIST.md`
- updated `phase-01-architecture-explainer.md`
- added a quickstart doc for new engineers

## Validation

Validated locally with:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web exec tsc --noEmit`
- `pnpm --dir apps/web build`
- `python -B -m ruff check .` in `apps/api`
- `python -B -m pytest` in `apps/api`
- `python -B -c "import app.main"` in `apps/api`
- `python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"` in `apps/api`
- Docker Compose with local Postgres and Redis
- runtime smoke checks for:
  - `/`
  - `/v1/health`
  - `/v1/meta/runtime`

## Notes

- `/members` still uses mock data in Phase 01
- landing page styling was intentionally preserved
- the goal of this PR is clarity and maintainability, not feature expansion
