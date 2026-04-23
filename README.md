# RunAI

RunAI 是一個 monorepo，現在的 Phase 01 目標是先把下面幾件事接起來：

- `apps/web`：Next.js 前端
- `apps/api`：FastAPI 後端
- Postgres：本地資料庫
- Redis：本地快取
- Alembic：migration

目前重點是基礎骨架，不是完整產品。

## 專案結構

```text
RunAI/
├─ apps/
│  ├─ web/
│  └─ api/
├─ explain/
├─ codex_prompts/
├─ diagrams/
├─ docker-compose.dev.yml
├─ package.json
└─ pnpm-workspace.yaml
```

## 目前內容

### Web

- landing page
- `/members` demo page
- landing page 採 `app/[locale]` 多語系路由
- landing page 大部分是 server component

### API

- `GET /`
- `GET /v1/health`
- `GET /v1/meta/runtime`

### Local Dev

- Docker Compose 可啟動 Postgres / Redis
- Alembic 可建立 `users`、`outbox_events`

## 快速開始

### 1. 啟動 Docker services

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml up -d
```

### 2. 跑 API migration

在 `apps/api`：

```powershell
cd apps\api
set PYTHONDONTWRITEBYTECODE=1
python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"
```

### 3. 啟動 API

在 repo root：

```powershell
pnpm.cmd run dev --filter api
```

### 4. 啟動 Web

在 repo root 另開一個 terminal：

```powershell
pnpm.cmd run dev --filter web
```

## 常用網址

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

## 常用指令

在 repo root：

```powershell
pnpm.cmd run dev
pnpm.cmd run build
pnpm.cmd run lint
pnpm.cmd run test
```

只跑單一 app：

```powershell
pnpm.cmd run dev --filter web
pnpm.cmd run dev --filter api
pnpm.cmd --dir apps/api migrate
```

## 其他文件

- [DEV_CHECKLIST.md](C:/Users/user/Desktop/RunAI/explain/DEV_CHECKLIST.md)
- [phase-01-architecture-explainer.md](C:/Users/user/Desktop/RunAI/explain/phase-01-architecture-explainer.md)
- [new-engineer-quickstart.md](C:/Users/user/Desktop/RunAI/explain/new-engineer-quickstart.md)
- [phase-01-pr-summary.md](C:/Users/user/Desktop/RunAI/explain/phase-01-pr-summary.md)
