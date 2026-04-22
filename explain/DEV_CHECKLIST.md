# DEV CHECKLIST

每次開始本地開發，照這個順序做即可。

## 1. 確認前提

在 repo root `C:\Users\user\Desktop\RunAI`：

```powershell
docker --version
docker compose version
pnpm.cmd --version
python --version
```

## 2. 啟動基礎服務

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs postgres
docker compose -f docker-compose.dev.yml logs redis
```

確認：

- `postgres` 狀態為 `Up`
- `redis` 狀態為 `Up`
- Postgres log 有 `ready to accept connections`
- Redis log 有 `Ready to accept connections`

## 3. 確認 API 環境變數

檔案：`apps/api/.env`

```env
APP_ENV=local
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/runai
REDIS_URL=redis://localhost:6379/0
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:3000
```

## 4. 啟動 FastAPI

方式 A，在 repo root：

```powershell
pnpm.cmd run dev --filter api
```

方式 B，在 `apps/api`：

```powershell
cd apps\api
python -B -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 5. 驗證 FastAPI

打開：

- `http://localhost:8000/`
- `http://localhost:8000/v1/health`
- `http://localhost:8000/v1/meta/runtime`

目前合理預期：

- `/` 回 `{"message":"API is running"}`
- `/v1/health` 回 `database: "not_configured"`、`redis: "not_configured"`
- `/v1/meta/runtime` 正常回 metadata

## 6. 啟動 Next.js

在 repo root 另開一個 terminal：

```powershell
pnpm.cmd run dev --filter web
```

打開：

- `http://localhost:3000/`
- `http://localhost:3000/members`

## 7. 驗證 PostgreSQL

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d runai
```

進去後可執行：

```sql
\dt
```

如果 migration 還沒跑，沒有表是正常的。

## 8. 驗證 Redis

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml exec redis redis-cli ping
```

預期輸出：

```text
PONG
```

## 9. 執行 Migration

在 `apps/api`：

```powershell
cd apps\api
python -c "from alembic.config import main; main(argv=['upgrade','head'])"
```

再回 Postgres 檢查：

```sql
\dt
```

預期至少有：

- `users`
- `outbox_events`
- `alembic_version`

## 10. 建議的固定啟動順序

在三個 terminal 依序執行：

```powershell
docker compose -f docker-compose.dev.yml up -d
pnpm.cmd run dev --filter api
pnpm.cmd run dev --filter web
```

## 11. 關閉開發環境

先在 Next.js 與 FastAPI terminal 各按一次 `Ctrl+C`。

再回 repo root：

```powershell
docker compose -f docker-compose.dev.yml down
```

如果要連 volume 一起清掉：

```powershell
docker compose -f docker-compose.dev.yml down -v
```

## 12. 注意事項

- 在目前 PowerShell 環境，請優先使用 `pnpm.cmd`，不要直接用 `pnpm`
- migration 請使用 `python -c "from alembic.config import main; main(argv=['upgrade','head'])"`
- 如果 `apps/api/.env` 不存在，先依照本文件第 3 步建立
