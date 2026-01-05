from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Project(Base):
    """项目模型"""
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String)
    icon = Column(String)
    type = Column(String, nullable=False)  # app, animation, tool, note, experiment
    status = Column(String, default="active")  # active, completed, archived
    tech_stack = Column(JSON)  # 技术栈列表
    tags = Column(JSON)  # 标签列表
    link = Column(String)  # 项目链接
    inspiration = Column(String)  # 灵感来源
    date = Column(String)  # 创建日期
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

