from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.gemini_router.routes import router as gemini_router
from app.api.system_router.routes import router as system_router

## RUN backend
# ❯ source venv/bin/activate
# ❯ uvicorn app.main:app --reload

app = FastAPI(
    title="Vital API",
    description="AI Healthcare Coaching Backend",
    version="0.1.0"
)

# CORS - allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(system_router)   # / and /health
app.include_router(gemini_router)   # /gemini