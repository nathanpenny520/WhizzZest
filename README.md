# 焰境·万载 - 万载文旅宣传网站

> 由北京高校在读生发起，AI技术赋能县域文旅数字化转型

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-green?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7.2-blue?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-cyan?logo=tailwindcss)
![Electron](https://img.shields.io/badge/Electron-33-blue?logo=electron)

## 📖 项目简介

**焰境·万载**是由北京高校在读生发起的现代化文旅宣传网站，致力于展示江西省万载县的：
- 🎆 **千年烟花文化** - 中国花炮之乡，1400多年历史
- 🍜 **特色美食特产** - 万载六大碗、罗城扎粉、万载剁肉等
- 🏛️ **非遗文化传承** - 花炮制作技艺、得胜鼓、开口傩、夏布织造
- 🗺️ **旅游资源导览** - 古城、竹山洞、九龙森林等景点，高德地图实时导航
- 🤖 **AI智能问答** - 基于本地知识库的文旅助手

### 项目愿景

成为万载文旅数字化转型和新媒体矩阵构建的标杆，让"焰境·万载"成为国内外游客了解万载的重要入口。未来计划将这一发展路径推广开来，打造成为县域经济实现破局发展的关键方案。

### 网站特色

| 功能 | 说明 |
|------|------|
| 中英双语 | 完整的国际化支持，一键切换语言 |
| PWA支持 | 可离线访问，支持安装到桌面 |
| 数字烟花 | Canvas实现的互动烟花体验 |
| 高德地图 | 真实驾车导航路线规划 |
| AI助手 | 基于RAG技术的智能问答系统 |
| 响应式设计 | 完美适配手机、平板、电脑 |
| SEO优化 | 完善的SEO配置，预渲染页面 |

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Vue 3.5 + TypeScript 5.9 |
| 构建工具 | Vite 7.2 |
| 桌面应用 | Electron 33 + electron-builder |
| UI样式 | Tailwind CSS 3.4 |
| 状态管理 | Zustand 4.5 |
| 国际化 | Vue I18n 11.2 |
| 地图服务 | 高德地图 JS API 2.0 |
| 图表 | Chart.js 4.5 |
| PWA | vite-plugin-pwa |
| 后端代理 | Express 5.2 |
| AI集成 | OpenAI兼容API + RAG |

---

## 🌐 Web版与Electron版架构对比

本项目采用**一套代码，两种运行模式**的设计：

| 特性 | Web版 | Electron版 |
|------|-------|------------|
| **运行环境** | 浏览器 | 桌面应用窗口 |
| **前端请求** | `/api/ai/chat` | `localhost:13001/api/chat` |
| **API转发** | Vite proxy → localhost:3001 | 直接请求内嵌后端 |
| **后端端口** | 3001 (独立进程) | 13001 (内嵌在应用内) |
| **后端启动** | 手动运行 `node server/index.js` | 自动启动 |
| **环境检测** | `window.electronAPI` 不存在 | `window.electronAPI.isElectron = true` |
| **知识库路径** | `server/knowledgeBase.json` | 打包时嵌入应用 |

### API请求流程

```
Web版:
浏览器 → /api/ai/chat → Vite Proxy → localhost:3001/api/chat → AI API

Electron版:
Electron窗口 → window.electronAPI检测 → localhost:13001/api/chat → AI API
```

### 配置文件说明

| 文件 | 用途 |
|------|------|
| `vite.config.ts` | Web版 Vite 配置（含 proxy） |
| `electron.vite.config.ts` | Electron 版配置（含 renderer proxy） |
| `electron/main.ts` | Electron 主进程入口 |
| `electron/preload.ts` | 预加载脚本（暴露 electronAPI） |
| `electron/backend.ts` | Electron 内嵌 Express 后端 |
| `server/index.js` | Web版独立后端服务 |
| `server/.env` | AI服务配置（两版共用） |

---

## 📁 项目结构

```
whizzzest/
├── src/                      # 前端源码
│   ├── pages/                # 页面组件
│   │   ├── HomePage.vue      # 首页
│   │   ├── CulturePage.vue   # 非遗文化页
│   │   ├── FoodPage.vue      # 美食特产页
│   │   ├── IndustryPage.vue  # 烟花产业页
│   │   ├── RoutesPage.vue    # 旅游线路页（高德导航）
│   │   ├── ViewingSpotsPage.vue # 赏烟地点页
│   │   ├── MapPage.vue       # 地图导览页（高德地图）
│   │   ├── MerchantPage.vue  # 商家展示页
│   │   ├── FireworkPage.vue  # 数字烟花页
│   │   └── AboutPage.vue     # 关于我们页
│   ├── components/           # 通用组件
│   │   ├── Navbar.vue        # 导航栏
│   │   ├── Footer.vue        # 页脚
│   │   ├── MusicPlayer.vue   # 音乐播放器
│   │   ├── BackToTop.vue     # 返回顶部
│   │   ├── LanguageSwitcher.vue # 语言切换
│   │   ├── AmapComponent.vue # 高德地图组件
│   │   ├── SeoHead.vue       # SEO头部组件
│   │   └── AIChat/           # AI聊天组件
│   │       ├── AIChatWidget.vue
│   │       ├── ChatBubble.vue
│   │       ├── ChatInput.vue
│   │       ├── ChatHeader.vue
│   │       └── AIChatButton.vue
│   ├── data/                 # 数据文件
│   │   └── locations.ts      # 景点坐标与路线数据
│   ├── composables/          # Vue组合式函数
│   │   ├── useAIChat.ts      # AI聊天状态管理
│   │   └── firework/         # 烟花效果
│   ├── api/                  # API调用
│   │   └── aiChat.ts         # AI聊天API（自动检测环境）
│   ├── types/                # TypeScript类型
│   │   └── aiChat.ts
│   ├── locales/              # 国际化配置
│   │   └── index.ts          # 中英双语文本
│   ├── assets/               # 静态资源
│   │   ├── images/           # 图片
│   │   ├── videos/           # 视频（本地存储，未提交到Git）
│   │   └── audio/            # 音频
│   ├── router/               # 路由配置
│   │   └── index.ts
│   ├── App.vue               # 根组件
│   ├── main.ts               # 入口文件
│   └── style.css             # 全局样式
│
├── electron/                 # Electron 专用代码（桌面应用）
│   ├── main.ts               # 主进程入口
│   ├── preload.ts            # 预加载脚本（暴露 electronAPI）
│   ├── backend.ts            # 内嵌 Express 后端
│   └── package.json          # 强制 CJS 模块格式
│
├── server/                   # 后端AI代理服务（Web版独立运行）
│   ├── index.js              # Express服务
│   ├── knowledgeBase.json    # 知识库数据(~68条)
│   ├── package.json          # 后端依赖
│   ├── .env.example          # 配置模板
│   └── .env                  # 实际配置(不提交)
│
├── public/                   # 公共资源
│   ├── favicon.svg           # 网站图标
│   ├── robots.txt            # SEO配置
│   ├── sitemap.xml           # 站点地图
│   └── icons/                # PWA图标及AI头像
│       └── Claude.svg        # Claude AI头像
│
├── .env                      # 前端环境变量（高德地图API）
├── vite.config.ts            # Web版 Vite配置
├── electron.vite.config.ts   # Electron版配置
├── tailwind.config.js        # Tailwind配置
├── tsconfig.json             # TypeScript配置
├── package.json              # 前端依赖
└── README.md                 # 本文档
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0

### 高德地图配置

本项目使用高德地图 JS API 2.0，需要配置API密钥：

1. 访问 [高德开放平台](https://lbs.amap.com/) 注册账号
2. 创建应用，选择「Web端(JS API)」
3. 获取 Key 和安全密钥（securityJsCode）

在项目根目录创建 `.env` 文件：

```bash
# 高德地图配置
VITE_AMAP_KEY=你的高德地图Key
VITE_AMAP_SECURITY_CODE=你的安全密钥
```

### 本地开发

#### 方式一：Web版开发

```bash
# 1. 克隆项目
git clone <repository-url>
cd whizzzest

# 2. 安装前端依赖
npm install

# 3. 配置高德地图API密钥（见上文）

# 4. 安装后端依赖
cd server && npm install && cd ..

# 5. 配置AI服务（可选）
cd server
cp .env.example .env
# 编辑.env，填写你的API配置：
# MODEL_NAME=你的模型名称
# API_KEY=你的API密钥
# BASE_URL=https://api.openai.com  # 或其他兼容API地址

# 6. 启动后端服务（在一个终端）
cd server && node index.js

# 7. 启动前端开发服务器（在另一个终端）
npm run dev
```

访问 http://localhost:5173 即可查看网站。

#### 方式二：Electron桌面应用开发

```bash
# 1-4. 同Web版步骤

# 5. 一键启动（含内嵌后端）
npm run dev:electron
```

Electron版会自动启动内嵌后端服务，无需手动运行 `server/index.js`。

**注意**：如果遇到 `ELECTRON_RUN_AS_NODE=1` 环境变量冲突（来自VSCode Dev Containers扩展），脚本会自动清除。

### 构建生产版本

#### Web版

```bash
npm run build
```

构建产物位于 `dist/` 目录。

#### Electron桌面应用

```bash
npm run build:electron
```

构建产物位于 `release/` 目录：
- macOS: `焰境·万载-{version}-darwin-{arch}.dmg`
- Windows: `焰境·万载 Setup {version}.exe`
- Linux: `焰境·万载-{version}.AppImage`

---

## 🔧 开发命令速查

```bash
# Web版开发
npm run dev              # 启动前端开发服务器 (localhost:5173)

# Electron版开发
npm run dev:electron     # 一键启动 Electron + 内嵌后端

# 构建
npm run build            # 构建Web版静态文件
npm run build:electron   # 构建桌面应用安装包

# 后端服务（Web版需要）
cd server && node index.js   # 启动独立后端 (localhost:3001)

# 测试API
curl http://localhost:3001/api/health    # Web版后端健康检查
curl http://localhost:13001/api/health   # Electron版后端健康检查
```

---

## 🗺️ 高德地图功能

### 功能说明

网站集成了高德地图 JS API 2.0，提供以下功能：

| 页面 | 功能 |
|------|------|
| 地图导览 | 景点标记、分类筛选、点击查看详情 |
| 旅游线路 | 真实驾车导航路线、途经点显示 |

### 景点坐标

已配置精确坐标的景点：

| 景点 | 经度 | 纬度 |
|------|------|------|
| 万载古城 | 114.445051 | 28.101914 |
| 万载中心 | 114.445477 | 28.106201 |
| 竹山洞 | 114.37412 | 28.047219 |
| 万载恒晖艺术农业 | 114.487751 | 28.227797 |
| 龙湖公园 | 114.440824 | 28.086949 |
| 仙源革命旧址 | 114.262963 | 28.297111 |
| 九龙原始森林 | 114.533321 | 28.327356 |
| 湘鄂赣革命纪念馆 | 114.452923 | 28.097942 |

### Electron版高德地图配置

Electron版本使用高德地图需要：
1. 登录 [高德开放平台控制台](https://console.amap.com/dev/key/app)
2. 在对应 Key 的域名白名单中添加 `file://`

---

## 🖥️ 服务器部署

### 架构说明

```
Ubuntu服务器
├── Nginx (端口80/443)
│   ├── 前端静态文件 (dist/)
│   └── API代理 /api/ai → localhost:3001
│
└── Node.js后端 (端口3001)
    └── AI代理服务 + 知识库RAG
```

### 部署步骤

详见原文档的服务器部署章节。

---

## 🤖 AI问答系统

### 功能说明

AI助手基于RAG（检索增强生成）技术，能够回答关于万载文旅的问题：
- 烟花文化历史
- 美食特产推荐
- 旅游景点介绍
- 非遗文化讲解
- 烟花观赏指南

### 配置说明

在 `server/.env` 中配置（Web版和Electron版共用）：

| 参数 | 说明 | 示例 |
|------|------|------|
| MODEL_NAME | AI模型名称 | `gpt-4o`, `deepseek-chat`, `MiniMax-M2.5` |
| API_KEY | API密钥 | `sk-xxx...` |
| BASE_URL | API基础地址 | `https://api.openai.com` |
| PORT | 服务端口（Web版） | `3001` |

支持的OpenAI兼容API：
- OpenAI
- DeepSeek (`https://api.deepseek.com`)
- 百度文心一言
- 阿里通义千问
- MiniMax
- 其他兼容API

### 知识库维护

知识库位于 `server/knowledgeBase.json`，包含约68条知识点。

---

## 📝 更新日志

### v1.7.0 (2026-04)
- 重构 Web版与Electron版架构，统一API路径
- Electron版自动加载 `server/.env` 环境变量
- 添加 Vite proxy 配置，浏览器访问Electron dev server时走Web版逻辑
- 修复 `ELECTRON_RUN_AS_NODE=1` 环境变量冲突问题
- preload脚本改为CJS格式以兼容Electron sandbox
- 一套代码两种运行模式：Web版和桌面版

### v1.6.0 (2026-04)
- 新增 Electron 桌面应用支持（macOS/Windows/Linux）
- 内嵌 Express 后端服务，桌面版无需额外启动后端
- 一套代码同时支持 Web 和桌面应用
- 添加 .npmrc 配置国内镜像加速依赖下载

### v1.5.0 (2026-04)
- 新增"关于我们"页面，展示团队信息
- 团队成员扩展至6人（含AI赋能助手Claude）
- 新增多渠道联系方式：抖音、微信视频号、小红书

### v1.4.0 (2026-04)
- 集成高德地图 JS API 2.0
- 旅游线路页面支持真实驾车导航路线

### v1.3.0 (2026-04)
- 重构数字烟花页面
- 烟花效果优化

### v1.2.0 (2026-04)
- 新增AI智能问答系统
- 基于RAG技术的知识库检索

### v1.0.0
- 项目初始化
- 中英双语支持
- PWA功能

---

## 📞 联系方式

- **官方网站**：https://whizzzest-yanjingwanzai.top
- **电子邮箱**：whizzzest@outlook.com
- **官方抖音**：焰境·万载
- **微信公众号**：云上万载-焰遇乡旅

---

> 一朝相逢，便是万载 🎆