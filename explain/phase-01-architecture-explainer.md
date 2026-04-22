# RunAI Phase 01 架構說明

本文件根據以下兩份 Phase 01 規格整理：

- `codex_prompts/phase-01-foundation.md`
- `diagrams/phase-01-foundation.png`

同時對照目前 repo 內已存在的實作，說明這一階段在 `web` 與 `api` 端各資料夾、各檔案的用途，以及它們彼此之間的關係。

---

## 1. Phase 01 在做什麼

Phase 01 的主題是：

- 建立可延伸的 monorepo 基礎架構
- 讓 Web 有兩個可見頁面：`/` 與 `/members`
- 讓 API 有兩支可用路由：`GET /v1/health` 與 `GET /v1/meta/runtime`
- 把 Redis、DB、Model、Migration、環境變數與本地開發設定先鋪好
- 先用 mock data 與最小 API contract 跑通開發流程

這個階段的重點不是完整功能，而是把後續 Phase 02 以後會持續擴充的骨架先搭起來。

---

## 2. 整體架構概念

Phase 01 的整體流向可以先理解成這樣：

1. 使用者先看到 Web 頁面
2. Web 端保留 mock data 畫面與未來 API client 的接點
3. API 端先提供最小可用資訊型路由
4. API 內部先把 config、logging、router、schema、service、cache、db、model、migration 骨架補齊
5. Docker Compose 先提供本地 Postgres / Redis

換句話說，這個階段是在把「畫面、API、資料表、快取、開發環境」都建立起最小可運作的對齊點。

---

## 3. Monorepo 層級

### Root 目錄的角色

Root 的責任是整個 monorepo 的共同控制層。

#### `package.json`
- 提供整個 monorepo 的頂層 scripts
- 目前透過 `turbo` 啟動 `dev`、`build`、`lint`、`test`
- 也有 `redis:up`、`redis:down` 這種本地開發輔助命令

#### `pnpm-workspace.yaml`
- 告訴 pnpm 哪些資料夾是 workspace package
- 目前是 `apps/*` 與 `packages/*`

#### `pnpm-lock.yaml`
- monorepo 共用 lockfile
- Phase 01 明確要求 lockfile 只留 root，不要在 `apps/web` 裡再留副本

#### `turbo.json`
- 定義 monorepo task pipeline
- 讓 web / api 可以在同一個 repo 內被統一管理

#### `.env.example`
- 提供 root 層級共用的環境變數範本
- 主要是給 Docker Compose 或整體本地環境使用

#### `docker-compose.dev.yml`
- 啟動本地 Postgres 與 Redis
- 是 Phase 01「Local Dev Environment」的重要組成

### Root 與 apps 的關係

- Root 不處理業務邏輯
- Root 只負責 workspace、依賴、Compose、monorepo task
- 真正的 UI 在 `apps/web`
- 真正的 API / DB / migration 在 `apps/api`

---

## 4. `apps/web` 的用途

`apps/web` 是 Next.js App Router 前端應用。  
在 Phase 01，它負責兩件事：

- 提供使用者可直接看到的畫面
- 保留未來串接 API 的入口，但目前 `/members` 仍以 mock data 為主

---

## 5. `apps/web` 主要資料夾與檔案用途

### `apps/web/src/app`

這裡是 Next.js App Router 的 route 入口層。

#### `layout.tsx`
- 所有頁面的全域 layout
- 通常放 HTML 結構、全域樣式掛載點、頁面共同外框

#### `globals.css`
- 全域 CSS
- 控制整體基礎樣式、顏色、字型、reset、共用變數等

#### `page.tsx`
- `/` 路由入口
- 組裝 landing page 的所有 section
- 自己不承擔細節 UI，主要責任是把頁面片段串起來

#### `members/page.tsx`
- `/members` 路由入口
- 目前只負責掛載 `MembersDashboard`
- 代表這個 route 現在是 shell / demo 頁，而不是完整權限保護頁

### `apps/web/src/components/landing`

