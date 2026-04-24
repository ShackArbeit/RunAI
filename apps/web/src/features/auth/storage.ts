import type { AuthState } from "./types";

// 將 fake auth 的 storage key 集中管理，避免不同檔案各自寫不同字串。
export const STORAGE_KEY = "runai.fake-auth.logged-out";

function canUseStorage() {
  return typeof window !== "undefined";
}

// 讀取瀏覽器中保存的 fake auth 狀態，並轉成共用的 AuthState 格式。
export function readAuthState(): AuthState {
  if (!canUseStorage()) {
    return { isLoggedIn: true };
  }

  const isLoggedOut = window.localStorage.getItem(STORAGE_KEY) === "true";

  return { isLoggedIn: !isLoggedOut };
}

// 在 fake logout 成功後，將已登出狀態寫入 localStorage。
export function persistLoggedOutState() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, "true");
}

// 清除已登出標記，讓系統回到已登入狀態。
export function clearLoggedOutState() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
