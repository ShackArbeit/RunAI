from fastapi import FastAPI

from app.api.router import router as api_router
from app.core.constants import APP_NAME
from app.core.logging import setup_logging

setup_logging()

app = FastAPI(title=APP_NAME)

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "API is running"}
