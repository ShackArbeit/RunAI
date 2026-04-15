# Codex Prompt — Phase 05 候選路線池生成與路線評分基礎

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
建立 easy / tempo / long run / intervals 四類候選路線池，而不是只給單一路線。

## 這一階段必須完成的前端畫面
- `/app/routes`
- `/app/routes/candidates`

## 這一階段必須完成的 API
- `POST /v1/routes/candidates/generate`
- `GET /v1/routes/candidates`
- `GET /v1/routes/candidates/{id}`
- `DELETE /v1/routes/candidates/{id}`

## 這一階段涉及的資料表
- `route_candidates`

## 這一階段涉及的 cache key
- `runai:routes:pool:{user_id}:{use_case}:{geo_bucket}`
- `runai:routes:candidate:{candidate_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/integrations/overpass/client.py`：OSM feature 搜尋。
- `apps/api/app/integrations/openrouteservice/client.py`：路線、isochrone、snap。
- `apps/api/app/integrations/opentopodata/client.py`：高程查詢。
- `apps/api/app/services/routes/candidate_generator.py`：候選路線組裝。
- `apps/api/app/services/routes/route_scorer.py`：平坦度/停頓/安全等分數計算。
- `apps/api/app/models/route_candidate.py`：候選路線表。
- `apps/web/src/app/(member)/app/routes/page.tsx`：候選路線頁。
- `apps/web/src/components/routes/route-card.tsx`：候選路線卡。
- `apps/web/src/components/routes/route-map-preview.tsx`：地圖預覽。

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
1. 使用者選擇用途與半徑
2. FastAPI 先查 Overpass 找可用場景
3. 再用 ORS 生候選路線
4. 必要時用 Open Topo Data 補 elevation
5. 分數寫入 route_candidates 與 Redis route pool

## 外部 API 融入方式
Overpass API 可查詢公園、操場、河濱、步道等 OSM feature；openrouteservice 可做 directions / isochrones / snapping；Open Topo Data 可補 elevation，降低你自己做地形 AI 的需求。
