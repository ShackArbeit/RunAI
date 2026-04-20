from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.meta import router as meta_router
from app.core.constants import API_V1_PREFIX

router = APIRouter(prefix=API_V1_PREFIX)
router.include_router(health_router)
router.include_router(meta_router)
