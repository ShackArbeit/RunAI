import { getApiBaseUrl } from "@/lib/env";
import type { HealthResponse, RuntimeMetaResponse } from "@/types/api";


async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}


export function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/v1/health");
}


export function getRuntimeMeta(): Promise<RuntimeMetaResponse> {
  return apiFetch<RuntimeMetaResponse>("/v1/meta/runtime");
}
