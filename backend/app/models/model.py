from app.database import Base, engine
from sqlmodel import  SQLModel, Field, Relationship
from pydantic import EmailStr
from enum import Enum
import uuid

class AuthProvider(str, Enum) :
    email = "email"
    google = "google"

class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    provider: AuthProvider = Field(default=AuthProvider.email)
    oauth_id: str | None = Field(default=None, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    fullname: str | None = Field(default=None, max_length=255)

class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=40)

class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=6, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)

class User(UserBase, Table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str | None = None # password | google
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID

class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)

# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")

# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    # Absolute Date, timestamp, sufficient
    expires: int

# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None

# creates the table if it doesn't exist
Base.metadata.create_all(bind=engine)