---
name: Electron 双模式架构设计
description: 为焰境·万载项目添加 Electron 桌面应用支持，同时保留原有 Web 版本
type: project
---

# 焰境·万载 Electron 双模式架构设计

## 背景

焰境·万载是一个 Vue 3 + Vite + TypeScript 的文旅宣传网站，目前仅支持 Web 部署。用户希望同时支持：
1. Web 版本 - 继续部署到 GitHub Pages/服务器
2. Electron 桌面版本 - 提供 macOS/Windows/Linux 安装包

核心需求：
- 一套代码，两种输出模式
- Electron 版本内嵌 AI 后端服务
- 支持部分离线功能（地图和 AI 需联网）

---

## 架构设计

### 项目结构

```
whizzzest/
├── src/                        # Vue 前端代码（共享，几乎不变）
├── electron/                   # Electron 专用代码（新增）
│   ├── main.ts               # 主进程入口
│   ├── preload.ts            # 预加载脚本（安全桥接）
│   └── backend.ts            # 内嵌 Express 服务
├── server/                     # AI 后端（共享）
├── public/                     # 静态资源（共享）
├── scripts/                    # 构建脚本
├── vite.config.ts             # 扩展支持双模式
├── electron-builder.yml        # Electron 打包配置（新增）
└── package.json               # 统一依赖和脚本
```

### Electron 主进程架构

```
┌─────────────────────────────────────────────────────────┐
│                    Electron 主进程                       │
├─────────────────────────────────────────────────────────┤
│  1. 启动内嵌 Express 后端 (端口随机或固定)                │
│  2. 创建 BrowserWindow                                  │
│  3. 加载前端页面 (开发: localhost:5173, 生产: file://)   │
│  4. 注入环境变量 (VITE_ELECTRON=true, API地址)          │
│  5. 窗口管理 (关闭、最小化、托盘等)                       │
└─────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   Express 后端 (内嵌)                    │
├─────────────────────────────────────────────────────────┤
│  • 复用 server/index.js 逻辑                            │
│  • AI 聊天 API                                          │
│  • 监听固定端口 13001                                    │
│  • 仅监听 localhost，外部不可访问                        │
└─────────────────────────────────────────────────────────┘
```

---

## 运行和构建命令

### package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && node scripts/prerender.js",
    "preview": "vite preview",

    "dev:electron": "electron-vite dev",
    "build:electron": "electron-vite build && electron-builder",
    "preview:electron": "electron-vite preview"
  }
}
```

### 开发流程

| 命令 | 用途 | 说明 |
|------|------|------|
| `npm run dev` | 网页开发 | Vite 热更新，localhost:5173 |
| `npm run dev:electron` | Electron 开发 | 启动 Electron 窗口 + 内嵌后端 |
| `npm run build` | 构建网页版 | 输出到 dist/，部署到服务器 |
| `npm run build:electron` | 构建 Electron | 输出安装包 |

---

## 前端环境适配

### 环境变量

**新增文件 `.env.electron`**：

```
VITE_ELECTRON=true
VITE_API_BASE=http://localhost:13001/api/ai
```

### API 请求适配

修改 `src/api/aiChat.ts`：

```typescript
// 根据环境自动选择 API 地址
const API_BASE = import.meta.env.VITE_ELECTRON
  ? 'http://localhost:13001/api/ai'    // Electron: 内嵌后端
  : '/api/ai';                           // Web: 通过代理或远程服务器
```

### 高德地图白名单

需要在高德控制台添加：
```
file://
```

---

## 打包配置

### electron-builder.yml

```yaml
appId: com.whizzzest.yanjingwanzai
productName: 焰境·万载
directories:
  output: release

mac:
  category: public.app-category.travel
  icon: public/icon.icns
  target:
    - dmg
    - zip

win:
  icon: public/icon.ico
  target:
    - nsis
    - portable

linux:
  icon: public/icon.png
  target:
    - AppImage
    - deb

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
```

### 输出产物

| 平台 | 文件格式 | 说明 |
|------|----------|------|
| macOS | `.dmg`, `.zip` | 支持 Intel 和 Apple Silicon |
| Windows | `.exe` (安装包), `.exe` (便携版) | 64位 |
| Linux | `.AppImage`, `.deb` | 通用 |

---

## 依赖变更

### 新增依赖

```json
{
  "devDependencies": {
    "electron": "^33.x",
    "electron-vite": "^2.x",
    "electron-builder": "^25.x"
  }
}
```

### 依赖说明

| 依赖 | 版本 | 用途 |
|------|------|------|
| `electron` | ^33.x | Electron 核心 |
| `electron-vite` | ^2.x | Vite + Electron 集成工具 |
| `electron-builder` | ^25.x | 打包分发工具 |

---

## 实施难度评估

| 模块 | 难度 | 工作量 | 风险 |
|------|------|--------|------|
| Electron 主进程 | ⭐⭐ | 中 | 低 |
| 内嵌 Express 后端 | ⭐⭐ | 中 | 低 |
| Vite 双模式配置 | ⭐⭐ | 中 | 低 |
| 前端环境适配 | ⭐ | 小 | 低 |
| 打包配置 | ⭐⭐ | 中 | 中（图标需准备） |
| 高德地图适配 | ⭐ | 小 | 低 |
| 测试验证 | ⭐⭐ | 中 | 中 |

**总体评估**：

| 项目 | 评估 |
|------|------|
| **难度** | ⭐⭐ 中等 |
| **预计工时** | 4-6 小时 |
| **主要风险** | 打包跨平台测试、图标资源准备 |
| **代码改动量** | 新增 ~500 行，修改 ~50 行 |

---

## 前置准备清单

### 用户需提前准备

- [ ] 应用图标：
  - `.icns` (macOS) - 512x512 像素以上
  - `.ico` (Windows) - 256x256 像素以上
  - `.png` (Linux) - 512x512 像素以上
- [ ] 高德地图控制台添加 `file://` 到白名单

### 实施时处理

- [ ] 更新 README.md 添加 Electron 相关说明
- [ ] 添加 `.gitignore` 规则忽略 release/ 目录

---

## 网络状态处理

**部分离线策略**：
- 核心页面内容（文旅介绍）离线可用
- 地图功能：离线时显示提示，隐藏地图组件
- AI 聊天：离线时显示"服务暂时不可用"提示

**可选实现**：新增 `src/composables/useOnlineStatus.ts` 检测网络状态。