這裡是 landing page 的畫面模組。

#### `Header.tsx`
- landing 頁首
- 提供頁面導覽與第一層品牌感知

#### `HeroSection.tsx`
- landing 首屏主視覺
- 負責第一眼傳達產品主張

#### `FeatureSection.tsx`
- 展示產品核心功能或價值點

#### `HowItWorksSection.tsx`
- 用來說明產品流程或使用方式

#### `RouteSection.tsx`
- 根據產品主題，展示與跑步路線相關的介紹內容

#### `CTASection.tsx`
- 行動呼籲區塊
- 引導註冊、開始使用、前往下一步

#### `Footer.tsx`
- landing 頁尾

#### `LandingProvider.tsx`
- 包裝 landing 頁的狀態或 context
- 讓多個 section 可以共享互動狀態或語系內容

#### `dictionary.ts`
- landing 文案資料來源之一
- 讓文案與 UI 結構解耦

#### `shared.tsx`
- landing 模組內共用 UI 或 helper 結構

### `apps/web/src/components/members`

這裡是 `/members` 頁面的 UI 模組。

#### `MembersDashboard.tsx`
- `/members` 的主容器
- 會組裝 dashboard header、統計卡、預測卡、路線列表、回饋面板等

#### `Header.tsx`
- 會員區自己的頁首
- 和 landing 的 header 分開，表示兩個區域的視覺語言與用途不同

#### `StatsCard.tsx`
- 顯示週跑量、訓練一致性、疲勞等摘要資訊

#### `TodayTrainingCard.tsx`
- 顯示今日建議訓練

#### `PredictionCard.tsx`
- 顯示成績預測或 readiness 狀態

#### `RouteList.tsx`
- 路線列表容器

#### `RouteCard.tsx`
- 單一路線卡片

#### `FeedbackPanel.tsx`
- 顯示今日回饋、完成度、疲勞等 mock feedback

#### `content.ts`
- members 區塊的靜態文案或結構資料

### `apps/web/src/components/ui`

這裡是比較通用、可重用的 UI 基礎元件。

#### `Button.tsx`
- 按鈕元件

#### `Card.tsx`
- 卡片容器元件

#### `Badge.tsx`
- 標籤元件

這一層的角色是「被 landing 與 members 共用」，不是直接代表某一頁的業務。

### `apps/web/src/lib`

這裡是前端的非畫面邏輯層。

#### `mock-data.ts`
- Phase 01 很重要
- 目前 `/members` 先用這裡的 mock 資料顯示畫面
- 這代表 Web 畫面可以先完成，不必等待真實 API 與資料庫

#### `utils.ts`
- 共用工具函式

#### `env.ts`
- 統一管理前端 runtime env
- 目前主要是 `NEXT_PUBLIC_API_BASE_URL`

#### `api.ts`
- 前端 API client 入口
- 負責集中呼叫 `/v1/health` 與 `/v1/meta/runtime`
- 目前是一層 fetch wrapper，之後可再接 React Query 或更完整 error handling

### `apps/web/src/types`

#### `api.ts`
- 定義前端使用的 API contract
- 讓前端知道 `/v1/health` 與 `/v1/meta/runtime` 應該拿到什麼形狀的資料

---

## 6. `apps/web` 內部關係

### `/` 路由關係

`src/app/page.tsx`
-> 匯入 `components/landing/*`
-> 組成 landing 頁面

### `/members` 路由關係

`src/app/members/page.tsx`
-> 匯入 `MembersDashboard.tsx`
-> `MembersDashboard.tsx` 再組裝 `StatsCard`、`PredictionCard`、`RouteList`、`FeedbackPanel` 等元件
-> 這些元件目前主要吃 `lib/mock-data.ts`

### Web 與 API 的關係

目前關係是「已建立接點，但尚未全面切到真實資料」：

- `lib/env.ts` 提供 API base URL
- `lib/api.ts` 提供 API 呼叫函式
- `types/api.ts` 提供型別
- `mock-data.ts` 仍是當前 UI 顯示的主要資料來源

