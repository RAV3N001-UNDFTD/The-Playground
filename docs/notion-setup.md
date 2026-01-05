# Notion 集成配置指南

本指南将帮助你配置 Notion API 集成，使 The Playground 能够从 Notion 数据库同步笔记。

## 前置要求

1. 一个 Notion 账户
2. 一个 Notion 数据库（用于存储笔记）

## 步骤 1: 创建 Notion Integration

1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击 **"+ New integration"**
3. 填写集成信息：
   - **Name**: The Playground（或你喜欢的名称）
   - **Logo**: 可选
   - **Associated workspace**: 选择你的工作区
4. 选择 **Capabilities**:
   - ✅ Read content
   - ✅ Update content（如果需要双向同步）
5. 点击 **Submit** 创建集成
6. 复制 **Internal Integration Token**（这就是你的 `NOTION_API_KEY`）

## 步骤 2: 创建 Notion 数据库

1. 在 Notion 中创建一个新页面或数据库
2. 建议的数据库结构：
   - **Title** (Title 类型) - 页面标题
   - 其他属性根据需要添加

## 步骤 3: 分享数据库给 Integration

1. 打开你创建的数据库页面
2. 点击右上角的 **"..."** 菜单
3. 选择 **"Add connections"**
4. 搜索并选择你刚创建的 Integration（The Playground）
5. 点击 **"Confirm"**

## 步骤 4: 获取 Database ID

1. 打开你的 Notion 数据库页面
2. 查看浏览器地址栏，URL 格式类似：
   ```
   https://www.notion.so/your-workspace/DATABASE_ID?v=...
   ```
3. Database ID 是 URL 中 `notion.so/` 和 `?` 之间的部分
4. 如果 Database ID 包含连字符，需要移除它们
   - 例如：`a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - 实际 ID：`a1b2c3d4e5f67890abcdef1234567890`

## 步骤 5: 配置后端环境变量

1. 在 `backend/` 目录下创建 `.env` 文件（如果不存在）
2. 添加以下配置：

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=a1b2c3d4e5f67890abcdef1234567890
```

3. 将 `NOTION_API_KEY` 替换为你在步骤 1 中复制的 Token
4. 将 `NOTION_DATABASE_ID` 替换为你在步骤 4 中获取的 Database ID

## 步骤 6: 测试同步

1. 启动后端服务器：
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. 访问 Notion 同步页面：
   - 前端：打开 `projects/notion-sync/index.html`
   - 或直接调用 API：`POST http://localhost:8000/api/notion/sync`

3. 点击 **"同步 Notion"** 按钮

4. 如果配置正确，你应该能看到从 Notion 同步的页面列表

## 故障排除

### 错误：Notion API 配置不完整

**原因**: 环境变量未正确设置

**解决方案**:
1. 检查 `backend/.env` 文件是否存在
2. 确认 `NOTION_API_KEY` 和 `NOTION_DATABASE_ID` 都已设置
3. 重启后端服务器

### 错误：401 Unauthorized

**原因**: API Key 无效或未正确分享数据库

**解决方案**:
1. 检查 API Key 是否正确复制（包括 `secret_` 前缀）
2. 确认数据库已分享给 Integration
3. 重新生成 Integration Token（如果需要）

### 错误：404 Not Found

**原因**: Database ID 不正确

**解决方案**:
1. 重新获取 Database ID
2. 确保移除了连字符
3. 确认数据库已分享给 Integration

### 同步内容为空

**原因**: Notion 页面可能没有内容或格式不支持

**解决方案**:
1. 检查 Notion 页面是否有内容
2. 当前实现支持以下块类型：
   - 段落 (paragraph)
   - 标题 (heading_1, heading_2, heading_3)
   - 列表 (bulleted_list_item, numbered_list_item)
   - 待办事项 (to_do)
3. 其他块类型可能不会被解析

## 支持的 Notion 块类型

当前实现支持以下 Notion 块类型：

- ✅ 段落 (paragraph)
- ✅ 一级标题 (heading_1)
- ✅ 二级标题 (heading_2)
- ✅ 三级标题 (heading_3)
- ✅ 无序列表 (bulleted_list_item)
- ✅ 有序列表 (numbered_list_item)
- ✅ 待办事项 (to_do)

## 增量同步

系统会自动检测 Notion 页面的最后修改时间，只同步已更新的页面，避免重复同步。

## 安全建议

1. **不要将 `.env` 文件提交到版本控制**
   - 确保 `.env` 在 `.gitignore` 中
   - 使用 `.env.example` 作为模板

2. **生产环境使用环境变量**
   - 不要在代码中硬编码 API Key
   - 使用环境变量或密钥管理服务

3. **限制 Integration 权限**
   - 只授予必要的权限（Read content）
   - 定期审查 Integration 列表

## 更多信息

- [Notion API 官方文档](https://developers.notion.com/)
- [Notion API 参考](https://developers.notion.com/reference)

