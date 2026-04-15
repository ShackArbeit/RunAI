# Codex Prompt — Phase 11 Strava 同步與 webhook 匯入

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
減少使用者手動輸入，讓既有跑步資料能自動進系統。

## 這一階段必須完成的前端畫面
- `/app/settings/integrations`

## 這一階段必須完成的 API
- `GET /v1/integrations`
- `GET /v1/integrations/strava/connect`
- `GET /v1/integrations/strava/callback`
- `POST /v1/integrations/strava/sync`
- `POST /v1/integrations/strava/webhook`
- `DELETE /v1/integrations/strava`

## 這一階段涉及的資料表
- `user_sync_connections`
- `sync_events`

## 這一階段涉及的 cache key
- `runai:sync:strava:{user_id}`
- `runai:sync:summary:{user_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/integrations/strava/client.py`：Strava API client。
- `apps/api/app/api/v1/endpoints/integrations.py`：integration 端點。
- `apps/api/app/services/sync/strava_sync_service.py`：同步邏輯。
- `apps/api/app/services/sync/strava_webhook_service.py`：webhook 處理。
- `apps/api/app/models/user_sync_connection.py`：外部連線設定。
- `apps/api/app/models/sync_event.py`：同步事件表。
- `apps/web/src/app/(member)/app/settings/integrations/page.tsx`：整合設定頁。
- `apps/web/src/components/integrations/strava-connect-card.tsx`：Strava connect UI。

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
1. 使用者連接 Strava
2. FastAPI 儲存 sync connection
3. 手動 sync 或 webhook 進來時抓取增量活動
4. 活動寫 activity_logs 與 splits
5. Redis 更新活動與 prediction 摘要

## 外部 API 融入方式
Strava API 提供 athlete、activities、routes 等資料，但需要 OAuth，而且有應用程式 rate limits，要把同步改成排程/增量，不要每次開頁都直接打。
