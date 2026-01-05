# Playground 🎨

个人创意实验场与灵感沉淀空间

## 项目定位

Playground 是一个个人项目集合网站，用于沉淀和整理平时灵感迸发时诞生的各种小项目。这里是我探索想法、尝试技术、记录思考的创意空间。

## 项目范围

Playground 包含的项目类型会逐渐演进迭代，目前包括但不限于：

- **小应用**：基于某个想法研发实现的功能性应用
- **创意动效**：酷炫的网页动效实验、Creative Coding 项目尝试
- **个人工具**：支持日常使用的辅助工具
- **笔记沉淀**：知识整理、学习笔记、思考记录

## 项目结构

```
Playground/
├── index.html              # 主页 - 项目概览展示
├── css/
│   ├── shadcn.css          # shadcn 设计系统变量
│   ├── components.css      # shadcn 组件样式
│   └── home.css            # 主页样式
├── js/
│   ├── api.js              # API 调用封装
│   ├── projects.js         # 项目管理逻辑
│   ├── notes.js            # 文本记录管理
│   ├── notion.js           # Notion 同步逻辑
│   ├── background.js       # Three.js 背景动画
│   ├── home.js             # 主页交互逻辑
│   └── debug-panel.js      # 调试面板控制
├── backend/                # 后端 API (FastAPI)
│   ├── app/
│   │   ├── main.py         # FastAPI 应用入口
│   │   ├── models/         # 数据模型
│   │   ├── schemas/        # Pydantic 模式
│   │   ├── api/            # API 路由
│   │   ├── services/       # 业务逻辑服务
│   │   ├── database.py     # 数据库配置
│   │   └── config.py       # 配置文件
│   └── requirements.txt    # Python 依赖
├── projects/               # 子项目目录
│   ├── fetal-movement/     # 宝宝胎动记录器
│   ├── dice-roller/        # 骰子投掷器
│   ├── notes/              # 文本记录
│   └── notion-sync/        # Notion 同步
├── docs/                   # 文档目录
│   ├── README.md           # 项目文档（本文件）
│   ├── api.md              # API 文档
│   ├── notion-setup.md     # Notion 集成配置指南
│   └── deployment.md        # 部署指南
├── tailwind.config.js      # Tailwind CSS 配置
├── package.json            # Node.js 依赖（可选）
└── SETUP.md                # 设置指南
```

## 技术栈

### 前端
- **HTML5** - 页面结构
- **CSS3** - 现代化样式，响应式设计
- **JavaScript** - 交互逻辑
- **Tailwind CSS** - 实用优先的 CSS 框架
- **shadcn/ui** - 组件设计系统
- **Three.js** - 3D 背景动画效果

### 后端
- **Python 3.9+** - 编程语言
- **FastAPI** - 现代化 Web 框架
- **SQLAlchemy** - ORM 数据库工具
- **SQLite/PostgreSQL** - 数据库

### 外部集成
- **Notion API** - 笔记同步功能

### 子项目
各子项目使用不同的技术栈，根据项目需求选择。

## 功能特性

### 主页功能
- 🎨 **抽象艺术背景**：Three.js 渲染的几何图形动画
- 🖱️ **鼠标交互**：几何图形响应鼠标移动的力场效果
- 🎛️ **调试面板**：实时调整背景动画参数（快捷键：`Ctrl/Cmd + Shift + D`）
- 📱 **响应式设计**：适配桌面、平板、移动设备
- 🎯 **项目展示**：卡片式布局展示各个子项目
- 🎨 **shadcn 组件系统**：统一的 UI 设计语言

### 后端 API
- 📦 **项目管理**：项目的增删改查
- 📝 **文本记录**：想法的记录和管理
- 🔄 **Notion 同步**：从 Notion 数据库同步笔记

### 子项目
- ❤️ **宝宝胎动记录器**：孕期胎动记录工具
- 🎲 **骰子投掷器**：用于线上跑团的骰子工具
- 📝 **文本记录**：想法和灵感的记录空间
- 🔄 **Notion 同步**：Notion 笔记同步界面

### 调试面板
- 力场半径调整
- 推力强度调整
- 最大形变调整
- 平滑因子调整

## 使用说明

### 快速开始

1. **前端设置**
   ```bash
   # 可选：安装 Tailwind CSS（用于本地构建）
   npm install
   npm run build:css
   ```
   在浏览器中打开 `index.html` 即可访问前端。

2. **后端设置**
   ```bash
   cd backend
   pip install -r requirements.txt
   # 配置环境变量（见 backend/.env.example）
   uvicorn app.main:app --reload
   ```

3. **访问应用**
   - 前端：在浏览器中打开 `index.html`
   - 后端 API：http://localhost:8000
   - API 文档：http://localhost:8000/docs

### 调试面板
- **打开/关闭**：按 `Ctrl/Cmd + Shift + D` 或 `Ctrl/Cmd + Shift + ` `（反引号）
- **关闭**：按 `ESC` 键或点击关闭按钮
- **控制台**：可在浏览器控制台使用 `toggleDebugPanel()` 函数

### Notion 集成
详见 [Notion 设置指南](notion-setup.md)

## 开发理念

- **灵感驱动**：每个项目都源于一个想法或问题
- **持续迭代**：项目会随着想法和技术的发展不断演进
- **个人整理**：主要面向个人使用，用于思维整理和知识沉淀
- **技术探索**：尝试新技术、新思路、新创意

## 子项目示例

### 宝宝胎动记录器
一个简单的网页应用，用于记录孕期胎动。支持PC、手机、iPad自适应。

**技术栈：** HTML5, CSS3, JavaScript (localStorage)

## 已完成功能

- [x] shadcn 组件系统集成
- [x] 后端 API 开发（FastAPI）
- [x] 项目管理功能
- [x] 文本记录功能
- [x] Notion API 集成
- [x] 骰子投掷器项目
- [x] Notion 同步界面

## 未来规划

- [ ] 项目搜索和筛选功能
- [ ] 时间线视图
- [ ] 项目详情页模板
- [ ] 用户认证（可选）
- [ ] 数据导出功能
- [ ] 更多子项目

## 版本历史

- **v2.0** (2025-01-XX) - 重大更新
  - 集成 shadcn 组件系统
  - 添加后端 API（FastAPI）
  - 实现项目管理、文本记录功能
  - Notion API 集成
  - 新增骰子投掷器项目
  
- **v1.0** (2025-12-21) - 初始版本，包含主页和第一个子项目

---

*这是一个持续演进中的个人项目，记录着灵感的轨迹和技术的探索。*
