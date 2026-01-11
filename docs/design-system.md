# The Playground 设计系统

本文档记录了从 Figma 设计文件中提取的完整设计系统规范。

**来源：** Figma 文件 `SjB3CVroAhlLso46PUwO6l` - The Playground (Styles frame)

---

## 1. 颜色系统 (Colors)

### 1.1 基础颜色

| 颜色名称 | HEX | RGB | HSL (用于 shadcn) |
|---------|-----|-----|------------------|
| White | `#FFFFFF` | rgb(255, 255, 255) | `0 0% 100%` |
| Black | `#000000` | rgb(0, 0, 0) | `0 0% 0%` |

### 1.2 背景颜色

| 颜色名称 | HEX | RGB | HSL | 用途 |
|---------|-----|-----|-----|------|
| Background 1 | `#0F0E0E` | rgb(15, 14, 14) | `0 3% 5%` | 深色背景 |
| Background 2 | `#1F1F1F` | rgb(31, 31, 31) | `0 0% 12%` | 深灰背景 |
| Background 4 | `#FFFFFF` | rgb(255, 255, 255) | `0 0% 100%` | 白色背景 |
| Background 5 | `#FF5700` | rgb(255, 87, 0) | `20 100% 50%` | 橙红色背景 |
| Background 6 | `#32CE57` | rgb(50, 206, 87) | `134 61% 50%` | 绿色背景 |
| Background 7 | `#A3CAFF` | rgb(163, 202, 255) | `214 100% 81%` | 浅蓝色背景 |

### 1.3 文本颜色

| 颜色名称 | HEX | RGB | HSL | 用途 |
|---------|-----|-----|-----|------|
| Text/Paragraph 2 | `#0F0E0E` | rgb(15, 14, 14) | `0 3% 5%` | 主要文本（深色） |
| Text/Paragraph 3 | `#8C8D92` | rgb(140, 141, 146) | `229 2% 56%` | 次要文本 |
| Text/Paragraph 4 | `#D1D2D8` | rgb(209, 210, 216) | `231 8% 83%` | 更次要文本 |
| Text/Headline 1 | `#F6F8FB` | rgb(246, 248, 251) | `216 38% 97%` | 标题文本（浅色） |
| Text/Paragraph 1 | `#F6F8FB` | rgb(246, 248, 251) | `216 38% 97%` | 浅色文本 |

### 1.4 边框和分隔线

| 颜色名称 | HEX | RGB | HSL | 用途 |
|---------|-----|-----|-----|------|
| Divider | `#555659` | rgb(85, 86, 89) | `224 2% 34%` | 分隔线 |
| Divder Lines | `#E9E9E9` | rgb(233, 233, 233) | `0 0% 91%` | 分割线（浅色） |
| Stroke O91A9H | `#DBE0EC` | rgb(219, 224, 236) | `222 30% 89%` | 浅灰描边 |
| Stroke O8HRIW | `#9747FF` | rgb(151, 71, 255) | `266 100% 63%` | 紫色描边（虚线） |

---

## 2. 字体系统 (Typography)

### 2.1 标题样式 (Headers)

#### Header 1
- **字体族**: Tilt Warp
- **字重**: 400 (Regular)
- **字号**: 200px
- **行高**: 0.85em (170%)
- **字间距**: -4%
- **对齐**: 左对齐，底部对齐

#### Header 2
- **字体族**: Tilt Warp
- **字重**: 400 (Regular)
- **字号**: 160px
- **行高**: 0.8em (160%)
- **字间距**: -5%
- **对齐**: 左对齐，顶部对齐

#### Header 3
- **字体族**: Tilt Warp
- **字重**: 400 (Regular)
- **字号**: 110px
- **行高**: 0.95em (190%)
- **字间距**: -4%
- **对齐**: 左对齐，顶部对齐

#### Header 4
- **字体族**: Instrument Serif
- **字重**: 400 (Regular)
- **字号**: 80px
- **行高**: 0.9em (180%)
- **字间距**: -2%
- **对齐**: 居中对齐，顶部对齐

#### Header 5
- **字体族**: Tilt Warp
- **字重**: 400 (Regular)
- **字号**: 24px
- **行高**: 1.4em (140%)
- **字间距**: -2%
- **对齐**: 左对齐，顶部对齐

