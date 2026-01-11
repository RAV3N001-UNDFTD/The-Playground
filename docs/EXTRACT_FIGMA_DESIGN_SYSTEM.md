# 提取 Figma 设计系统 - 操作指南

## 重要提示

我无法直接调用 Figma MCP 工具，需要您在 Cursor 的 AI 对话中执行以下命令来提取设计系统信息。

## Figma 文件信息

- **文件链接**: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476&t=ilpg34OZRXfGL3g1-4
- **Node ID**: `1-476`（MCP 工具中应使用 `1:476`）

## 步骤 1: 提取设计变量

在 Cursor 的 AI 对话中输入以下提示词：

```
请使用 get_variable_defs 工具从以下 Figma frame 中提取所有设计变量：

文件链接: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476

请提取并详细列出：
1. 所有颜色变量（Color Variables）- 包括变量名称、RGB/HEX 值
2. 所有间距变量（Spacing Variables）- 包括变量名称和像素值
3. 所有字体变量（Typography Variables）- 包括字体族、字号、字重、行高
4. 所有圆角变量（Border Radius Variables）
5. 所有阴影变量（Shadow Variables，如果有）

请以清晰的表格或列表格式输出所有变量名称和对应数值。
```

## 步骤 2: 提取组件样式

在 Cursor 的 AI 对话中输入以下提示词：

```
请使用 get_design_context 工具从以下 Figma frame 中提取组件样式：

文件链接: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476

请提取以下组件的详细样式信息（HTML + CSS 格式）：
1. 按钮（Button）组件 - 所有变体（Primary、Secondary、Outline、Ghost 等）
2. 卡片（Card）组件
3. 输入框（Input）组件
4. 标签（Badge）组件
5. 其他组件（如有）

对于每个组件，请详细列出所有样式属性：
- 颜色（background-color、color、border-color）
- 间距（padding、margin、gap）
- 字体（font-family、font-size、font-weight、line-height）
- 圆角（border-radius）
- 阴影（box-shadow）
- 边框（border-width、border-style）
- 其他相关属性

请为每个组件提供完整的 CSS 样式代码。
```

## 步骤 3: 获取框架结构（可选）

如果需要查看 Styles frame 的详细结构：

```
请使用 get_metadata 工具获取以下 Figma frame 的元数据：

文件链接: https://www.figma.com/site/TRpT7nABS2ZLxKMLLC0CRn/The-Playground?node-id=1-476

请返回 frame 的结构信息，包括所有子元素的名称、类型和 node ID。
```

## 提取完成后

提取到设计系统信息后，请将结果复制给我，我将：

1. 整理和转换颜色系统（RGB/HEX → HSL）
2. 更新 `css/shadcn.css` 中的 CSS 变量
3. 更新 `css/home.css` 使用新的设计规范
4. 更新 `css/components.css` 中的组件样式
5. 清理未使用的变量

## 颜色转换参考

提取的颜色需要转换为 HSL 格式以匹配 shadcn：

- **RGB → HSL**: `rgb(74, 144, 226)` → `217 91% 60%`
- **HEX → HSL**: `#4a90e2` → `217 91% 60%`

注意：shadcn 使用 HSL 格式但不包括 `hsl()` 包装，例如：
```css
--primary: 217 91% 60%;
```

然后在 CSS 中使用：
```css
color: hsl(var(--primary));
```

## 变量映射参考

Figma 变量需要映射到 shadcn 的 CSS 变量：

| Figma 变量类型 | shadcn CSS 变量 | 说明 |
|---------------|----------------|------|
| Primary Color | `--primary` | 主色 |
| Background | `--background` | 背景色 |
| Foreground | `--foreground` | 前景色（文字） |
| Secondary | `--secondary` | 次要色 |
| Muted | `--muted` | 静音色 |
| Accent | `--accent` | 强调色 |
| Border | `--border` | 边框色 |
| Input | `--input` | 输入框边框色 |
| Ring | `--ring` | 焦点环色 |
| Destructive | `--destructive` | 危险色 |
