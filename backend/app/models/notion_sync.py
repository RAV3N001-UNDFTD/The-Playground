from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base


class NotionSync(Base):
    """Notion 同步记录模型"""
    __tablename__ = "notion_syncs"
    
    id = Column(Integer, primary_key=True, index=True)
    page_id = Column(String, unique=True, nullable=False, index=True)  # Notion 页面 ID
    title = Column(String, nullable=False)
    content = Column(Text)  # 同步的内容
    synced_at = Column(DateTime(timezone=True), server_default=func.now())
    last_modified = Column(DateTime(timezone=True))  # Notion 页面的最后修改时间

