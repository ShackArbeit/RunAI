from pydantic import BaseModel


class RuntimeMetaResponse(BaseModel):
    app_name: str
    environment: str
    version: str
    runtime: str
