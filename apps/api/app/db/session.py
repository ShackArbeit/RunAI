from collections.abc import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings


engine = None
SessionLocal = None


def get_engine():
    global engine

    if engine is None:
        if not settings.database_url:
            raise RuntimeError("DATABASE_URL is not configured.")

        engine = create_engine(settings.database_url)

    return engine


def get_session_local():
    global SessionLocal

    if SessionLocal is None:
        SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=get_engine(),
        )

    return SessionLocal


def check_database_connection() -> str:
    try:
        with get_engine().connect() as connection:
            connection.execute(text("SELECT 1"))
        return "ok"
    except Exception:
        return "error"

def get_db() -> Generator[Session, None, None]:
    session_local = get_session_local()
    db = session_local()

    try:
        yield db
    finally:
        db.close()
