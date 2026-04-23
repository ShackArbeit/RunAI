# New Engineer Quickstart

這份文件是給第一次打開 RunAI repo 的人看的。

如果你只想先把專案跑起來，照這份做就可以。

## 1. 先知道這個 repo 有什麼

這個 monorepo 目前主要有兩個 app：

- `apps/web`
  - Next.js 前端
- `apps/api`
  - FastAPI 後端

另外還有兩個本地依賴：

- Postgres
- Redis

## 2. 最短啟動順序

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml up -d
```

在 `apps/api`：

```powershell
set PYTHONDONTWRITEBYTECODE=1
python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"
```

在 repo root 開兩個 terminal：

```powershell
pnpm.cmd run dev --filter api
pnpm.cmd run dev --filter web
```

## 3. 先看哪些網址

### Web

- `http://localhost:3000/`
- `http://localhost:3000/zh`
- `http://localhost:3000/en`
- `http://localhost:3000/de`
- `http://localhost:3000/members`

### API

- `http://localhost:8000/`
- `http://localhost:8000/v1/health`
- `http://localhost:8000/v1/meta/runtime`

## 4. 先記住幾件事

- `/` 會導到預設語系首頁
- landing page 大部分是 server component
- `/members` 現在主要還是 mock data
- `/v1/health` 會真的檢查 Postgres 和 Redis

## 5. 常用檔案

### Root

- `README.md`
- `docker-compose.dev.yml`
- `package.json`

### Web

- `apps/web/src/app/[locale]/page.tsx`
- `apps/web/src/app/members/page.tsx`
- `apps/web/src/components/landing/*`
- `apps/web/src/components/members/*`

### API

- `apps/api/app/main.py`
- `apps/api/app/api/router.py`
- `apps/api/app/api/v1/endpoints/health.py`
- `apps/api/app/api/v1/endpoints/meta.py`
- `apps/api/app/db/session.py`
- `apps/api/alembic/versions/0001_create_users_and_outbox_events.py`

## 6. 卡住時先看哪裡

- Docker 起不來：看 `docker compose -f docker-compose.dev.yml logs`
- API 怪怪的：先打 `/v1/health`
- DB 表不見了：重跑 Alembic migration
- Web 文案或語系怪怪的：先看 `apps/web/src/components/landing/dictionary.ts`

## 7. 其他文件

- [DEV_CHECKLIST.md](C:/Users/user/Desktop/RunAI/explain/DEV_CHECKLIST.md)
- [phase-01-architecture-explainer.md](C:/Users/user/Desktop/RunAI/explain/phase-01-architecture-explainer.md)
- [phase-01-pr-summary.md](C:/Users/user/Desktop/RunAI/explain/phase-01-pr-summary.md)
