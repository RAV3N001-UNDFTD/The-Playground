from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class NoteBase(BaseModel):
    """文本记录基础模式"""
    title: str
    content: Optional[str] = None
    tags: Optional[List[str]] = None


class NoteCreate(NoteBase):
    """创建文本记录模式"""
    pass


class NoteUpdate(BaseModel):
    """更新文本记录模式"""
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None


class NoteResponse(NoteBase):
    """文本记录响应模式"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

