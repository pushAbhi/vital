from sqlalchemy import Column, Integer, String
from app.database import Base, engine

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

# creates the table if it doesn't exist
Base.metadata.create_all(bind=engine)