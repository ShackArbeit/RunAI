from app.core.constants import APP_NAME, APP_VERSION
from app.core.config import settings


def get_runtime_meta():
    runtime_meta = {}
    runtime_meta["app_name"] = APP_NAME
    runtime_meta["environment"] = settings.app_env
    runtime_meta["version"] = APP_VERSION
    runtime_meta["runtime"] = "fastapi"
    return runtime_meta
