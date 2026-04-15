# Codex Prompt — Phase 04 地點管理、地址解析與安全條件前處理

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
把使用者常跑地點、住家周邊、可接受半徑與安全偏好先結構化，為後續路線池做準備。

## 這一階段必須完成的前端畫面
- `/app/places`
- `/app/settings/routes`

## 這一階段必須完成的 API
- `POST /v1/routes/geocode`
- `POST /v1/routes/reverse-geocode`
- `GET/POST /v1/me/places`
- `PATCH /v1/me/places/{id}`
- `DELETE /v1/me/places/{id}`

## 這一階段涉及的資料表
- `saved_places`

## 這一階段涉及的 cache key
- `runai:geo:search:{hash}`
- `runai:places:{user_id}`

## 需要新增或修改的檔案與用途
- `apps/api/app/integrations/nominatim/client.py`：Nominatim 呼叫封裝。
- `apps/api/app/api/v1/endpoints/places.py`：places / geocode 端點。
- `apps/api/app/models/saved_place.py`：使用者常用地點。
- `apps/web/src/app/(member)/app/places/page.tsx`：地點管理頁。
- `apps/web/src/components/maps/place-picker.tsx`：地址輸入與地圖選點。
- `apps/web/src/features/places/hooks/use-geocode.ts`：geocode query hook。

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
1. 使用者輸入地址或點地圖
2. FastAPI 呼叫 Nominatim 解析座標
3. DB 儲存 saved_places
4. Redis 快取 geocode 結果
5. route preference 取得 home/base coordinates

## 外部 API 融入方式
Nominatim 提供 geocoding / reverse geocoding；可把文字地址轉成座標，再用座標建立後續 route search seed。
