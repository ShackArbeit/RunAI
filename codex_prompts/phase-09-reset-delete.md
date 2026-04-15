# Codex Prompt — Phase 09 重置跑步設定與資料刪除編排

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
滿足你的 B 與 C：可重置先前跑步設定，也可刪除各種紀錄，而且刪除時 DB 與 cache 都要一起清。

## 這一階段必須完成的前端畫面
- `/app/settings/danger-zone`

## 這一階段必須完成的 API
- `POST /v1/me/training-setup/reset`
- `DELETE /v1/me/data/categories/{category}`
- `DELETE /v1/me/account`

## 這一階段涉及的資料表
- `沿用 athlete_profiles / training_profiles / race_goals / route_preferences / route_candidates / activity_logs / prediction_snapshots`

## 這一階段涉及的 cache key
- `runai:user:*`
- `runai:routes:*`
- `runai:daily-rec:*`
- `runai:prediction:*`

## 需要新增或修改的檔案與用途
- `apps/api/app/services/deletion/reset_training_setup.py`：重置 onboarding 與運動設定。
- `apps/api/app/services/deletion/delete_category.py`：依類型刪資料。
- `apps/api/app/services/deletion/delete_account.py`：帳號級刪除。
- `apps/api/app/services/cache/invalidation.py`：快取刪除規則。
- `apps/web/src/app/(member)/app/settings/danger-zone/page.tsx`：Danger zone。
- `apps/web/src/components/settings/reset-training-setup-card.tsx`：重置設定 UI。
- `apps/web/src/components/settings/delete-category-card.tsx`：分類刪除 UI。

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
1. 使用者在 danger zone 點重置或刪除
2. FastAPI transaction 硬刪相依資料
3. outbox 產生 invalidation event
4. Redis 刪相關 key
5. 前端重新載入並導回 onboarding 或列表空態

## 外部 API 融入方式
本階段不需要新外部 API。核心是資料一致性、transaction 與 cache key naming。
