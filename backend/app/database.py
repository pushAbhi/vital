from sqlalchemy import create_engine
from sqlmodel import Session
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from app.core.config import settings

load_dotenv()

DATABASE_URL = str(settings.DATABASE_URL)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
)

def get_db():
    with Session(engine) as session:
        yield session

Base = declarative_base()