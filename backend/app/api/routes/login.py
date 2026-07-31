from fastapi import APIRouter, Depends, HTTPException, Request
from typing import Annotated, Any
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse, RedirectResponse

from app.api.deps import SessionDep, CurrentUser, get_current_user
from app import crud
from app.core.config import settings, is_prod
from app.core import security
from app.models.model import Token, UserPublic

router = APIRouter(tags=["login"])

"""
Log in
"""
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


# ------------------------ Google OAuth ---------------------------

@router.get("/login/google")
async def login_google(request: Request):
    """
    Redirect to Google login page
    """
    redirect_uri = request.url_for("auth_google_callback")
    if is_prod:
        redirect_uri = redirect_uri.replace(scheme="https")
    return await security.oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def auth_google_callback(request: Request, session: SessionDep) -> RedirectResponse:
    """
    Google OAuth callback, Google will call this endpoint
    """
    token = await security.oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    email = user_info["email"]
    full_name = user_info.get("name")
    oauth_id = user_info["sub"]

    user = crud.authenticate_google(
        session=session, email=email, full_name=full_name, oauth_id=oauth_id
    )

    expires_delta = timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOURS)
    access_token = security.create_access_token(user.id, expires_delta)

    response = RedirectResponse(url=settings.SITE_URL, status_code=302)
    response.set_cookie(
        key=settings.AUTH_COOKIE,
        value=access_token,
        httponly=True,
        secure=is_prod,
        samesite="lax",
        max_age=int(expires_delta.total_seconds()),
    )
    return response