### 2.2 段落样式 (Paragraphs)

#### Paragraph 1 (Semibold)
- **字体族**: Geist
- **字重**: 600 (Semibold)
- **字号**: 20px
- **行高**: 1.4em (140%)
- **字间距**: -2%
- **对齐**: 左对齐，顶部对齐

#### Paragraph 1
- **字体族**: Geist
- **字重**: 400 (Regular)
- **字号**: 20px
- **行高**: 1.4em (140%)
- **字间距**: -2%
- **对齐**: 右对齐，顶部对齐

#### Paragraph 2
- **字体族**: Geist
- **字重**: 400 (Regular)
- **字号**: 16px
- **行高**: 1.4em (140%)
- **字间距**: -2%
- **对齐**: 左对齐，底部对齐

### 2.3 其他文本样式

#### Caption
- **字体族**: Geist
- **字重**: 600 (Semibold)
- **字号**: 10px
- **行高**: 1.4em (140%)
- **字间距**: 4%
- **文本转换**: 大写 (UPPERCASE)
- **对齐**: 右对齐，顶部对齐

#### Label (style_ANHHG1)
- **字体族**: Roboto Flex
- **字重**: 500 (Medium)
- **字号**: 12px
- **行高**: 1.4em (140%)
- **字间距**: -3%

#### Button Text
- **字体族**: Geist
- **字重**: 600 (Semibold)
- **字号**: 18px
- **行高**: 1.4em (140%)
- **字间距**: -2%

---

## 3. 间距系统 (Spacing)

### 3.1 主要布局间距

| 间距名称 | 值 | 用途 |
|---------|-----|------|
| 主框架间距 | 74px | 主要区域之间的垂直间距 |
| 标准组件间距 | 20px | 组件之间的标准间距 |
| 小间距 | 4px, 8px, 10px | 紧密排列的元素 |
| 中等间距 | 16px, 17px | 中等距离的元素 |
| 大间距 | 32px, 40px, 50px | 较大距离的元素 |
| 超大间距 | 74px, 142px | 主要区域分隔 |

### 3.2 内边距 (Padding) 规范

| 尺寸 | 值 | 用途 |
|------|-----|------|
| 小 | 12px | 按钮、小组件 |
| 标准 | 20px | 标准组件 |
| 标签 | 24px | 标签、标题区域 |
| 大型容器 | 32px 24px | 大型容器 |
| 大型区域 | 50px 20px | 大型区域 |
| 主框架 | 30px 20px 100px | 主框架内边距 |

### 3.3 间距值列表

常用间距值（按从小到大的顺序）：
- `4px` - 紧密间距
- `8px` - 小间距
- `10px` - 标签间距
- `12px` - 按钮内边距
- `16px` - 中等间距
- `17px` - 图标间距
- `20px` - 标准间距
- `24px` - 标签/标题区域
- `32px` - 大间距
- `40px` - 超大间距
- `50px` - 标题间距
- `74px` - 主框架间距
- `100px` - 主框架底部间距
- `142px` - 超大间距

---

## 4. 圆角系统 (Border Radius)

| 圆角值 | 用途 |
|--------|------|
| `5px` | 标准组件圆角（最常用） |
| `6px` | 中等圆角 |
| `8px` | 较大圆角 |
| `999px` | 完全圆形（用于圆形按钮/标签） |

---

## 5. 组件系统 (Components)

设计系统中包含以下组件集：

1. **Nav item** - 导航项组件
   - 状态：Default 1, Hover 1, Default 2, Hover 2, Default 3, Hover 3
   - 使用背景：Background 5, Background 6, Background 7

2. **Navigation** - 导航组件
   - 断点：Desktop, Mobile
   - 状态：Default, Hover

3. **Article - large** - 大文章卡片
   - 状态：Default, Hover

4. **Article - small** - 小文章卡片
   - 视口：Desktop, Tablet, Mobile
   - 状态：Default, Hover

5. **Button - large** - 大按钮
   - 状态：Default, Hover

6. **Button - small** - 小按钮
   - 状态：Default, Hover

