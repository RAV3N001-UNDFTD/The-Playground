# 环境变量配置说明

在 `backend/` 目录下创建 `.env` 文件，并添加以下配置：

```env
# 数据库配置
DATABASE_URL=sqlite:///./playground.db

# Notion API 配置
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here

# 应用配置
DEBUG=True
SECRET_KEY=your_secret_key_here
```

## 配置说明

### DATABASE_URL
- **SQLite (开发环境)**: `sqlite:///./playground.db`
- **PostgreSQL (生产环境)**: `postgresql://user:password@localhost/playground`

### NOTION_API_KEY
从 Notion Integration 获取的 API Key，格式为 `secret_xxxxxxxxxxxxxxxxxxxxxxxx`

### NOTION_DATABASE_ID
Notion 数据库的 ID，从数据库 URL 中提取（移除连字符）

### DEBUG
- `True`: 开发模式，显示详细错误信息
- `False`: 生产模式，隐藏敏感错误信息

### SECRET_KEY
用于加密的密钥，生产环境请使用强随机字符串

## 安全提示

⚠️ **重要**: 
- 不要将 `.env` 文件提交到版本控制系统
- 确保 `.env` 在 `.gitignore` 中
- 生产环境使用环境变量或密钥管理服务

