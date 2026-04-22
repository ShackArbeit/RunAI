from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass

import app.models.outbox_event
import app.models.user
