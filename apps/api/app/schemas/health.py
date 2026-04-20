from datetime import datetime

from pydantic import BaseModel


class HealthDependencies(BaseModel):
    database: str
    redis: str


class HealthResponse(BaseModel):
    status: str
    service: str
    dependencies: HealthDependencies
    checked_at: datetime
