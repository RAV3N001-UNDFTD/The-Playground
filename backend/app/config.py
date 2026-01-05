from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """应用配置"""
    database_url: str = "sqlite:///./playground.db"
    notion_api_key: Optional[str] = None
    notion_database_id: Optional[str] = None
    debug: bool = True
    secret_key: str = "dev-secret-key-change-in-production"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

