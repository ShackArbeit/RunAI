# Codex Prompt — Phase 01 基礎骨架與本地開發環境

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
把現有 monorepo 拉成可持續擴充的前後端骨架，建立 Docker Compose 的 Postgres/Redis、本地 FastAPI、Next.js 共用設定。

## 這一階段必須完成的前端畫面
- `/` landing page（匿名可看）
- `/app` 會員區 shell（先保護起來）

## 這一階段必須完成的 API
- `GET /v1/health`
- `GET /v1/meta/runtime`

## 這一階段涉及的資料表
- `users`
- `outbox_events`

## 這一階段涉及的 cache key
- `runai:health:api`
- `runai:meta:runtime`

## 需要新增或修改的檔案與用途
- `apps/api/app/main.py`：FastAPI 進入點與 app factory。
- `apps/api/app/core/config.py`：集中管理 dev/prd 設定。
- `apps/api/app/db/session.py`：SQLAlchemy engine / session lifecycle。
- `apps/api/app/cache/redis.py`：Redis client 與 cache helper。
- `apps/api/app/api/v1/router.py`：版本化 API 總路由。
- `apps/api/app/api/v1/endpoints/health.py`：health/meta 端點。
- `apps/web/src/app/(public)/page.tsx`：Landing page。
- `apps/web/src/app/(member)/app/page.tsx`：會員區 shell。
- `apps/web/src/lib/api/client.ts`：前端 fetch wrapper。
- `apps/web/src/lib/config/env.ts`：前端環境變數入口。

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
1. 使用者開 landing page
2. Next.js 讀 runtime config
3. FastAPI `/health` 回傳服務狀態
4. API client 顯示後端可用性
5. Redis 快取 health/meta

## 外部 API 融入方式
本階段不接外部跑步 API，只先預留 integrations 與 providers 介面。
