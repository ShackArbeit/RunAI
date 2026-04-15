# Codex Prompt — Phase 10 AI 服務層與會員專屬功能

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
把 AI 放在「解釋、摘要、個人化文字建議」而不是把整個核心邏輯都交給 LLM，避免成本膨脹。

## 這一階段必須完成的前端畫面
- `/app/ai`

## 這一階段必須完成的 API
- `POST /v1/ai/daily-coach`
- `POST /v1/ai/training-plan/generate`
- `POST /v1/ai/route-rationale`
- `GET /v1/ai/jobs/{id}`

## 這一階段涉及的資料表
- `ai_jobs`

## 這一階段涉及的 cache key
- `runai:ai:{job_type}:{input_hash}`

## 需要新增或修改的檔案與用途
- `apps/api/app/api/v1/endpoints/ai.py`：AI 端點。
- `apps/api/app/services/ai/prompt_builder.py`：把 profile / routes / workouts 組成 prompt。
- `apps/api/app/services/ai/coach_service.py`：AI coach orchestration。
- `apps/api/app/models/ai_job.py`：AI 工作紀錄。
- `apps/web/src/app/(member)/app/ai/page.tsx`：AI coach 頁。
- `apps/web/src/components/ai/coach-panel.tsx`：AI 面板。
- `apps/web/src/components/ai/ai-job-status.tsx`：生成狀態。

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
1. 會員點 AI coach
2. FastAPI 檢查 member-only
3. 組合 profile + goal + route + latest logs
4. 若 input hash 命中 Redis 直接回傳，否則建立 ai_job 呼叫模型
5. 結果存 DB/Redis 後回前端

## 外部 API 融入方式
前面已用 geocoding / routes / weather / formula 減少 AI 需求；AI 僅處理「今天怎麼解釋給使用者聽」與「個人化課表文字說明」。
