// 集中管理 auth 相關的 query key，避免不同檔案各自寫死字串。
export const authQueryKeys = {
  all: ["auth"] as const,
};
