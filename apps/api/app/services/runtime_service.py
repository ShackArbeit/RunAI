from app.core.constants import APP_NAME, APP_VERSION
from app.core.config import settings


def get_runtime_meta():
    return {
        "app_name": APP_NAME,
        "environment": settings.app_env,
        "version": APP_VERSION,
        "runtime": "fastapi",
    }
