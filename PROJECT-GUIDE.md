# 🎨 The Playground 设计师指南

> 用最简单的方式理解这个项目，就像装修房子一样！

---

## 📁 项目结构：就像一栋房子的布局

想象这个项目是一栋房子，每个文件夹就是一个房间：

```
The Playground（整栋房子）
│
├── 📄 index.html          → 房子的正门（主页入口）
├── 📁 css/                → 装修材料仓库（所有样式文件）
│   ├── shadcn.css         → 调色板（颜色定义）
│   ├── components.css     → 家具样式（按钮、卡片等）
│   └── home.css           → 客厅装修（主页样式）
│
├── 📁 js/                 → 房子的智能系统（功能代码）
│   ├── api.js             → 电话线（连接后端）
│   ├── home.js            → 客厅控制面板（主页功能）
│   └── background.js      → 背景音乐系统（动画效果）
│
├── 📁 projects/           → 各个房间（子项目）
│   ├── fetal-movement/    → 卧室1：胎动记录器
│   ├── dice-roller/       → 卧室2：骰子投掷器
│   ├── notes/             → 书房：文本记录
│   └── notion-sync/       → 储藏室：Notion同步
│
└── 📁 backend/            → 房子的水电系统（后端，设计师通常不需要动）
```

---

## 🎨 如何修改颜色：就像换墙纸

### 颜色系统在哪里？

所有颜色都定义在 **`css/shadcn.css`** 文件中，就像房子的调色板。

### 找到颜色定义的位置

打开 `css/shadcn.css` 文件，你会看到这样的代码：

```css
:root {
  --primary: 217 91% 60%;           /* 主色调（蓝色）*/
  --secondary: 217 32% 17.5%;       /* 次要色（深灰）*/
  --background: 0 0% 0%;            /* 背景色（黑色）*/
  --foreground: 210 40% 98%;        /* 文字色（白色）*/
  --destructive: 0 84% 60%;         /* 警告色（红色）*/
}
```

### 颜色格式说明

这里的颜色使用的是 HSL 格式（色相、饱和度、亮度），就像调色板上的三个旋钮：

- **第一个数字**（如 `217`）= 色相（什么颜色：0=红，120=绿，240=蓝）
- **第二个数字**（如 `91%`）= 饱和度（颜色有多鲜艳）
- **第三个数字**（如 `60%`）= 亮度（颜色有多亮）

### 修改颜色的步骤

**场景 1：想把主色调从蓝色改成紫色**

1. 打开 `css/shadcn.css`
2. 找到 `--primary: 217 91% 60%;` 这一行（大约第13行）
3. 改成 `--primary: 270 91% 60%;`（270是紫色）
4. 保存文件
5. 刷新浏览器，看到变化！

**场景 2：想让背景更亮一点**

1. 打开 `css/shadcn.css`
2. 找到 `--background: 0 0% 0%;`（0%是最黑）
3. 改成 `--background: 0 0% 10%;`（10%是深灰）
4. 保存并刷新

**常用颜色参考表：**

| 颜色 | 色相值 | 示例代码 |
|------|--------|----------|
| 红色 | 0 | `--primary: 0 91% 60%;` |
| 橙色 | 30 | `--primary: 30 91% 60%;` |
| 黄色 | 60 | `--primary: 60 91% 60%;` |
| 绿色 | 120 | `--primary: 120 91% 60%;` |
| 青色 | 180 | `--primary: 180 91% 60%;` |
| 蓝色 | 217 | `--primary: 217 91% 60%;` |
| 紫色 | 270 | `--primary: 270 91% 60%;` |
| 粉色 | 330 | `--primary: 330 91% 60%;` |

---

## 📐 如何修改布局：就像重新摆放家具

### 布局相关的文件

- **主页布局**：`css/home.css`
- **组件布局**：`css/components.css`
- **页面结构**：`index.html`

### 常见布局修改

#### 1. 调整项目卡片的间距

**文件**：`css/home.css`

找到这段代码（大约第207行）：
```css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;  /* 👈 这个数字控制卡片之间的间距 */
    padding: 20px;
}
```

**修改**：
- `gap: 30px;` → `gap: 50px;`（间距更大）
- `gap: 30px;` → `gap: 15px;`（间距更小）

#### 2. 改变卡片大小

