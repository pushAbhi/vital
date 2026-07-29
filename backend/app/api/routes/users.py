from typing import Any
from fastapi import APIRouter, HTTPException
from app import crud
from app.api.deps import (
    SessionDep,
)
from app.models.model import (
    UserCreate,
    UserPublic,
    UserRegister,
)

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister) -> Any :
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if (user):
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists."
        )
    user_create = UserCreate.model_validate(user_in)
    user = crud.create_user(session=session, user_create=user_create)
    return user