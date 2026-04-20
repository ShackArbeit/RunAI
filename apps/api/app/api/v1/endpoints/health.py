from datetime import datetime, timezone

from fastapi import APIRouter

from app.schemas.health import HealthDependencies, HealthResponse

router = APIRouter(tags=["health"])



@router.get("/health", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="ok",
        service="api",
        dependencies=HealthDependencies(
            database="not_configured",
            redis="not_configured",
        ),
        checked_at=datetime.now(timezone.utc),
    )
