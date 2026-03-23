# PRD - Image Background Remover MVP

**版本：** v0.1  
**日期：** 2026-03-20  
**状态：** Draft

---

## 一、产品概述

一个极简的在线图片背景去除工具。用户上传图片，自动去除背景，下载透明PNG。

**目标用户：** 需要快速抠图的普通用户（电商、设计师、社交媒体运营）  
**核心价值：** 快、准、免费用、无需注册

---

## 二、技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js + Tailwind CSS |
| 部署 | Cloudflare Pages |
| API层 | Cloudflare Workers |
| 抠图能力 | remove.bg API |
| 存储 | 无（全程内存，不落盘） |

---

## 三、核心功能（MVP范围）

### 3.1 图片上传
- 支持拖拽上传
- 支持点击选择文件
- 支持格式：JPG、PNG、WebP
- 文件大小限制：≤ 10MB（remove.bg 免费版限制）
- 上传后立即展示原图预览

### 3.2 背景去除
- 点击"去除背景"按钮触发
- 调用 Cloudflare Worker → remove.bg API
- 处理中显示 loading 状态
- 失败时展示友好错误提示

### 3.3 结果展示与下载
- 左右对比展示：原图 vs 处理后
- 处理后图片背景用棋盘格纹理表示透明
- 一键下载透明PNG

### 3.4 重置
- 下载后或手动点击"重新上传"，清空状态，回到初始界面

---

## 四、页面结构

```
首页（单页应用）
├── Header：Logo + 产品名
├── Hero区：标题 + 副标题
├── 上传区：拖拽框（初始状态）
│   └── 处理区：原图/结果对比 + 下载按钮（处理后状态）
└── Footer：简单说明 + remove.bg attribution
```

---

## 五、Cloudflare Worker 接口

**POST** `/api/remove-bg`

- Request: `multipart/form-data`，字段名 `image_file`
- Response: 透明PNG二进制流（`image/png`）
- 错误：返回 JSON `{ error: "..." }`

Worker 职责：
1. 接收前端图片
2. 转发至 remove.bg API（携带 API Key，存于 Worker 环境变量）
3. 将结果直接返回给前端
4. API Key 不暴露给前端

---

## 六、非功能需求

| 项目 | 要求 |
|------|------|
| 响应时间 | 处理完成 < 10s（取决于remove.bg） |
| 隐私 | 图片不存储，处理完即丢弃 |
| 移动端 | 响应式，手机可用 |
| 浏览器兼容 | Chrome / Safari / Firefox 最新版 |

---

## 七、MVP 不做的事（Out of Scope）

- 用户注册/登录
- 历史记录
- 批量处理
- 付费/限额系统
- 图片编辑（裁剪、换背景等）

---

## 八、成功指标

- 用户能完成"上传→去背景→下载"完整流程
- 错误有提示，不白屏
- 移动端可正常使用

---

## 九、开发计划

| 阶段 | 内容 | 预计时间 |
|------|------|----------|
| Day 1 | 项目初始化 + 上传UI | 2h |
| Day 1 | Cloudflare Worker + remove.bg对接 | 2h |
| Day 2 | 结果展示 + 下载功能 | 2h |
| Day 2 | 样式打磨 + 移动端适配 | 2h |
| Day 3 | 部署到 Cloudflare Pages + 联调 | 1h |

**总计：约 1-2天可上线 MVP**
