from fastapi.testclient import TestClient

from app.api.v1.endpoints import health as health_endpoint
from app.main import app


client = TestClient(app)


def test_root_returns_running_message():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "API is running"}


def test_runtime_meta_returns_phase01_fields():
    response = client.get("/v1/meta/runtime")
    data = response.json()

    assert response.status_code == 200
    assert data["app_name"] == "RunAI API"
    assert data["environment"] == "local"
    assert data["version"] == "0.1.0"
    assert data["runtime"] == "fastapi"


def test_health_returns_dependency_keys():
    health_endpoint.check_database_connection = lambda: "ok"
    health_endpoint.check_redis_connection = lambda: "ok"

    response = client.get("/v1/health")
    data = response.json()

    assert response.status_code == 200
    assert data["status"] == "ok"
    assert data["service"] == "api"
    assert "database" in data["dependencies"]
    assert "redis" in data["dependencies"]
    assert "checked_at" in data
