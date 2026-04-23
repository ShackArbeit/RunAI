from datetime import datetime, timezone

from fastapi import APIRouter

from app.cache.redis import check_redis_connection
from app.db.session import check_database_connection
from app.schemas.health import HealthDependencies, HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health_check():
    database_status = check_database_connection()
    redis_status = check_redis_connection()

    return HealthResponse(
        status="ok",
        service="api",
        dependencies=HealthDependencies(
            database=database_status,
            redis=redis_status,
        ),
        checked_at=datetime.now(timezone.utc),
    )
