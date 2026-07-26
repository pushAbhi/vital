from fastapi import APIRouter

router = APIRouter(tags=["System"])

@router.get("/")
async def root():
    return {"message": "Vital Backend is running 🔥"}

@router.get("/health")
async def health():
    return {"status": "healthy", "python": "3.14"}