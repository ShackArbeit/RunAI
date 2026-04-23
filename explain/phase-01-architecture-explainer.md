# RunAI Phase 01 架構說明

這份文件不是完整設計文件，而是給開發時快速理解 Phase 01 用的。

如果一句話總結：

> Phase 01 就是在把 Web、API、資料庫、Redis、migration、本地開發流程先接起來。

---

## 1. Phase 01 的目標

這個階段先完成幾件事：

- monorepo 可以正常開發
- Web 有首頁和 `/members`
- API 有 `/v1/health` 和 `/v1/meta/runtime`
- 本地有 Postgres 和 Redis
- Alembic migration 可以建立基礎資料表
- `/members` 先用 mock data，不等真實後端

這個階段重點是骨架，不是完整功能。

---

## 2. 整體怎麼看

可以把現在的專案想成下面這條線：

1. 使用者先打開 Web
2. Web 顯示 landing page 和 members demo
3. API 提供最小可用資訊
4. Postgres 和 Redis 在本地先跑起來
5. migration 先把資料表打好

也就是先把「前端畫面」、「後端入口」、「資料層」、「本地環境」四件事對齊。

---

## 3. Root 在做什麼

Root 只做控制，不放業務邏輯。

重要檔案：

- `package.json`
  - monorepo 共用 scripts
- `pnpm-workspace.yaml`
  - 告訴 pnpm 哪些是 workspace
- `turbo.json`
  - 管 dev、build、lint、test 的 pipeline
- `docker-compose.dev.yml`
  - 啟動本地 Postgres 和 Redis

簡單講：

- UI 在 `apps/web`
- API、DB、migration 在 `apps/api`

---

## 4. `apps/web` 在做什麼

`apps/web` 是 Next.js App Router 前端。

Phase 01 主要有兩件事：

- 做出可以看的畫面
- 保留未來接 API 的入口

### `src/app`

- `layout.tsx`
  - 全域 layout
  - 也會根據語系 cookie 設定 `<html lang>`
- `page.tsx`
  - `/`
  - 目前只是 redirect 到預設語系頁
- `[locale]/page.tsx`
  - `/zh`、`/en`、`/de`
  - 在 server 端拿 dictionary，組 landing page
- `[locale]/layout.tsx`
  - 語系 route 的最小 layout
- `members/page.tsx`
  - `/members`
  - 掛 `MembersDashboard`

### `src/components/landing`

這裡是首頁的各個區塊：

- `Header.tsx`
- `HeroSection.tsx`
- `FeatureSection.tsx`
- `HowItWorksSection.tsx`
- `RouteSection.tsx`
- `CTASection.tsx`
- `Footer.tsx`

另外還有：

- `dictionary.ts`
  - 放多語系文案和語系 helper
- `shared.tsx`
  - landing 共用小元件
- `ThemeToggle.tsx`
  - 少數需要 client-side 的互動元件

現在 landing page 的重點是：

- 大部分 section 是 server component
- theme toggle 才是 client component
- 多語系靠 route，不靠整頁 client context

### `src/components/members`

這裡是 `/members` 的畫面元件：

- `MembersDashboard.tsx`
- `Header.tsx`
- `StatsCard.tsx`
- `TodayTrainingCard.tsx`
- `PredictionCard.tsx`
- `RouteList.tsx`
- `RouteCard.tsx`
- `FeedbackPanel.tsx`
- `content.ts`

目前這一區主要吃 mock data。

### `src/lib` 和 `src/types`

- `lib/mock-data.ts`
  - `/members` 現在最重要的資料來源
- `lib/env.ts`
  - 前端 env
- `lib/api.ts`
  - API fetch wrapper
- `types/api.ts`
  - 對齊 API response 型別

---

## 5. `apps/api` 在做什麼

`apps/api` 是 FastAPI 後端。

Phase 01 主要做這些：

- 提供最小 REST API
- 先把 config、router、schema、service 接好
- 把 Redis、DB、migration 入口建好

### `app/main.py`

這是 FastAPI 入口。

它做的事很少：

- 先跑 logging setup
- 建立 FastAPI app
- 掛 router
- 提供 `/`
- 掛 CORS middleware

### `app/api`

- `router.py`
  - 掛上 `/v1/health`
  - 掛上 `/v1/meta/runtime`

### `app/api/v1/endpoints`

- `health.py`
  - `GET /v1/health`
  - 會真的檢查 PostgreSQL 和 Redis
- `meta.py`
  - `GET /v1/meta/runtime`
  - 回 runtime metadata

### `app/core`

- `config.py`
  - 讀 `.env`
- `constants.py`
  - 放 `APP_NAME`、`APP_VERSION`、`API_V1_PREFIX`
- `logging.py`
  - logging setup

### `app/schemas`

- `health.py`
  - 定義 health response
- `meta.py`
  - 定義 runtime meta response

### `app/services`

- `runtime_service.py`
  - 組出 runtime metadata
  - 目前 app name 是 `RunAI API`

### `app/cache`

- `redis.py`
  - 建 Redis client
  - 提供 `check_redis_connection()`
  - 提供 `get_cache()`、`set_cache()`

### `app/db`

- `session.py`
  - 提供 engine、session
  - 提供 `get_db()`
  - 提供 `check_database_connection()`
- `base.py`
  - 放 `Base`
  - 匯總 models，讓 Alembic 知道有哪些 tables

### `app/models`

- `user.py`
  - `users` table
- `outbox_event.py`
  - `outbox_events` table

### `alembic`

- `env.py`
  - Alembic 環境
- `versions/0001_create_users_and_outbox_events.py`
  - 第一支 migration

---

## 6. 現在 API 怎麼流動

### `/v1/health`

流程：

`health.py`
-> call database check
-> call redis check
-> 回 `HealthResponse`

所以現在這支 API 不是假資料，它真的會碰 DB 和 Redis。

### `/v1/meta/runtime`

流程：

`meta.py`
-> `runtime_service.py`
-> 回 `RuntimeMetaResponse`

這支 API 現在主要回：

- `app_name`
- `environment`
- `version`
- `runtime`

---

## 7. DB / Redis / migration 的關係

### DB

- `models/*.py` 定義 table
- `db/base.py` 匯總 metadata
- `alembic/env.py` 讀 metadata
- migration 建出實際 table

### Redis

- `core/config.py` 提供 `REDIS_URL`
- `cache/redis.py` 建 client
- `health.py` 目前已經會用它做連線檢查

### Migration

現在至少會建立：

- `users`
- `outbox_events`
- `alembic_version`

---

## 8. Web 和 API 現在的關係

現在是弱耦合：

- Web 已經能顯示畫面
- Web 也已經有 API client 和型別
- 但 `/members` 還是以 mock data 為主

這是刻意的，因為 Phase 01 不追求一次把整個產品做完。

---

## 9. 現在最值得記住的事

### Web

- `/` 會導到語系首頁
- landing page 主要是 server component
- `/members` 還是 mock data 驅動

### API

- `/v1/health` 真的會檢查 DB / Redis
- `/v1/meta/runtime` 回最小 runtime metadata
- Postgres / Redis / Alembic 都已經接起來

### 開發流程

最常用的順序就是：

1. 開 Docker
2. 跑 migration
3. 開 API
4. 開 Web

---

## 10. 結論

Phase 01 不是完整產品，而是穩定起點。

現在這個架構最大的價值是：

- 有前端畫面
- 有後端入口
- 有資料表
- 有快取入口
- 有本地開發流程

後面的 phase 可以直接在這個骨架上往下長，不需要每次重打地基。
