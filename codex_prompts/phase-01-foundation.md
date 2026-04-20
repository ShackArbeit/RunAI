# Codex Prompt — Phase 01 基礎骨架與本地開發環境

你現在要直接修改我目前的 RunAI monorepo。請以「**符合目前專案結構、可持續擴充、避免過度設計**」為原則，實際產生或修改檔案內容，而不是只列出檔名。

## 背景限制
- 前端：Next.js App Router + TypeScript + Tailwind CSS
- 前端目前版本：Next.js `16.2.3`、React `19.2.4`
- 後端：FastAPI + SQLAlchemy + Redis
- 後端目前依賴：FastAPI、SQLAlchemy、psycopg、redis、pydantic-settings、python-dotenv
- Dev：Docker Compose 跑 Postgres + Redis，本地跑 FastAPI 與 Next.js
- Prd：Neon + Upstash + Next.js + FastAPI on GCP
- Auth 只能用 Google 與 LINE，不要做 email/password
- 前端遵守 DRY / KISS
- 後端與資料結構遵守 SOLID
- 所有刪除都要思考 DB 與 cache invalidation

## 這一階段目標
把現有 monorepo 拉成可持續擴充的前後端骨架，建立 Docker Compose 的 Postgres/Redis、本地 FastAPI、Next.js 共用設定，並讓 phase 01 的頁面、API、資料表與 cache key 都有清楚落點。

## 目前專案結構基準
- `apps/web` 已存在 landing page 與 `/members` dashboard
- `apps/web` 已存在 `components/landing`、`components/members`、`components/ui`
- `apps/web` 的 monorepo 控制檔只保留 root，`apps/web` 內不要再保留 `pnpm-lock.yaml`、`pnpm-workspace.yaml`、`turbo.json`
- `apps/api` 目前仍是薄骨架，需要在 phase 01 補齊核心結構

## 這一階段必須完成的前端畫面
- `/` landing page（匿名可看）
- `/members` 會員區 shell

補充：
- 目前 `/members` **先不做 guard**
- 先讓開發者可直接看到畫面樣式
- 畫面資料先使用 mock data
- 正式後端完成後，再改由資料庫與 LLM 分析結果提供資料

## 這一階段必須完成的 API
- `GET /v1/health`
- `GET /v1/meta/runtime`

## 這一階段涉及的資料表
- `users`
- `outbox_events`

## 這一階段涉及的 cache key
- `runai:health:api`
- `runai:meta:runtime`

## 建議目錄藍圖

### apps/api
```text
apps/api/
  app/
    api/
      v1/
        endpoints/
          health.py
          meta.py
        router.py
    cache/
      redis.py
    core/
      config.py
      constants.py
      logging.py
    db/
      base.py
      session.py
    models/
      user.py
      outbox_event.py
    schemas/
      health.py
      meta.py
    services/
      runtime_service.py
    main.py
  requirements.txt
  requirements-dev.txt
  .env.example
  pytest.ini
  alembic.ini
  alembic/
    env.py
    versions/
      0001_create_users_and_outbox_events.py
```

### apps/web
```text
apps/web/
  public/
  src/
    app/
      favicon.ico
      globals.css
      layout.tsx
      page.tsx
      members/
        page.tsx
    components/
      landing/
      members/
      ui/
        Badge.tsx
        Button.tsx
        Card.tsx
    lib/
      api.ts
      env.ts
      mock-data.ts
      utils.ts
    types/
      api.ts
```

### repo root
```text
RunAI/
  docker-compose.dev.yml
  .env.example
  package.json
  pnpm-lock.yaml
  pnpm-workspace.yaml
  turbo.json
```

## 每個新增檔案的用途

### API 新增檔案
- `apps/api/app/api/v1/router.py`
  - 集中註冊 phase 01 的版本化 API 路由。
  - 由 `main.py` 掛載 `/v1`，避免把所有 endpoint 直接塞進 `main.py`。

- `apps/api/app/api/v1/endpoints/meta.py`
  - 提供 `GET /v1/meta/runtime`。
  - 回傳 app name、environment、version、runtime 能力與基本依賴狀態。

- `apps/api/app/cache/redis.py`
  - 集中管理 Redis client 與 cache helper。
  - 處理 `runai:health:api`、`runai:meta:runtime` 的讀寫與 TTL。

- `apps/api/app/core/constants.py`
  - 集中放 phase 01 會重複使用的常數。
  - 例如 app name、API prefix、cache key、default TTL。

- `apps/api/app/core/logging.py`
  - 集中設定 logging 格式、logger 初始化與未來 request log 擴充入口。

- `apps/api/app/db/base.py`
  - 集中宣告 ORM Base 與 model import。
  - 讓 metadata 可被 Alembic 與 app 啟動流程正確辨識。

- `apps/api/app/models/user.py`
  - 定義 `users` 資料表 model。
  - 至少保留 phase 01 需要的最小欄位，供後續 social auth 擴充。

