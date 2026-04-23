from fastapi import APIRouter

from app.schemas.meta import RuntimeMetaResponse
from app.services.runtime_service import get_runtime_meta

router = APIRouter(tags=["meta"])


@router.get("/meta/runtime", response_model=RuntimeMetaResponse)
def runtime_meta():
    return RuntimeMetaResponse(**get_runtime_meta())
