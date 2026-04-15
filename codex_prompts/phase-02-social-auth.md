# Codex Prompt — Phase 02 Google / LINE 社群登入與會員門檻

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
實作只支援 Google 與 LINE 的登入流程，匿名使用者只能看公開內容，已註冊會員才可進入 AI 服務區。

## 這一階段必須完成的前端畫面
- `/login`
- `/auth/callback/google`
- `/auth/callback/line`

## 這一階段必須完成的 API
- `GET /v1/auth/google/login`
- `GET /v1/auth/google/callback`
- `GET /v1/auth/line/login`
- `GET /v1/auth/line/callback`
- `POST /v1/auth/logout`
- `GET /v1/auth/me`

## 這一階段涉及的資料表
- `user_identities`

## 這一階段涉及的 cache key
- `runai:session:{session_id}`
- `runai:user:member:{user_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/api/v1/endpoints/auth.py`：社群登入與 session 端點。
- `apps/api/app/services/auth/google_service.py`：Google token 驗證與 profile mapping。
- `apps/api/app/services/auth/line_service.py`：LINE Login token 驗證與 profile mapping。
- `apps/api/app/models/user_identity.py`：社群帳號映射。
- `apps/web/src/app/login/page.tsx`：登入頁。
- `apps/web/src/components/auth/social-login-buttons.tsx`：Google / LINE 按鈕。
- `apps/web/src/middleware.ts`：會員頁保護。
- `apps/web/src/lib/auth/session.ts`：前端 session 讀取。

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
1. 使用者點 Google/LINE 登入
2. Next.js 導向 provider
3. provider callback 回 FastAPI
4. FastAPI 建立/更新 users 與 user_identities
5. Redis 寫 session
6. 前端依 `/auth/me` 顯示會員可用功能

## 外部 API 融入方式
Google Sign-In / OAuth 2.0 與 LINE Login 都支援 Web 整合；LINE Login v2.1 支援 OpenID Connect，可在 callback 後用 ID token 取得 profile。
