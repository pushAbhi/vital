from typing import Any
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import func, select

from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
    CurrentUser
)
from app.models.model import (
    UserCreate,
    UserPublic,
    UserRegister,
    User,
    UsersPublic,
    UserUpdateMe,
    Message,
    UpdatePassword
)
from app.core.security import verify_password, get_password_hash

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

"""
Update own user,
email and full_name
"""
@router.patch("/me", response_model=UserPublic)
def update_user_me(*, session: SessionDep, user_in: UserUpdateMe, current_user: CurrentUser) -> Any:
    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409,
                detail="User with this email already exists"
            )
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user

"""
update own user,
password
"""
@router.patch("/me/password", response_model=Message)
def update_password_me(*, session: SessionDep, body: UpdatePassword, current_user: CurrentUser) -> Any :
    if not verify_password(body.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=400, detail="Incorrect password"
        )
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400, detail="New password cannot be the same as current one"
        )
    hashed_password = get_password_hash(body.new_password)
    current_user.hashed_password = hashed_password
    session.add(current_user)
    session.commit()
    return Message(message="Password updated successfully")