在同一段代码中：
```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```

**修改**：
- `minmax(300px, 1fr)` → `minmax(250px, 1fr)`（卡片更窄）
- `minmax(300px, 1fr)` → `minmax(400px, 1fr)`（卡片更宽）

#### 3. 调整页面内边距

**文件**：`css/home.css`

找到这段代码（大约第154行）：
```css
.content-wrapper {
    padding: 40px 20px;  /* 👈 上下40px，左右20px */
}
```

**修改**：
- `padding: 40px 20px;` → `padding: 60px 40px;`（更大的内边距）
- `padding: 40px 20px;` → `padding: 20px 10px;`（更小的内边距）

#### 4. 改变圆角大小

**文件**：`css/shadcn.css`

找到这段代码（大约第26行）：
```css
--radius: 0.5rem;  /* 👈 控制所有圆角的大小 */
```

**修改**：
- `0.5rem` → `1rem`（更圆润）
- `0.5rem` → `0.25rem`（更方正）

---

## ✨ 如何修改动画：就像调整灯光效果

### 动画相关的文件

- **背景动画**：`js/background.js`（Three.js 3D效果）
- **卡片动画**：`css/home.css`（淡入效果）
- **悬停效果**：`css/home.css`（鼠标悬停时的变化）

### 常见动画修改

#### 1. 调整卡片悬停效果

**文件**：`css/home.css`

找到这段代码（大约第244行）：
```css
.project-card:hover {
    transform: translateY(-8px) scale(1.02);  /* 👈 悬停时上移8px，放大2% */
    box-shadow: 0 16px 48px rgba(74, 144, 226, 0.3);
}
```

**修改**：
- `translateY(-8px)` → `translateY(-12px)`（上移更多）
- `scale(1.02)` → `scale(1.05)`（放大更多）
- `scale(1.02)` → `scale(1)`（不放大）

#### 2. 改变动画速度

找到这段代码（大约第222行）：
```css
.project-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);  /* 👈 0.4s是动画时长 */
}
```

**修改**：
- `0.4s` → `0.6s`（更慢，更优雅）
- `0.4s` → `0.2s`（更快，更敏捷）

#### 3. 调整卡片淡入动画

找到这段代码（大约第471行）：
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);  /* 👈 从下方30px开始 */
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**修改**：
- `translateY(30px)` → `translateY(50px)`（从更下方开始）
- `translateY(30px)` → `translateY(0)`（直接淡入，不移动）

---

## 🛠️ 常见修改场景：快速指南

### 场景 1：我想换一个主题色

**步骤**：
1. 打开 `css/shadcn.css`
2. 找到 `--primary:` 这一行（第13行）
3. 修改色相值（参考上面的颜色表）
4. 保存并刷新浏览器

**示例**：从蓝色改成绿色
```css
/* 改之前 */
--primary: 217 91% 60%;

/* 改之后 */
--primary: 120 91% 60%;
```

---

### 场景 2：我想让卡片更大更宽松

**步骤**：
1. 打开 `css/home.css`
2. 找到 `.projects-grid`（第207行）
3. 修改两个地方：
   - `minmax(300px, 1fr)` → `minmax(400px, 1fr)`（卡片更宽）
   - `gap: 30px;` → `gap: 50px;`（间距更大）
4. 保存并刷新

---

### 场景 3：我想让背景动画更柔和

**说明**：背景动画在 `js/background.js` 中，比较复杂。如果只是想调整背景颜色：

1. 打开 `css/home.css`
2. 找到 `#background-canvas`（第46行）
3. 修改背景渐变的颜色值

**或者更简单的方法**：
- 打开 `css/shadcn.css`
- 修改 `--background:` 的值，让背景更亮或更暗

---

### 场景 4：我想改变按钮的样式

**步骤**：
1. 打开 `css/components.css`
2. 找到 `.btn-primary`（大约第10行）
3. 可以修改：
   - `h-10` → `h-12`（按钮更高）
   - `px-4` → `px-6`（左右内边距更大）
   - `rounded-md` → `rounded-lg`（更圆润）

**或者修改按钮颜色**：
- 打开 `css/shadcn.css`
- 修改 `--primary:` 的值

---

### 场景 5：我想调整字体大小