- `apps/api/app/models/outbox_event.py`
  - 定義 `outbox_events` 資料表 model。
  - 為未來 cache invalidation、event publishing、刪除副作用處理預留基礎。

- `apps/api/app/schemas/health.py`
  - 定義 `/v1/health` 的 response schema。
  - 固定 status、dependency status、checked_at 等欄位形狀。

- `apps/api/app/schemas/meta.py`
  - 定義 `/v1/meta/runtime` 的 response schema。
  - 固定 runtime metadata 的 API contract。

- `apps/api/app/services/runtime_service.py`
  - 集中處理 runtime metadata 組裝與快取邏輯。
  - 後續擴充 feature flags、provider readiness 時仍可沿用。

- `apps/api/.env.example`
  - 列出 API 服務所需環境變數範本。
  - 至少包含 `APP_ENV`、`DATABASE_URL`、`REDIS_URL`、`LOG_LEVEL`。

- `apps/api/pytest.ini`
  - 統一 API 測試設定。
  - 讓後續新增 endpoint tests 時，不必每次自行定義 pytest 參數。

- `apps/api/alembic.ini`
  - Alembic 主設定檔。
  - 提供 migration 執行的標準入口。

- `apps/api/alembic/env.py`
  - Alembic migration 執行環境。
  - 接上 SQLAlchemy metadata 與 database URL。

- `apps/api/alembic/versions/0001_create_users_and_outbox_events.py`
  - phase 01 第一支 migration。
  - 建立 `users` 與 `outbox_events`。

### Web 新增檔案
- `apps/web/src/lib/api.ts`
  - 前端 API client 入口。
  - 集中 base URL、fetch wrapper、error normalize，方便後續接 React Query。

- `apps/web/src/lib/env.ts`
  - 集中管理前端 runtime env。
  - 例如 `NEXT_PUBLIC_API_BASE_URL`。

- `apps/web/src/types/api.ts`
  - 定義前端 consume 的 API contract。
  - 至少包含 `HealthResponse` 與 `RuntimeMetaResponse`。

### Root 新增檔案
- `docker-compose.dev.yml`
  - 啟動本地開發依賴。
  - phase 01 至少要有 `postgres` 與 `redis`。

- `.env.example`
  - 列出 monorepo root 共用環境變數範本。
  - 給 Docker Compose 與整體開發環境使用。

## 已存在且應保留的檔案
- `apps/api/app/main.py`
- `apps/api/app/core/config.py`
- `apps/api/app/db/session.py`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/members/page.tsx`
- `apps/web/src/components/landing/*`
- `apps/web/src/components/members/*`
- `apps/web/src/components/ui/Badge.tsx`
- `apps/web/src/components/ui/Button.tsx`
- `apps/web/src/components/ui/Card.tsx`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/lib/utils.ts`

## 這一階段不建議做的事
- 不要把 API 只放在 `routers/` 而不做 `api/v1/endpoints` 版本化結構。
- 不要只建立 DB session 而不建立 model 與 migration。
- 不要把 Redis 只留在 requirements，卻沒有 `cache/redis.py` 實作層。
- 不要為了抽象而硬加 `apps/web/src/components/layout/Header.tsx`、`Footer.tsx`。
- 不要在 phase 01 額外加入 `src/app/(marketing)/page.tsx`，除非你已決定全面改 route groups。
- 不要在 `apps/web` 內再保留 monorepo 控制檔副本。

## 可延後到後續 phase 的內容
- `apps/api/app/db/init_db.py`
- Web 的 route groups 重整，例如 `(marketing)`、`(member)`
- 真實 auth guard
- 外部跑步 API 串接
- LLM 分析結果串接

## 實作要求
- 先掃描現有 repo，沿用既有命名與 import style。
- 若需要 migration，請建立對應 migration 檔與模型。
- 請補最小可跑的 schema / service / endpoint / page / component，不要只寫 TODO。
- 若某些外部 API 尚未正式串接，請先提供 interface / client stub 與 mock fallback。
- 請在回覆中列出「新增檔案」「修改檔案」「為什麼這樣切」。
- 請不要重寫無關檔案。

## 驗收標準
- 前端可以實際看到 `/` 與 `/members` 畫面。
- FastAPI 對應端點可通。
- DB schema 與 API / UI 對得上。
- Cache key naming 有明確規則。
- monorepo 控制檔只保留 root 版本。
- 若涉及刪除或 reset，DB 與 Redis 都有處理。

## 這一階段的互動流程
1. 使用者開 landing page
2. Next.js 讀 runtime config
3. FastAPI `/v1/health` 回傳服務狀態
4. FastAPI `/v1/meta/runtime` 回傳 runtime metadata
5. API client 顯示後端可用性
6. Redis 快取 health/meta

## 外部 API 融入方式
本階段不接外部跑步 API，只先預留 integrations 與 providers 的擴充空間，不要做實際串接。
