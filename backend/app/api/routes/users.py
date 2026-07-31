from typing import Any
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import func, select

from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser
)
from app.models.model import (
    UserCreate,
    UserPublic,
    UserRegister,
    User,
    UsersPublic,
)

router = APIRouter(prefix="/users", tags=["users"])

# GET ALL USERS
@router.get("/", dependencies=[Depends(get_current_active_superuser)], response_model=UsersPublic)
def get_users(session: SessionDep, skip: int = 0, limit: int = 50) -> Any:
    count_statement = select(func.count()).select_from(User)
    count = session.exec(count_statement).one()

    # sorting
    statement = select(User).offset(skip).limit(limit)
    users = session.exec(statement).all()

    return UsersPublic(data=users, count=count)

# CREATE NEW USERS - WITHOUT NEEDING TO BE LOGGED IN
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