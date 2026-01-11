# Figma 设计系统提取记录

## 文件信息

- **文件 ID**: `TRpT7nABS2ZLxKMLLC0CRn`
- **文件名称**: The-Playground
- **Styles Frame 链接**: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476&t=ilpg34OZRXfGL3g1-4
- **Node ID**: `1-476`
- **MCP 服务器类型**: 远程服务器

## 提取步骤

### 使用 Cursor AI 对话提取

由于 Figma MCP 工具需要在 Cursor 的 AI 对话中调用，请执行以下步骤：

#### 步骤 1: 提取设计变量

在 Cursor 的 AI 对话中输入：

```
请使用 get_variable_defs 工具从以下 Figma frame 中提取所有设计变量：

文件链接: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476

请提取：
1. 所有颜色变量（Color Variables）- 包括变量名称和 RGB/HEX 值
2. 所有间距变量（Spacing Variables）
3. 所有字体变量（Typography Variables）- 包括字体族、字号、字重、行高
4. 所有圆角变量（Border Radius Variables）
5. 所有阴影变量（Shadow Variables，如果有）

请以结构化格式输出，包括变量名称和具体数值。
```

#### 步骤 2: 提取组件样式

```
请使用 get_design_context 工具从以下 Figma frame 中提取组件样式：

文件链接: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476

请提取以下组件的样式（HTML + CSS 格式）：
1. 按钮（Button）组件 - 所有变体（Primary、Secondary、Outline 等）
2. 卡片（Card）组件
3. 输入框（Input）组件
4. 标签（Badge）组件
5. 其他组件（如有）

对于每个组件，请详细列出：
- 颜色（背景色、文字色、边框色）
- 间距（padding、margin、gap）
- 字体（字体族、字号、字重、行高）
- 圆角（border-radius）
- 阴影（box-shadow）
- 其他样式属性
```

#### 步骤 3: 获取文件元数据（可选）

如果需要查看 Styles frame 的内部结构：

```
请使用 get_metadata 工具获取以下 Figma frame 的元数据：

文件链接: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476

请返回 frame 的结构，包括所有子元素和组件的名称及 node ID。
```

## 提取结果记录

### 颜色系统

待提取...

### 字体规范

待提取...

### 间距系统

待提取...

### 组件样式

待提取...

## 转换说明

### 颜色转换（RGB/HEX → HSL）

提取的颜色需要转换为 HSL 格式以匹配 shadcn 设计系统：

- RGB 格式：`rgb(74, 144, 226)` → HSL：`217 91% 60%`
- HEX 格式：`#4a90e2` → HSL：`217 91% 60%`

注意：shadcn 使用 HSL 格式，但不包括 `hsl()` 包装，只保留数值部分。

### 变量映射到 shadcn

需要将 Figma 变量映射到 shadcn 的 CSS 变量：

- Primary Color → `--primary`
- Background Color → `--background`
- Foreground Color → `--foreground`
- Secondary Color → `--secondary`
- Muted Color → `--muted`
- Accent Color → `--accent`
- Border Color → `--border`
- 等等...

## 下一步操作

提取完成后，将执行以下操作：

1. 更新 `css/shadcn.css` 中的 CSS 变量
2. 清理 `css/home.css` 中未使用的变量
3. 更新 `css/components.css` 中的组件样式
4. 确保所有颜色使用 HSL 格式
5. 测试页面显示效果