這表示 Phase 01 的 Web 是：

- 畫面先成立
- API contract 先成立
- 真正把 dashboard 全切到後端資料，留到後面 phase

---

## 7. `apps/api` 的用途

`apps/api` 是 FastAPI 後端服務。  
在 Phase 01，它負責：

- 提供最小可用的 REST API
- 建立 settings / logging / router / schema / service 基礎架構
- 建立 SQLAlchemy model 與 Alembic migration 起點
- 建立 Redis 與 DB 的基礎接入層

---

## 8. `apps/api` 主要資料夾與檔案用途

### `apps/api/app/main.py`

- FastAPI 應用入口
- 負責：
  - 啟動時先呼叫 `setup_logging()`
  - 建立 `FastAPI(...)`
  - 掛載主 router
  - 提供根路由 `/`

它是整個 API 的起點，但不應直接塞滿所有業務邏輯。

### `apps/api/app/api`

這層的責任是「路由組裝」。

#### `router.py`
- API 聚合 router
- 使用 `API_V1_PREFIX`
- 把 `health` 與 `meta` 這兩支 v1 endpoint 掛進來

這代表 `main.py`
-> 掛 `api.router`
-> `api.router` 再掛各個版本化 endpoint

### `apps/api/app/api/v1/endpoints`

這層是實際 endpoint 定義。

#### `health.py`
- 定義 `GET /v1/health`
- 回傳服務狀態、依賴狀態、檢查時間
- 目前 `database` 與 `redis` 回 `not_configured`
- 代表 Phase 01 先把 API contract 與路由穩定下來，還沒進真實 health check

#### `meta.py`
- 定義 `GET /v1/meta/runtime`
- 呼叫 `runtime_service.get_runtime_meta()`
- 回傳 `app_name`、`environment`、`version`、`runtime`

### `apps/api/app/core`

這裡是 API 的基礎設施設定層。

#### `config.py`
- 使用 `pydantic-settings` 管理環境變數
- 提供 `settings` 物件
- 目前主要欄位：
  - `app_env`
  - `database_url`
  - `redis_url`
  - `cors_origins`
  - `log_level`

#### `constants.py`
- 放 API 會重複用到的常數
- 目前已有：
  - `APP_NAME`
  - `APP_VERSION`
  - `API_V1_PREFIX`
- 按 Phase 01 規格，後續也適合補 cache key 與 default TTL

#### `logging.py`
- 集中設定 logging
- `setup_logging()` 在 app 啟動時執行
- `get_logger()` 供其他模組取得 named logger

### `apps/api/app/schemas`

這層定義 API 對外回傳的資料形狀。

#### `health.py`
- 定義 `HealthDependencies`
- 定義 `HealthResponse`
- 讓 `/v1/health` 的回傳格式固定

#### `meta.py`
- 定義 `RuntimeMetaResponse`
- 讓 `/v1/meta/runtime` 的回傳格式固定

這層的價值是：
- endpoint 不直接回裸 dict
- response contract 被明確化
- 前端或未來文件比較容易對齊

### `apps/api/app/services`

這層放 API 的應用邏輯組裝。

#### `runtime_service.py`
- 集中組裝 runtime metadata
- 目前根據 `APP_NAME`、`APP_VERSION`、`settings.app_env` 產生最小資訊
- 未來若要加入 feature flags、provider readiness、cache，都可以從這一層延伸

### `apps/api/app/cache`

#### `redis.py`
- 集中管理 Redis client
- `get_redis_client()` 建立共用 Redis 連線
- `get_cache()` / `set_cache()` 提供最小快取讀寫 helper

這一層的設計意義是：
- endpoint 不要直接 new Redis client
- service 或 endpoint 有統一快取進入點

### `apps/api/app/db`

#### `session.py`
- 建立 SQLAlchemy engine
- 建立 `SessionLocal`
- 提供 `get_db()` dependency

