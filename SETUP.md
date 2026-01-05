# The Playground 设置指南

## shadcn 组件系统集成

项目已集成 shadcn 设计系统和 Tailwind CSS。

### 当前配置

项目使用 **Tailwind CDN** 作为开发环境的快速启动方案。所有样式文件已配置完成。

### 本地构建（可选）

如果你想使用本地构建的 Tailwind CSS（推荐用于生产环境），请按以下步骤操作：

1. **安装依赖**
   ```bash
   npm install
   ```

2. **构建 CSS**
   ```bash
   npm run build:css
   ```

3. **开发模式（自动重新构建）**
   ```bash
   npm run watch:css
   ```

4. **更新 HTML**
   
   在 `index.html` 中，将 Tailwind CDN 脚本替换为构建后的 CSS 文件：
   ```html
   <!-- 替换 CDN 版本 -->
   <link rel="stylesheet" href="css/tailwind.css">
   ```

### 文件说明

- `tailwind.config.js` - Tailwind CSS 配置文件
- `css/shadcn.css` - shadcn 设计系统 CSS 变量
- `css/components.css` - 基于 shadcn 的组件样式（Button、Card、Badge 等）
- `css/home.css` - 主页样式（已整合 shadcn 组件）

### 使用 shadcn 组件

在 HTML 中使用 shadcn 组件类：

```html
<!-- 按钮 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-outline">轮廓按钮</button>

<!-- 卡片 -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">标题</h3>
    <p class="card-description">描述</p>
  </div>
  <div class="card-content">
    内容
  </div>
</div>

<!-- 徽章 -->
<span class="badge badge-default">默认</span>
<span class="badge badge-secondary">次要</span>
<span class="badge badge-outline">轮廓</span>
```

### 自定义主题

在 `css/shadcn.css` 中修改 CSS 变量来自定义主题颜色：

```css
:root {
  --primary: 217 91% 60%;  /* 主色 */
  --secondary: 217 32% 17.5%;  /* 次要色 */
  /* ... 更多变量 */
}
```

