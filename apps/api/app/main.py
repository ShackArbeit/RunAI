from fastapi import FastAPI

from app.api.router import router as api_router
from app.core.constants import APP_NAME

app = FastAPI(title=APP_NAME)

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "API is running"}
