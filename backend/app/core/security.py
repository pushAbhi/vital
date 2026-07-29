from fastapi import Header, HTTPException
import bcrypt
from typing import Any
from datetime import timedelta, datetime, timezone
import jwt

from app.core.config import settings

def verify_frontend(x_frontend_key: str = Header(None)):
    expected = settings.FRONTEND_SECRET_KEY
    if not expected or x_frontend_key != expected:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid frontend key")
    return True

# ----------------- AUTH ------------------

ALGORITHM = "HS256"

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password:str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )

def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt