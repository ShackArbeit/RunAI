# Codex Prompt — Phase 06 今日課表 + 今日路線 Dashboard v1

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
把你上傳 spec 的 Step 2 與 Step 3 落地：每天產生今日課表與今日路線。

## 這一階段必須完成的前端畫面
- `/app/dashboard`

## 這一階段必須完成的 API
- `GET /v1/dashboard`
- `GET /v1/workouts/daily`
- `POST /v1/workouts/daily/refresh`
- `GET /v1/routes/recommendations/daily`

## 這一階段涉及的資料表
- `training_plan_cycles`
- `workouts`
- `daily_recommendations`

## 這一階段涉及的 cache key
- `runai:daily-rec:{user_id}:{date}`
- `runai:weather:{lat}:{lng}:{date}`

## 需要新增或修改的檔案與用途
- `apps/api/app/integrations/open_meteo/client.py`：天氣 API 呼叫。
- `apps/api/app/services/training/daily_recommendation_service.py`：今日課表與路線聚合。
- `apps/api/app/services/training/workout_rules.py`：規則式課表生成。
- `apps/api/app/models/workout.py`：規劃中的單次課表。
- `apps/api/app/models/daily_recommendation.py`：每日推薦快照。
- `apps/web/src/app/(member)/app/dashboard/page.tsx`：Dashboard。
- `apps/web/src/components/dashboard/today-workout-card.tsx`：今日課表卡。
- `apps/web/src/components/dashboard/today-routes-card.tsx`：今日路線卡。
- `apps/web/src/components/dashboard/fatigue-input.tsx`：疲勞與可跑時間輸入。

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
1. 會員開 dashboard
2. 前端送疲勞/可跑時間
3. FastAPI 取 training profile + active goal + route pool + Open-Meteo
4. 產生今日課表與 top 3 路線
5. DB/Redis 存 daily recommendation snapshot

## 外部 API 融入方式
Open-Meteo 可提供天氣、降雨、風速與體感資訊；今天是否適合 tempo/long run 可以先用規則，不必馬上上 LLM。
