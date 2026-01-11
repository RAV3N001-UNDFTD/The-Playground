# Figma MCP Server 配置指南

本指南将帮助你配置 Figma MCP (Model Context Protocol) Server，使 Cursor IDE 能够访问和提取 Figma 设计稿中的设计规范。

## 前置要求

1. 一个 Figma 账户
2. 需要访问的 Figma 设计文件
3. Cursor IDE（已安装）
4. 可选：Figma 桌面应用（如果使用本地服务器）

## 两种配置方式

Figma MCP Server 提供两种连接方式：

- **远程服务器**：连接到 Figma 托管的 MCP 服务器（推荐，更简单）
- **本地服务器**：通过 Figma 桌面应用运行本地 MCP 服务器

## 方式一：远程服务器配置（推荐）

### 步骤 1: 打开 Cursor 设置

1. 打开 Cursor IDE
2. 使用快捷键 `Cmd + ,` (macOS) 或 `Ctrl + ,` (Windows/Linux) 打开设置
3. 或者点击菜单栏：**Cursor** > **Settings** > **Cursor Settings**

### 步骤 2: 配置 MCP 服务器

1. 在设置中找到 **MCP** 标签页
2. 点击 **"+ Add new global MCP server"** 或 **"Add Server"**
3. 输入以下配置信息：

{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
