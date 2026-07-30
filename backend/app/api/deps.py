from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlmodel import Session
from collections.abc import Generator
from fastapi.security import APIKeyCookie
import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError

from app.database import engine
from app.core.config import settings
from app.models.model import User, TokenPayload
from app.core import security

cookie_schema = APIKeyCookie(name=settings.AUTH_COOKIE)

def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]
CookieDep  = Annotated[str, Depends(cookie_schema)]



def get_current_user(session: SessionDep, cookie: CookieDep) -> User:
    if not cookie:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    try:
        payload = jwt.decode(
            cookie, settings.JWT_SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="could not validate credentials",
        )

    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user

CurrentUser = Annotated[User, Depends(get_current_user)]

