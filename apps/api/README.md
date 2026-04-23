# RunAI API

這是 RunAI 的後端，使用 FastAPI。

## 目前內容

- `GET /`
- `GET /v1/health`
- `GET /v1/meta/runtime`
- Postgres 連線入口
- Redis 連線入口
- Alembic migration

## 資料夾

### `app/api`

- `router.py`
  - API router 聚合點
- `v1/endpoints/health.py`
- `v1/endpoints/meta.py`

### `app/core`

- `config.py`
- `constants.py`
- `logging.py`

### `app/db`

- `session.py`
  - DB engine / session
- `base.py`
  - model metadata 匯總

### `app/cache`

- `redis.py`
  - Redis client 和 cache helper

### `app/models`

- `user.py`
- `outbox_event.py`

### `alembic`

- migration 設定和版本檔

## 啟動前先做的事

### 1. 啟動 Docker services

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml up -d
```

### 2. 確認 `.env`

檔案：`apps/api/.env`

```env
APP_ENV=local
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/runai
REDIS_URL=redis://localhost:6379/0
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:3000
```

### 3. 跑 migration

在 `apps/api`：

```powershell
set PYTHONDONTWRITEBYTECODE=1
python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"
```

或直接用 script：

```powershell
pnpm.cmd migrate
```

## 啟動 API

在 repo root：

```powershell
pnpm.cmd run dev --filter api
```

或在 `apps/api`：

```powershell
python -B -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 驗證 API

打開：

- `http://localhost:8000/`
- `http://localhost:8000/v1/health`
- `http://localhost:8000/v1/meta/runtime`

預期：

- `/` 回 `{"message":"API is running"}`
- `/v1/health` 會檢查 DB 和 Redis
- Docker 正常時，`database`、`redis` 都應該是 `"ok"`
- `/v1/meta/runtime` 會回 `RunAI API`

## 常用指令

在 `apps/api`：

```powershell
set PYTHONDONTWRITEBYTECODE=1
python -B -m pytest
python -B -m ruff check .
python -B -c "import app.main"
python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"
```
