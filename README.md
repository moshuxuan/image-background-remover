# Image Background Remover

一个极简的在线图片背景去除工具。

## 技术栈

- Next.js 15 + TypeScript
- Tailwind CSS
- remove.bg API

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 配置 API Key：
在 `.env.local` 中设置你的 remove.bg API Key：
```
REMOVE_BG_API_KEY=your_api_key_here
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 访问 http://localhost:3000

## 功能特性

- 拖拽上传图片
- 一键去除背景
- 下载透明 PNG
- 响应式设计

## 部署

推荐部署到 Cloudflare Pages 或 Vercel。

## License

MIT