這是「如何連資料庫」的入口。

#### `base.py`
- 宣告 `Base`
- 匯入所有 model，讓 `Base.metadata` 能收齊所有 table

這是「所有 ORM 表結構匯總在哪裡」的入口。

### `apps/api/app/models`

這層是資料表模型定義。

#### `user.py`
- 定義 `users` table
- Phase 01 先保留最小 social auth 需要的欄位：
  - `id`
  - `email`
  - `display_name`
  - `auth_provider`
  - `provider_subject`
  - `created_at`
  - `updated_at`

#### `outbox_event.py`
- 定義 `outbox_events` table
- 用來為未來 event publishing / cache invalidation / side effects 預留結構
- 目前重點欄位：
  - `event_type`
  - `aggregate_type`
  - `aggregate_id`
  - `payload`
  - `status`
  - `created_at`
  - `processed_at`

### `apps/api/alembic`

這層是 migration 系統。

#### `alembic.ini`
- Alembic 主設定檔

#### `env.py`
- Alembic 執行環境
- 讀取 `settings.database_url`
- 連接 `Base.metadata`

#### `versions/0001_create_users_and_outbox_events.py`
- Phase 01 第一支 migration
- 建立 `users`
- 建立 `outbox_events`

### `apps/api` 根層級其他檔案

#### `.env.example`
- API 專用環境變數範本

#### `requirements.txt`
- API 執行期依賴

#### `requirements-dev.txt`
- API 開發期依賴，如 `pytest`、`ruff`

#### `pytest.ini`
- 測試設定

#### `package.json`
- 給 monorepo scripts 用
- 例如 `dev`、`lint`、`test`

---

## 9. `apps/api` 內部關係

### API 啟動鏈

`main.py`
-> `setup_logging()`
-> 建立 FastAPI app
-> `include_router(api_router)`
-> `api/router.py`
-> `health.py` / `meta.py`

### `/v1/health` 的資料流

`health.py`
-> 使用 `schemas/health.py`
-> 直接組出 `HealthResponse`

目前尚未真正經過 Redis 或 DB。

### `/v1/meta/runtime` 的資料流

`meta.py`
-> `runtime_service.get_runtime_meta()`
-> `schemas/meta.py`
-> 回傳 `RuntimeMetaResponse`

目前 `runtime_service.py`
-> 讀取 `core/constants.py`
-> 讀取 `core/config.py`

### DB / Model / Migration 關係

`models/user.py` 與 `models/outbox_event.py`
-> 被 `db/base.py` 匯入
-> 聚合成 `Base.metadata`
-> 被 `alembic/env.py` 掛到 `target_metadata`
-> 被 `0001_create_users_and_outbox_events.py` 具體落成 migration

### Redis 關係

目前 Redis 的結構是先建立入口層：

`core/config.py`
-> 提供 `redis_url`
-> `cache/redis.py` 建 client
-> 後續 `health.py` 或 `runtime_service.py` 可讀寫 cache

目前尚未真正把 `/v1/health` / `/v1/meta/runtime` 接上快取，但接入點已存在。

---

## 10. Web 與 API 之間的關係

### 現在的關係

Web 與 API 在 Phase 01 是「弱耦合、先對齊 contract」：

- Web 畫面已存在
- Web 目前仍可用 mock data
- API 已提供最小資訊型 endpoints
- Web 已有 `lib/api.ts` 可呼叫 API
- Web 已有 `types/api.ts` 對齊 API response 型別

### 未來的演進方向

後續 phase 會逐步從：

- mock data 驅動 UI

轉向：

- API + DB + cache 驅動 UI

也就是說，Phase 01 先把「頁面骨架」與「API contract 骨架」同時建立，但不要求 dashboard 現在就完全吃真實資料。

---

## 11. Phase 01 目前最重要的設計原則

從文件與現況來看，這一階段有幾個核心原則：

