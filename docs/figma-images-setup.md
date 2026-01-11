# Figma 图片导出和配置指南

本文档说明如何从 Figma 设计稿中导出图片并配置到项目中。

## 需要的图片

根据设计稿（node-id=4-213），需要导出以下图片：

### 1. Logo 图片
- **位置**: 导航栏左侧
- **尺寸**: 44x44px
- **文件**: `images/logo.png`
- **Figma 节点**: Navigation > Logo (I4:214;1:519)
- **导出方式**: 在 Figma 中选择 Logo 节点，右键 > Export > PNG，设置尺寸为 44x44px

### 2. Hero Section 背景图片
- **位置**: Hero Section 背景
- **尺寸**: 建议 1280x800px（或更大，根据实际需要）
- **文件**: `images/hero-background.jpg` 或 `.png`
- **Figma 节点**: Hero section > Background (fill_2D6MIN)
- **导出方式**: 选择背景图片节点，导出为 JPG 或 PNG

### 3. Article 卡片图片（多个）
- **位置**: 项目卡片背景
- **尺寸**: 625x700px
- **文件**: `images/article-1.jpg`, `images/article-2.jpg`, `images/article-3.jpg`, `images/article-4.jpg`
- **Figma 节点**: Articles list > Article item > Image
- **导出方式**: 选择每个 Article 的图片节点，导出为 JPG，尺寸 625x700px

### 4. Subscribe Section 背景图片（可选）
- **位置**: Subscribe section 背景
- **尺寸**: 根据设计稿尺寸
- **文件**: `images/subscribe-background.jpg`
- **Figma 节点**: Subscribe section > Background (fill_ZMLQ4C, fill_PRWQNX)

## 导出步骤

1. 打开 Figma 文件：https://www.figma.com/design/SjB3CVroAhlLso46PUwO6l/The-Playground?node-id=4-213

2. 对于每个图片：
   - 选择对应的节点
   - 在右侧面板找到 "Export" 部分
   - 点击 "+" 添加导出设置
   - 选择格式（PNG for Logo, JPG for 大图）
   - 设置尺寸（或使用 "2x", "3x" 用于高分辨率）
   - 点击 "Export" 按钮

3. 将导出的图片保存到项目的 `images/` 目录中

## 配置图片路径

导出图片后，更新以下文件：

1. **index.html**: Logo 图片路径
2. **css/home.css**: Hero section 背景图片
3. **js/home.js**: Article 卡片图片路径（如果需要预设图片）

## 图片优化建议

- Logo: 使用 PNG 格式以保持清晰度
- 大图: 使用 JPG 格式以减小文件大小
- 考虑使用 WebP 格式以获得更好的压缩比（需要浏览器支持）
- 对于响应式设计，可以导出多种尺寸（1x, 2x, 3x）

## 当前状态

目前代码中使用了占位符：
- Logo: 使用空的 SVG 占位符
- Hero 背景: 未设置背景图片（可以使用纯色背景）
- Article 卡片: 使用渐变背景作为占位符，如果项目数据中有 `image_url` 字段，会使用该 URL
