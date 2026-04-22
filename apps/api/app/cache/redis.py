import redis 
from app.core.config import settings

_redis_client = None

def get_redis_client():
    global _redis_client
    if _redis_client is None:
        _redis_client = redis.Redis.from_url(
             settings.redis_url,
             decode_responses = True
        )
    return _redis_client

def get_cache(key:str) -> str | None:
    client = get_redis_client()
    return client.get(key)

def set_cache(key:str,value:str,ttl:int| None = None) -> None:
    client = get_redis_client()
    if ttl is None:
        client.set(key,value)
    else:
        client.set(key,value,ex=ttl)