### 1. 先搭骨架，不做過度設計
- 先建立 `api/v1/endpoints`
- 先建立 `db/session.py`、`db/base.py`
- 先建立 `cache/redis.py`
- 先建立 `types/api.ts`、`lib/api.ts`
- 但不急著做大型抽象層

### 2. Web 先可見，Members 先不做 auth guard
- 讓開發流程先順
- 讓視覺與資訊架構先穩

### 3. API 先提供最小穩定 contract
- `/v1/health`
- `/v1/meta/runtime`

### 4. 資料庫與 migration 先有落點
- `users`
- `outbox_events`

### 5. 為未來 cache 與 side effects 預留入口
- Redis helper
- outbox pattern

---

## 12. 你可以怎麼理解現在這個架構

如果用一句話總結：

> Phase 01 不是在做完整產品，而是在把「前端畫面」、「後端 API」、「資料表模型」、「migration」、「本地開發環境」這五個基礎面先對齊。

你現在看到的架構，目的不是一步到位，而是讓後續每個 phase 都有地方可以接：

- Web 後續可以從 mock data 切到真實 API
- API 後續可以從 metadata / health 擴到 auth、onboarding、prediction
- DB 後續可以在 `users` 之上往 social auth、profile、training records 擴
- Redis 後續可以從 health/meta 快取擴到 session、route、prediction cache
- Alembic 後續可以持續加 migration，不會失控

---

## 13. 現在最值得記住的依賴關係

### Web

- `app/page.tsx` 依賴 `components/landing/*`
- `app/members/page.tsx` 依賴 `components/members/MembersDashboard`
- `components/members/*` 目前主要依賴 `lib/mock-data.ts`
- `lib/api.ts` 依賴 `lib/env.ts` 與 `types/api.ts`

### API

- `main.py` 依賴 `api/router.py` 與 `core/logging.py`
- `api/router.py` 依賴 `endpoints/health.py`、`endpoints/meta.py`
- `health.py` 依賴 `schemas/health.py`
- `meta.py` 依賴 `schemas/meta.py` 與 `services/runtime_service.py`
- `runtime_service.py` 依賴 `core/config.py`、`core/constants.py`
- `cache/redis.py` 依賴 `core/config.py`
- `db/session.py` 依賴 `core/config.py`
- `db/base.py` 依賴 `models/user.py`、`models/outbox_event.py`
- `alembic/env.py` 依賴 `core/config.py` 與 `db/base.py`
- migration 檔依賴 model 對應的表結構設計

---

## 14. 哪些是「現在就有實際用途」，哪些是「先鋪路」

### 現在就有實際用途
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/members/page.tsx`
- `apps/web/src/components/landing/*`
- `apps/web/src/components/members/*`
- `apps/web/src/lib/mock-data.ts`
- `apps/api/app/main.py`
- `apps/api/app/api/router.py`
- `apps/api/app/api/v1/endpoints/health.py`
- `apps/api/app/api/v1/endpoints/meta.py`
- `apps/api/app/schemas/*`
- `apps/api/app/services/runtime_service.py`

### 先鋪路，但還沒完全接上
- `apps/api/app/cache/redis.py`
- `apps/api/app/db/session.py`
- `apps/api/app/db/base.py`
- `apps/api/app/models/*`
- `apps/api/alembic/*`
- `apps/web/src/lib/api.ts`
- `apps/web/src/lib/env.ts`
- `apps/web/src/types/api.ts`
- `docker-compose.dev.yml`

這很正常，因為 Phase 01 的本質就是 foundation。

---

## 15. 結論

目前這份架構的核心價值不是功能多，而是邊界清楚：

- Web 負責畫面與前端接點
- API 負責服務入口與資料契約
- Schema 負責回傳形狀
- Service 負責組裝邏輯
- Cache 負責 Redis 接入
- DB / Models / Alembic 負責資料層
- Root 負責 monorepo 與本地環境控制

當你理解這些邊界之後，後面每加一個 phase，其實就是在既有骨架上把某一層往下補深，而不是一直重構整個專案。