7. **Table row** - 表格行
   - 视口：Desktop, Mobile

8. **Subscribe container** - 订阅容器
   - 视口：Desktop, Tablet, Mobile

9. **Footer** - 页脚
   - 断点：Desktop, Tablet, Mobile

---

## 6. 特殊效果

### 6.1 模糊效果
- `blur(20px)` - 轻微模糊
- `blur(50px)` - 重度模糊（用于背景模糊）

### 6.2 渐变
- 线性渐变用于遮罩层：`linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)`

### 6.3 虚线描边
- Stroke O8HRIW 使用虚线样式：`10px 5px` (实线10px，空白5px)

---

## 7. 颜色映射到 shadcn 变量

### 映射关系

| Figma 颜色 | shadcn 变量 | HSL 值 | 说明 |
|-----------|------------|--------|------|
| Background 1 | `--background` | `0 3% 5%` | 主背景色（深色） |
| Text/Headline 1 | `--foreground` | `216 38% 97%` | 前景色（浅色文字） |
| Background 2 | `--card` | `0 0% 12%` | 卡片背景 |
| Text/Headline 1 | `--card-foreground` | `216 38% 97%` | 卡片文字 |
| Stroke O8HRIW | `--primary` | `266 100% 63%` | 主色（使用紫色） |
| Text/Headline 1 | `--primary-foreground` | `216 38% 97%` | 主色文字 |
| Divider | `--secondary` | `224 2% 34%` | 次要色 |
| Text/Headline 1 | `--secondary-foreground` | `216 38% 97%` | 次要色文字 |
| Divider | `--muted` | `224 2% 34%` | 静音色 |
| Text/Paragraph 3 | `--muted-foreground` | `229 2% 56%` | 静音色文字 |
| Divider | `--accent` | `224 2% 34%` | 强调色 |
| Text/Headline 1 | `--accent-foreground` | `216 38% 97%` | 强调色文字 |
| Divider | `--border` | `224 2% 34%` | 边框色 |
| Divider | `--input` | `224 2% 34%` | 输入框边框 |
| Stroke O8HRIW | `--ring` | `266 100% 63%` | 焦点环色 |
| Background 5 | `--destructive` | `20 100% 50%` | 危险色（使用橙红色） |
| Text/Headline 1 | `--destructive-foreground` | `216 38% 97%` | 危险色文字 |

### 圆角变量

| shadcn 变量 | 值 | 说明 |
|------------|-----|------|
| `--radius` | `0.3125rem` (5px) | 标准圆角（匹配最常用的 5px） |

---

## 8. 字体映射

### 字体栈建议

由于设计系统使用了自定义字体（Tilt Warp, Instrument Serif, Geist, Roboto Flex），在实际应用中需要：

1. **通过 Google Fonts 或自托管引入字体**
2. **提供后备字体栈**

建议的字体栈：

```css
/* 标题字体 */
--font-heading: "Tilt Warp", "Instrument Serif", system-ui, sans-serif;

/* 正文字体 */
--font-body: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* 标签字体 */
--font-label: "Roboto Flex", system-ui, sans-serif;

/* 等宽字体 */
--font-mono: "Roboto Mono", "Courier New", monospace;
```

---

## 9. 使用指南

### 9.1 在 CSS 中使用

设计系统变量已映射到 shadcn CSS 变量，可以通过以下方式使用：

```css
/* 使用颜色 */
color: hsl(var(--foreground));
background-color: hsl(var(--background));

/* 使用圆角 */
border-radius: var(--radius);

/* 使用间距 */
padding: 20px; /* 使用标准间距值 */
gap: 16px; /* 使用中等间距值 */
```

### 9.2 响应式设计

设计系统包含了不同视口的组件变体：
- **Desktop**: 桌面端（默认）
- **Tablet**: 平板端（768px - 1024px）
- **Mobile**: 移动端（< 768px）

### 9.3 组件状态

大多数交互组件包含以下状态：
- **Default**: 默认状态
- **Hover**: 悬停状态

---

## 10. 更新日志

- **2025-01-XX**: 从 Figma 设计文件 `SjB3CVroAhlLso46PUwO6l` 提取设计系统
- 文件节点 ID: `2:27` (Styles frame)
