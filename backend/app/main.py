from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.api import projects, notes, notion

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建 FastAPI 应用
app = FastAPI(
    title="The Playground API",
    description="个人创意实验场后端 API",
    version="1.0.0"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制为特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(notes.router, prefix="/api/notes", tags=["notes"])
app.include_router(notion.router, prefix="/api/notion", tags=["notion"])


@app.get("/")
async def root():
    """根路径"""
    return {"message": "The Playground API", "version": "1.0.0"}


@app.get("/api/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy"}

