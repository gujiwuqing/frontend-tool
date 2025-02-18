# 前端工具箱

一个实用的前端开发工具集合，基于 React + TypeScript + Vite 构建。

## 功能特性

目前包含以下工具：

### 🔧 JSON 格式化工具
- 格式化和验证 JSON 数据
- 支持 JSON 的压缩和美化功能
- 帮助开发者快速处理 JSON 数据

### 🔄 Base64 转换器
- 支持文本和 Base64 编码之间的相互转换
- 方便处理 Base64 编码的图片或其他数据

### 🔗 URL 编解码器
- 提供 URL 的编码和解码功能
- 帮助处理包含特殊字符的 URL

### 📝 HTML转Markdown
- 将 HTML 代码转换为 Markdown 格式
- 支持常见的 HTML 标签转换
- 保持转换后文档的可读性

### 📋 JSON转TypeScript
- 自动将 JSON 数据转换为 TypeScript 接口定义
- 提高 TypeScript 开发效率
- 减少手动编写接口定义的工作量

### 📄 Markdown转HTML
- 将 Markdown 内容转换为 HTML 格式
- 支持标准 Markdown 语法
- 便于在网页中展示 Markdown 内容

## 开发说明

### 环境要求
- Node.js 18.0 或以上版本
- pnpm 8.0 或以上版本

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build
```

### 技术栈
- React 19
- TypeScript 5.7
- Vite 6.1
- Ant Design 5.24

## 部署

项目使用 GitHub Actions 进行自动化部署，每次推送到 main 分支时会自动构建并部署到 GitHub Pages。

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个工具集！
