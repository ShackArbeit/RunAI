# Codex Prompt — Phase 03 初始跑者設定與目標建檔

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
把你上傳 spec 的 Step 1 落地：建立 Training Profile、Race Goal Profile、Route Preference Profile。

## 這一階段必須完成的前端畫面
- `/app/onboarding`
- `/app/settings/profile`

## 這一階段必須完成的 API
- `GET/PUT /v1/me/profile`
- `GET/PUT /v1/me/training-profile`
- `GET/POST/PATCH/DELETE /v1/me/race-goals`
- `GET/PUT /v1/me/route-preferences`
- `POST /v1/me/onboarding/complete`

## 這一階段涉及的資料表
- `athlete_profiles`
- `training_profiles`
- `race_goals`
- `route_preferences`

## 這一階段涉及的 cache key
- `runai:onboarding:{user_id}`
- `runai:goal:active:{user_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/api/v1/endpoints/me_profiles.py`：四組 profile 端點。
- `apps/api/app/models/athlete_profile.py`：基本跑者資料表。
- `apps/api/app/models/training_profile.py`：訓練能力輸入表。
- `apps/api/app/models/race_goal.py`：比賽目標表。
- `apps/api/app/models/route_preference.py`：路線偏好表。
- `apps/web/src/features/onboarding/components/step-basic-profile.tsx`：Step 1。
- `apps/web/src/features/onboarding/components/step-race-goal.tsx`：Step 2。
- `apps/web/src/features/onboarding/components/step-route-preference.tsx`：Step 3。
- `apps/web/src/features/onboarding/hooks/use-onboarding-form.ts`：wizard state。

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
1. 會員進入 onboarding
2. 前端逐步送出 profile
3. FastAPI 驗證並寫入四張表
4. Redis 更新 onboarding / active goal snapshot
5. dashboard 得知使用者完成設定

## 外部 API 融入方式
本階段先不需要 AI；完全用表單 + 規則式驗證即可對應你上傳的 Step 1 三種 profile。
