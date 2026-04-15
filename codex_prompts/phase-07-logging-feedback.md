# Codex Prompt — Phase 07 手動訓練紀錄、split、路線回饋與刪除單筆資料

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
落地 Step 4：跑後回填紀錄與路線評價，並支援 user 手動刪除各種紀錄。

## 這一階段必須完成的前端畫面
- `/app/activities`
- `/app/activities/new`
- `/app/activities/[id]`

## 這一階段必須完成的 API
- `POST /v1/activities/manual`
- `GET /v1/activities`
- `GET /v1/activities/{id}`
- `PATCH /v1/activities/{id}`
- `DELETE /v1/activities/{id}`
- `POST /v1/activities/{id}/splits`
- `DELETE /v1/activities/{id}/splits/{split_id}`
- `POST /v1/activities/{id}/route-feedback`
- `PATCH /v1/activities/{id}/route-feedback`
- `DELETE /v1/activities/{id}/route-feedback`

## 這一階段涉及的資料表
- `activity_logs`
- `activity_splits`
- `route_feedback`

## 這一階段涉及的 cache key
- `runai:activities:{user_id}:{page}`
- `runai:feedback:route:{candidate_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/api/v1/endpoints/activities.py`：活動紀錄與 split 端點。
- `apps/api/app/api/v1/endpoints/route_feedback.py`：路線回饋端點。
- `apps/api/app/models/activity_log.py`：實際跑步紀錄。
- `apps/api/app/models/activity_split.py`：分段資料。
- `apps/api/app/models/route_feedback.py`：路線回饋資料。
- `apps/api/app/services/deletion/single_record_delete.py`：單筆刪除 + cache invalidation。
- `apps/web/src/app/(member)/app/activities/page.tsx`：活動列表頁。
- `apps/web/src/components/activities/activity-form.tsx`：活動輸入。
- `apps/web/src/components/activities/route-feedback-form.tsx`：路線回饋。

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
1. 使用者手動新增紀錄
2. FastAPI transaction 寫 activity / splits / feedback
3. Redis 更新列表快取
4. 若使用者刪除單筆紀錄，先刪 DB 再刪相關快取與推薦摘要

## 外部 API 融入方式
本階段不必接 AI；完全由使用者手動輸入，先確保資料品質與刪除一致性。
