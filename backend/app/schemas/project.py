from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ProjectBase(BaseModel):
    """项目基础模式"""
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    type: str
    status: str = "active"
    tech_stack: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    link: Optional[str] = None
    inspiration: Optional[str] = None
    date: Optional[str] = None


class ProjectCreate(ProjectBase):
    """创建项目模式"""
    pass


class ProjectUpdate(BaseModel):
    """更新项目模式"""
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    link: Optional[str] = None
    inspiration: Optional[str] = None
    date: Optional[str] = None


class ProjectResponse(ProjectBase):
    """项目响应模式"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

