from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from contextlib import asynccontextmanager

from app.database import engine
from app.api.main import api_router

## RUN backend
# ❯ source venv/bin/activate
# ❯ uvicorn app.main:app --reload

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(
    title="Vital API",
    description="AI Healthcare Coaching Backend",
    version="0.1.0",
    lifespan=lifespan
)

# CORS - allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://vital-two-amber.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)