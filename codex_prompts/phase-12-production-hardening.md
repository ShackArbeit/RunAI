# Codex Prompt — Phase 12 50 人同時使用的正式環境強化

你現在要直接修改我目前的 RunAI monorepo。請 **實際產生或修改檔案內容**，而不是只列出檔名。

## 背景限制
- 前端：Next.js App Router + TypeScript + Tailwind
- 後端：FastAPI + SQLAlchemy + Redis
- Dev：Docker Compose Postgres + Redis，本地 FastAPI 與 Next.js
- Prd：Neon + Upstash + Next.js + FastAPI on GCP
- Auth 只能用 Google 與 LINE，不要做 email/password
- 前端遵守 DRY / KISS
- 後端與資料結構遵守 SOLID
- 所有刪除都要思考 DB 與 cache invalidation

## 這一階段目標
把 dev 與 prd 都整理到可持續部署，並補齊觀測性、限流、背景工作與 GCP 佈署策略。

## 這一階段必須完成的前端畫面
- 全部會員頁進入 hardening

## 這一階段必須完成的 API
- `保留既有端點，新增內部 metrics / readiness / admin job 端點`

## 這一階段涉及的資料表
- `沿用全部表；補索引`

## 這一階段涉及的 cache key
- `全域限流 key、job queue key、warm cache key`

## 需要新增或修改的檔案與用途
- `docker-compose.dev.yml`：本地 Postgres/Redis 組態。
- `apps/api/app/core/rate_limit.py`：API 限流。
- `apps/api/app/workers/job_runner.py`：背景工作消費者。
- `apps/api/app/observability/metrics.py`：metrics / tracing。
- `apps/web/src/components/common/error-boundary.tsx`：前端錯誤邊界。
- `infra/gcp/cloud-run-api.yaml`：FastAPI Cloud Run 設定。
- `infra/gcp/cloud-run-web.yaml`：Next.js Cloud Run 設定。
- `infra/gcp/secrets.example.md`：GCP Secret Manager 對照。

## 實作要求
- 先掃描現有 repo，沿用既有命名與 import style。
- 若需要 migration，請建立對應 migration 檔與模型。
- 請補最小可跑的 schema / service / endpoint / page / component，不要只寫 TODO。
- 若某些外部 API 尚未正式串接，請先提供 interface / client stub 與 mock fallback。
- 請在回覆中列出「新增檔案」「修改檔案」「為什麼這樣切」。
- 請不要重寫無關檔案。

## 驗收標準
- 前端可以實際看到這一階段畫面。
- FastAPI 對應端點可通。
- DB schema 與 API / UI 對得上。
- Cache key naming 有明確規則。
- 若涉及刪除或 reset，DB 與 Redis 都有處理。

## 這一階段的互動流程
1. 使用者高峰同時進站
2. Next.js 與 FastAPI 都水平擴展
3. FastAPI 經 connection pool 存取 Neon / Upstash
4. 重計算與外部同步交給 background jobs
5. Redis 吃熱路徑快取、metrics 追蹤 p95 與錯誤率

## 外部 API 融入方式
當外部 API 有配額時，正式環境要先以 Redis + outbox + job queue 做節流；尤其 Strava 與 ORS 都不能在高併發頁面 request path 上無限制直打。
