import type { AuthState } from "./types";
import { persistLoggedOutState, readAuthState } from "./storage";

// 讀取目前的 fake auth 狀態，提供給 query 使用。
export async function getAuthState(): Promise<AuthState> {
  return readAuthState();
}

// 模擬 logout mutation：先更新 storage，再回傳最新 auth 狀態。
export async function logout(): Promise<AuthState> {
  persistLoggedOutState();

  return readAuthState();
}
