import redis

from app.core.config import settings

redis_client = None


def get_redis_client():
    global redis_client

    if redis_client is None:
        redis_client = redis.Redis.from_url(
            settings.redis_url,
            decode_responses=True,
        )

    return redis_client


def check_redis_connection() -> str:
    try:
        client = get_redis_client()
        client.ping()
        return "ok"
    except Exception:
        return "error"


def get_cache(key: str) -> str | None:
    client = get_redis_client()
    return client.get(key)


def set_cache(key: str, value: str, ttl: int | None = None) -> None:
    client = get_redis_client()

    if ttl is None:
        client.set(key, value)
    else:
        client.set(key, value, ex=ttl)
