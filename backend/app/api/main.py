from fastapi import APIRouter

from app.api.routes import users, gemini, system

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(gemini.router)
api_router.include_router(system.router)