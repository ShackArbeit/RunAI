# DEV CHECKLIST

這份文件是本地開發時的最短流程。照順序做，通常就能把 `web`、`api`、Postgres、Redis 都跑起來。

## 1. 先確認工具

在 repo root `C:\Users\user\Desktop\RunAI`：

```powershell
docker --version
docker compose version
pnpm.cmd --version
python --version
```

## 2. 啟動 Docker services

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs postgres --tail 20
docker compose -f docker-compose.dev.yml logs redis --tail 20
```

確認這幾件事：

- `postgres` 是 `Up`
- `redis` 是 `Up`
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

如果沒有這個檔案，就照上面建立。

## 4. 跑 migration

在 `apps/api`：

```powershell
cd apps\api
set PYTHONDONTWRITEBYTECODE=1
python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"
```

再回 repo root 檢查 Postgres：

```powershell
docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d runai -c "\dt"
```

預期至少會看到：

- `users`
- `outbox_events`
- `alembic_version`

如果 `upgrade head` 重跑後沒有變化，也是正常的。

## 5. 啟動 API

方式 A，在 repo root：

```powershell
pnpm.cmd run dev --filter api
```

方式 B，在 `apps/api`：

```powershell
cd apps\api
python -B -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 6. 驗證 API

打開：

- `http://localhost:8000/`
- `http://localhost:8000/v1/health`
- `http://localhost:8000/v1/meta/runtime`

預期：

- `/` 回 `{"message":"API is running"}`
- `/v1/health` 回 `status: "ok"`
- Docker services 有正常啟動時，`/v1/health` 內的 `database` 和 `redis` 應該都是 `"ok"`
- `/v1/meta/runtime` 會回：
  - `app_name: "RunAI API"`
  - `environment: "local"`
  - `version: "0.1.0"`
  - `runtime: "fastapi"`

補充：

- 如果 Docker 沒開，`/v1/health` 的 `database` 或 `redis` 可能會是 `error`

## 7. 啟動 Web

在 repo root 另開一個 terminal：

```powershell
pnpm.cmd run dev --filter web
```

打開：

- `http://localhost:3000/`
- `http://localhost:3000/zh`
- `http://localhost:3000/en`
- `http://localhost:3000/de`
- `http://localhost:3000/members`

補充：

- `/` 會自動導到預設語系首頁
- landing page 現在是 `app/[locale]` 結構
- landing page 大部分是 server component，只有 theme toggle 是 client-side 互動

## 8. 驗證 Redis

在 repo root：

```powershell
docker compose -f docker-compose.dev.yml exec redis redis-cli ping
```

預期輸出：

```text
PONG
```

## 9. 建議的啟動順序

開三個 terminal，順序如下：

```powershell
docker compose -f docker-compose.dev.yml up -d
pnpm.cmd run dev --filter api
pnpm.cmd run dev --filter web
```

## 10. 關閉開發環境

先在 `web` 和 `api` 的 terminal 各按一次 `Ctrl+C`。

再回 repo root：

```powershell
docker compose -f docker-compose.dev.yml down
```

如果你要把 volumes 一起清掉：

```powershell
docker compose -f docker-compose.dev.yml down -v
```

## 11. 注意事項

- 目前 PowerShell 環境請優先用 `pnpm.cmd`
- Python 相關指令建議都先加 `set PYTHONDONTWRITEBYTECODE=1`
- migration 請用 `python -B -c "from alembic.config import main; main(argv=['upgrade','head'])"`，或直接用 `pnpm.cmd --dir apps/api migrate`
- 如果 API 或 Docker 狀態怪怪的，先看 `docker compose ... logs`