**步骤**：
1. 打开 `css/home.css`
2. 找到相关的文字元素，例如：
   - `.site-title`（第182行）- 主页标题
   - `.project-title`（第259行）- 项目卡片标题
   - `.project-description`（第273行）- 项目描述

3. 修改 `font-size` 的值：
   - `3.5rem` → `4rem`（更大）
   - `3.5rem` → `3rem`（更小）

---

### 场景 6：我想改变整个页面的字体

**步骤**：
1. 打开 `css/home.css`
2. 找到 `body`（第35行）
3. 修改 `font-family`：
```css
font-family: '你的字体名称', sans-serif;
```

**常用字体示例**：
- `'PingFang SC', sans-serif`（苹果系统默认）
- `'Microsoft YaHei', sans-serif`（微软雅黑）
- `'Helvetica Neue', sans-serif`（Helvetica）

---

## 📊 文件修改速查表

| 想改什么 | 打开哪个文件 | 找哪一行 |
|---------|------------|---------|
| 主色调 | `css/shadcn.css` | 第13行 `--primary` |
| 背景色 | `css/shadcn.css` | 第7行 `--background` |
| 文字色 | `css/shadcn.css` | 第8行 `--foreground` |
| 卡片间距 | `css/home.css` | 第210行 `gap:` |
| 卡片大小 | `css/home.css` | 第209行 `minmax()` |
| 页面内边距 | `css/home.css` | 第158行 `padding:` |
| 圆角大小 | `css/shadcn.css` | 第26行 `--radius` |
| 悬停效果 | `css/home.css` | 第244行 `.project-card:hover` |
| 动画速度 | `css/home.css` | 第222行 `transition:` |
| 标题大小 | `css/home.css` | 第183行 `.site-title` |
| 按钮样式 | `css/components.css` | 第10行 `.btn-primary` |

---

## 💡 设计师小贴士

### 1. 使用浏览器开发者工具

按 `F12` 打开开发者工具，可以：
- 实时预览修改效果
- 找到元素对应的CSS
- 测试不同的颜色和尺寸

### 2. 颜色工具推荐

- **Coolors.co** - 生成配色方案
- **Adobe Color** - 专业配色工具
- **HSL Color Picker** - 在线HSL颜色选择器

### 3. 修改前先备份

在修改重要文件前，建议：
- 复制一份原文件（如 `home.css.backup`）
- 或者使用 Git 版本控制

### 4. 测试不同设备

修改后记得在：
- 电脑浏览器
- 手机浏览器
- 平板浏览器

测试效果，确保在不同尺寸下都好看。

---

## 🎯 快速开始检查清单

想要快速上手？按这个顺序：

- [ ] 打开 `css/shadcn.css`，熟悉颜色定义
- [ ] 打开 `css/home.css`，找到布局相关的代码
- [ ] 打开浏览器，按 `F12` 打开开发者工具
- [ ] 尝试修改一个颜色值，看效果
- [ ] 尝试修改一个间距值，看效果
- [ ] 保存文件，刷新浏览器，确认变化

---

## ❓ 遇到问题？

### 修改后没有效果？

1. **检查是否保存了文件**（Ctrl+S 或 Cmd+S）
2. **刷新浏览器**（Ctrl+R 或 Cmd+R）
3. **清除浏览器缓存**（Ctrl+Shift+R 或 Cmd+Shift+R）
4. **检查代码语法**（是否有拼写错误、是否缺少分号）

### 不知道改哪里？

1. **使用浏览器开发者工具**（F12）
2. **右键点击元素** → "检查"
3. **查看高亮的CSS代码**
4. **找到对应的文件和行号**

### 改坏了怎么办？

1. **撤销修改**（Ctrl+Z 或 Cmd+Z）
2. **恢复备份文件**
3. **从 Git 恢复**（如果使用了版本控制）

---

## 🎨 设计灵感

这个项目使用了 **shadcn/ui** 设计系统，你可以：

- 访问 [shadcn/ui 官网](https://ui.shadcn.com/) 查看更多组件
- 参考 [Tailwind CSS 文档](https://tailwindcss.com/docs) 了解样式类
- 查看 [HSL 颜色指南](https://www.w3schools.com/colors/colors_hsl.asp) 理解颜色格式

---

**记住**：设计是一个迭代的过程，多尝试、多测试，找到最适合你的风格！✨

