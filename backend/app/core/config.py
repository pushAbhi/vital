from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env")

    # ----------DATABASE URL------------
    DATABASE_URL: str

    # --------- AI MODELS---------------
    GEMINI_API_KEY: str

    # -------- SECRETS ---------
    FRONTEND_SECRET_KEY: str

    ACCESS_TOKEN_EXPIRE_HOURS: int
    JWT_SECRET_KEY: str


settings = Settings()