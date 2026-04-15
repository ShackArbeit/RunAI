# Codex Prompt — Phase 08 比賽預測、目標差距與趨勢追蹤

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
落地 Step 5 的 prediction 部分，用規則與公式先建立可靠的 v1，不急著用 LLM。

## 這一階段必須完成的前端畫面
- `/app/predictions`

## 這一階段必須完成的 API
- `GET /v1/predictions/current`
- `GET /v1/predictions/history`
- `POST /v1/predictions/recompute`

## 這一階段涉及的資料表
- `prediction_snapshots`

## 這一階段涉及的 cache key
- `runai:prediction:current:{user_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/services/predictions/prediction_engine.py`：預測核心。
- `apps/api/app/services/predictions/formulas.py`：Riegel / pace / load 公式。
- `apps/api/app/models/prediction_snapshot.py`：預測歷史表。
- `apps/api/app/api/v1/endpoints/predictions.py`：prediction 端點。
- `apps/web/src/app/(member)/app/predictions/page.tsx`：預測頁。
- `apps/web/src/components/predictions/prediction-summary.tsx`：最新預測。
- `apps/web/src/components/predictions/goal-gap-panel.tsx`：目標差距。

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
1. prediction 頁請求 current prediction
2. FastAPI 彙整 training profile + activity logs + completion rate
3. prediction engine 計算各距離成績與達標率
4. DB 寫 snapshot、Redis 快取最新結果
5. 前端畫趨勢與 limiting factors

## 外部 API 融入方式
這部分可先不用外部 API，直接用 Riegel / VDOT 類公式、近期跑量與完課率做預測，降低 AI 成本。
