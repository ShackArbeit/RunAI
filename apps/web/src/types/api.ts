export type DependencyStatus = "ok" | "error" | "not_configured";

export interface HealthDependencies {
  database: DependencyStatus;
  redis: DependencyStatus;
}

export interface HealthResponse {
  status: string;
  service: string;
  dependencies: HealthDependencies;
  checked_at: string;
}

export interface RuntimeMetaResponse {
  app_name: string;
  environment: string;
  version: string;
  runtime: string;
}
