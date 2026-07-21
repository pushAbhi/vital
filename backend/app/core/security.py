import os
from fastapi import Header, HTTPException, Depends
from app.core.config import settings

def verify_frontend(x_frontend_key: str = Header(None)):
    expected = settings.FRONTEND_SECRET_KEY
    if not expected or x_frontend_key != expected:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid frontend key")
    return True