from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.notion_sync import NotionSync
from app.schemas.notion_sync import NotionSyncResponse
from app.services.notion_service import NotionService
from app.config import settings

router = APIRouter()


@router.get("/sync", response_model=List[NotionSyncResponse])
async def get_synced_pages(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """获取已同步的 Notion 页面列表"""
    syncs = db.query(NotionSync).offset(skip).limit(limit).order_by(NotionSync.synced_at.desc()).all()
    return syncs


@router.post("/sync", response_model=List[NotionSyncResponse])
async def sync_notion_pages(db: Session = Depends(get_db)):
    """手动触发 Notion 同步"""
    if not settings.notion_api_key or not settings.notion_database_id:
        raise HTTPException(
            status_code=400,
            detail="Notion API 配置不完整，请检查 NOTION_API_KEY 和 NOTION_DATABASE_ID"
        )
    
    try:
        notion_service = NotionService(settings.notion_api_key, settings.notion_database_id)
        synced_pages = notion_service.sync_pages(db)
        return synced_pages
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"同步失败: {str(e)}")

