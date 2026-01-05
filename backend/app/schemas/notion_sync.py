from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class NotionSyncResponse(BaseModel):
    """Notion 同步记录响应模式"""
    id: int
    page_id: str
    title: str
    content: Optional[str] = None
    synced_at: datetime
    last_modified: Optional[datetime] = None
    
    class Config:
        from_attributes = True

