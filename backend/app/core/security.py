from fastapi import Header, HTTPException
from app.core.config import settings
import bcrypt

def verify_frontend(x_frontend_key: str = Header(None)):
    expected = settings.FRONTEND_SECRET_KEY
    if not expected or x_frontend_key != expected:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid frontend key")
    return True

# ----------------- AUTH ------------------

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")