from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, Any
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone

from app.api.deps import SessionDep, CurrentUser
from app import crud
from app.core.config import settings
from app.core import security
from app.models.model import Token, UserPublic

router = APIRouter(tags=["login"])

@router.post("/login/access-token")
def login_access_token(session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    user = crud.authenticate(session=session, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    expires_delta = timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOURS)

    access_token = security.create_access_token(user.id, expires_delta)

    # Absolute expiration Unix time (UTC)
    expires_at = datetime.now(timezone.utc) + expires_delta
    expires_timestamp = int(expires_at.timestamp())

    token = Token(
        access_token = access_token,
        expires = expires_timestamp,
    )

    return token

"""
Test Access tokens
"""
@router.post("/login/test-token", response_model=UserPublic)
def test_token(current_user: CurrentUser) -> Any:
    return current_user