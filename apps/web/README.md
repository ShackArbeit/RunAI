# RunAI Web

這是 RunAI 的前端，使用 Next.js App Router。

## 目前內容

- landing page
- `/members` demo page
- landing page 採 `app/[locale]` 多語系路由
- landing page 大部分是 server component
- theme toggle 是少數 client-side 元件

## 路由

- `/`
  - 會導到預設語系首頁
- `/zh`
- `/en`
- `/de`
- `/members`

## 資料夾

### `src/app`

- `page.tsx`
  - 首頁 redirect
- `[locale]/page.tsx`
  - 組裝 landing page
- `members/page.tsx`
  - 組裝 members page
- `layout.tsx`
  - 全域 layout

### `src/components/landing`

首頁各區塊與 dictionary 都在這裡。

### `src/components/members`

`/members` 的畫面元件都在這裡。

### `src/lib`

- `mock-data.ts`
- `api.ts`
- `env.ts`

## 本地啟動

在 repo root：

```powershell
pnpm.cmd run dev --filter web
```

或在 `apps/web`：

```powershell
pnpm.cmd dev
```

打開：

- `http://localhost:3000/`
- `http://localhost:3000/zh`
- `http://localhost:3000/members`

## 常用指令

在 `apps/web`：

```powershell
pnpm.cmd dev
pnpm.cmd build
pnpm.cmd lint
```
