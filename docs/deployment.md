# 部署指南

The Playground 部署指南

## 部署架构

```
前端 (静态文件)
    ↓
后端 API (FastAPI)
    ↓
数据库 (SQLite/PostgreSQL)
    ↓
外部服务 (Notion API)
```

## 前端部署

### 选项 1: 静态文件托管

前端是纯静态文件，可以部署到任何静态文件托管服务：

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**

#### GitHub Pages 部署

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支的根目录作为源
4. 访问 `https://your-username.github.io/your-repo/`

**注意**: 需要更新 `js/api.js` 中的 `API_BASE_URL` 为后端 API 地址。

### 选项 2: 本地服务器

使用简单的 HTTP 服务器：

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 后端部署

### 开发环境

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 生产环境

#### 选项 1: 使用 Uvicorn

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

#### 选项 2: 使用 Gunicorn + Uvicorn Workers

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

#### 选项 3: Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

构建和运行：

```bash
docker build -t playground-backend .
docker run -p 8000:8000 --env-file .env playground-backend
```

#### 选项 4: 使用 Docker Compose

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./playground.db
      - NOTION_API_KEY=${NOTION_API_KEY}
      - NOTION_DATABASE_ID=${NOTION_DATABASE_ID}
    volumes:
      - ./backend:/app
      - ./data:/app/data
    restart: unless-stopped
```

运行：

```bash
docker-compose up -d
```

## 数据库配置

### SQLite (开发/小规模)

默认使用 SQLite，无需额外配置。

### PostgreSQL (生产环境)

1. 安装 PostgreSQL
2. 创建数据库：
   ```sql
   CREATE DATABASE playground;
   ```

3. 更新环境变量：
   ```env
   DATABASE_URL=postgresql://user:password@localhost/playground
   ```

4. 运行迁移（如果需要）：
   ```bash
   # SQLAlchemy 会自动创建表
   # 或使用 Alembic 进行迁移管理
   ```

## 环境变量配置

创建 `backend/.env` 文件：

```env
# 数据库配置
DATABASE_URL=sqlite:///./playground.db
# 或 PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost/playground

# Notion API 配置
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here

# 应用配置
DEBUG=False
SECRET_KEY=your_secret_key_here_change_in_production
```

## CORS 配置

生产环境需要更新 CORS 配置，限制允许的来源：

在 `backend/app/main.py` 中：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],  # 替换为实际域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 反向代理 (Nginx)

使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## SSL/HTTPS

使用 Let's Encrypt 获取免费 SSL 证书：

```bash
sudo certbot --nginx -d api.yourdomain.com
```

## 监控和日志

### 日志配置

在 `backend/app/main.py` 中添加日志配置：

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### 健康检查

API 提供健康检查端点：

```
GET /api/health
```

## 性能优化

1. **数据库连接池**
   - SQLAlchemy 默认使用连接池
   - 生产环境可调整池大小

2. **缓存**
   - 考虑使用 Redis 缓存频繁查询的数据

3. **静态文件**
   - 使用 CDN 加速静态资源加载

## 安全建议

1. **环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用环境变量或密钥管理服务

2. **HTTPS**
   - 生产环境必须使用 HTTPS
   - 配置 SSL/TLS 证书

3. **API 认证**
   - 考虑添加 API Key 或 JWT 认证
   - 限制 API 访问频率

4. **数据库安全**
   - 使用强密码
   - 限制数据库访问 IP
   - 定期备份数据

## 备份策略

### 数据库备份

```bash
# SQLite
cp playground.db playground.db.backup

# PostgreSQL
pg_dump playground > backup.sql
```

### 自动化备份

使用 cron 任务定期备份：

```bash
0 2 * * * /path/to/backup-script.sh
```

## 故障排除

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :8000

# 杀死进程
kill -9 <PID>
```

### 数据库连接失败

1. 检查数据库服务是否运行
2. 验证连接字符串
3. 检查防火墙设置

### CORS 错误

1. 检查后端 CORS 配置
2. 确认前端请求的 Origin 在允许列表中
3. 检查浏览器控制台错误信息

## 部署检查清单

- [ ] 环境变量已正确配置
- [ ] 数据库已创建并迁移
- [ ] CORS 配置已更新
- [ ] SSL/HTTPS 已配置
- [ ] 日志记录已配置
- [ ] 备份策略已实施
- [ ] 监控和告警已设置
- [ ] 安全措施已实施

