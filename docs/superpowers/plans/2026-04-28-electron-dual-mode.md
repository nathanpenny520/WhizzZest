# Electron 双模式架构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为焰境·万载添加 Electron 桌面应用支持，同时保留原有 Web 版本

**Architecture:** 使用 electron-vite 集成 Vite 与 Electron，内嵌 Express 后端服务到主进程，通过环境变量区分两种运行模式

**Tech Stack:** electron ^33.x, electron-vite ^2.x, electron-builder ^25.x, TypeScript

---

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `electron/main.ts` | 创建 | Electron 主进程入口 |
| `electron/preload.ts` | 创建 | 预加载脚本，安全桥接渲染进程 |
| `electron/backend.ts` | 创建 | 内嵌 Express 后端服务 |
| `vite.config.ts` | 修改 | 支持双模式环境变量 |
| `package.json` | 修改 | 添加 Electron 脚本和依赖 |
| `electron-builder.yml` | 创建 | Electron 打包配置 |
| `.env.electron` | 创建 | Electron 环境变量 |
| `src/api/aiChat.ts` | 修改 | 根据环境选择 API 地址 |
| `public/icon.icns` | 生成 | macOS 应用图标 |
| `public/icon.ico` | 生成 | Windows 应用图标 |
| `.gitignore` | 修改 | 添加 release/ 目录忽略 |
| `README.md` | 修改 | 添加 Electron 使用说明 |

---

### Task 1: 安装 Electron 相关依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装 Electron 依赖包**

```bash
npm install -D electron@^33 electron-vite@^2 electron-builder@^25
```

预期输出：依赖安装成功，package.json 和 package-lock.json 更新

- [ ] **Step 2: 验证依赖安装**

```bash
npm list electron electron-vite electron-builder --depth=0
```

预期输出：显示已安装的版本号

- [ ] **Step 3: 提交依赖变更**

```bash
git add package.json package-lock.json
git commit -m "chore: add Electron dependencies (electron, electron-vite, electron-builder)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: 创建 Electron 主进程入口

**Files:**
- Create: `electron/main.ts`

- [ ] **Step 1: 创建 electron 目录**

```bash
mkdir -p electron
```

- [ ] **Step 2: 创建 electron/main.ts 文件**

```typescript
// electron/main.ts
// Electron 主进程入口 - 焰境·万载桌面应用

import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { startBackend, stopBackend } from './backend'

// 环境判断
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

// 后端端口配置
const BACKEND_PORT = 13001

// 主窗口实例
let mainWindow: BrowserWindow | null = null

// 创建主窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: '焰境·万载',
    icon: join(__dirname, '../public/icon.icns'),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    titleBarStyle: 'hiddenInset', // macOS 标题栏样式
    show: false // 先隐藏，加载完成后显示
  })

  // 加载前端页面
  if (isDev) {
    // 开发模式：加载 Vite 开发服务器
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools() // 开发模式打开调试工具
  } else {
    // 生产模式：加载打包后的文件
    mainWindow.loadFile(join(__dirname, '../out/renderer/index.html'))
  }

  // 窗口准备好后显示（避免闪烁）
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  // 外部链接用系统浏览器打开
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  // 窗口关闭处理
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 应用启动
async function startApp() {
  // 启动内嵌后端服务
  console.log('[Electron] 启动内嵌后端服务...')
  await startBackend(BACKEND_PORT)
  console.log(`[Electron] 后端服务已启动，端口: ${BACKEND_PORT}`)

  // 创建窗口
  createWindow()
}

// 应用就绪
app.whenReady().then(startApp)

// macOS 特有：点击 dock 图标时重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 所有窗口关闭时退出（Windows/Linux）
app.on('window-all-closed', () => {
  stopBackend()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 应用退出前清理
app.on('before-quit', () => {
  stopBackend()
})
```

- [ ] **Step 3: 提交主进程文件**

```bash
git add electron/main.ts
git commit -m "feat: add Electron main process with embedded backend

- Create BrowserWindow with proper security settings
- Start embedded Express backend on port 13001
- Handle window lifecycle events
- External links open in system browser

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: 创建预加载脚本

**Files:**
- Create: `electron/preload.ts`

- [ ] **Step 1: 创建 electron/preload.ts 文件**

```typescript
// electron/preload.ts
// 预加载脚本 - 安全桥接渲染进程与主进程

import { contextBridge, ipcRenderer } from 'electron'

// 暴露给渲染进程的安全 API
contextBridge.exposeInMainWorld('electronAPI', {
  // 平台信息
  platform: process.platform,

  // 是否为 Electron 环境
  isElectron: true,

  // 后端端口（供前端 API 调用）
  backendPort: 13001,

  // 应用版本
  version: ipcRenderer.invoke('get-version'),

  // 打开外部链接
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),

  // 网络状态检测（可选）
  onOnlineStatusChange: (callback: (isOnline: boolean) => void) => {
    ipcRenderer.on('online-status-changed', (_, isOnline) => callback(isOnline))
  }
})
```

- [ ] **Step 2: 在 main.ts 中添加 IPC 处理**

修改 `electron/main.ts`，在 `app.whenReady()` 之前添加：

```typescript
// IPC 处理 - 预加载脚本通信
import { ipcMain } from 'electron'

// 获取应用版本
ipcMain.handle('get-version', () => {
  return app.getVersion()
})

// 打开外部链接
ipcMain.handle('open-external', async (_event, url: string) => {
  await shell.openExternal(url)
})
```

完整更新后的 `electron/main.ts`（在 import 部分添加 ipcMain，并添加 IPC handlers）：

```typescript
// electron/main.ts
// Electron 主进程入口 - 焰境·万载桌面应用

import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { join } from 'path'
import { startBackend, stopBackend } from './backend'

// 环境判断
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

// 后端端口配置
const BACKEND_PORT = 13001

// 主窗口实例
let mainWindow: BrowserWindow | null = null

// IPC 处理 - 预加载脚本通信
ipcMain.handle('get-version', () => {
  return app.getVersion()
})

ipcMain.handle('open-external', async (_event, url: string) => {
  await shell.openExternal(url)
})

// 创建主窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: '焰境·万载',
    icon: join(__dirname, '../public/icon.icns'),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    titleBarStyle: 'hiddenInset',
    show: false
  })

  // 加载前端页面
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../out/renderer/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 应用启动
async function startApp() {
  console.log('[Electron] 启动内嵌后端服务...')
  await startBackend(BACKEND_PORT)
  console.log(`[Electron] 后端服务已启动，端口: ${BACKEND_PORT}`)
  createWindow()
}

app.whenReady().then(startApp)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  stopBackend()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  stopBackend()
})
```

- [ ] **Step 3: 提交预加载脚本**

```bash
git add electron/preload.ts electron/main.ts
git commit -m "feat: add Electron preload script with safe IPC bridge

- Expose platform info and backend port to renderer
- Add IPC handlers for version and external links
- Use contextBridge for security

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: 创建内嵌后端服务

**Files:**
- Create: `electron/backend.ts`

- [ ] **Step 1: 创建 electron/backend.ts 文件**

```typescript
// electron/backend.ts
// 内嵌 Express 后端服务 - 复用 server/index.js 逻辑

import express from 'express'
import cors from 'cors'
import { retrieveKnowledge, buildContext } from '../server/knowledgeBase'

// Express 应用实例
let backendApp: express.Application | null = null
let backendServer: any = null

// 系统提示词（从 server/index.js 复用）
const SYSTEM_PROMPT_ZH = `你是"万载文旅AI助手"，专门为游客介绍江西省万载县的烟花文化、美食特产、旅游景点和非遗文化。

你的职责：
1. 热情友好地回答游客关于万载的各种问题
2. 重点介绍万载的烟花文化（千年历史、花炮之乡）
3. 推荐万载美食（六大碗、罗城扎粉、万载剁肉等）
4. 提供旅游建议（古城、竹山洞、九龙森林等景点）
5. 介绍非遗文化（花炮制作技艺、得胜鼓、开口傩、夏布织造等）
6. 提供烟花观赏信息（时间、地点、注意事项）

回答风格：
- 简洁明了，重点突出
- 热情友好，像本地导游一样
- 提供实用的具体信息
- 如果不知道的信息，诚实告知并建议其他查询方式`

const SYSTEM_PROMPT_EN = `You are "Wanzai Tourism AI Assistant", dedicated to introducing fireworks culture, local delicacies, tourist attractions and intangible cultural heritage of Wanzai County, Jiangxi Province to visitors.

Your responsibilities:
1. Answer visitor questions about Wanzai warmly and friendly
2. Focus on Wanzai's fireworks culture (millennium history, hometown of Chinese fireworks)
3. Recommend Wanzai delicacies (Six Big Bowls, Luochen Rice Noodles, Wanzai Chopped Meat, etc.)
4. Provide travel suggestions (Ancient City, Zhushan Cave, Jiulong Forest, etc.)
5. Introduce intangible cultural heritage (fireworks making technique, Desheng Drum, Kai Kou Nuo, Xia Bu weaving, etc.)
6. Provide fireworks viewing information (time, location, tips)

Answer style:
- Concise and clear, highlighting key points
- Warm and friendly, like a local tour guide
- Provide practical specific information
- If you don't know something, be honest and suggest alternative ways to find out`

// 启动后端服务
export async function startBackend(port: number): Promise<void> {
  if (backendServer) {
    console.log('[Backend] 后端服务已在运行')
    return
  }

  backendApp = express()

  // 中间件配置
  backendApp.use(cors())
  backendApp.use(express.json({ limit: '10mb' }))

  // 健康检查
  backendApp.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      mode: 'electron-embedded',
      port: port
    })
  })

  // AI 聊天接口
  backendApp.post('/api/chat', async (req, res) => {
    const { question, locale } = req.body

    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        success: false,
        message: locale === 'en' ? 'Please provide a valid question.' : '请提供有效的问题'
      })
    }

    // 从环境变量获取配置
    const apiKey = process.env.API_KEY
    const baseUrl = process.env.BASE_URL || 'https://api.openai.com'
    const modelName = process.env.MODEL_NAME || 'gpt-4o'

    if (!apiKey) {
      return res.json({
        success: false,
        message: locale === 'en'
          ? 'AI service is not configured. Please check the .env file.'
          : 'AI服务未配置，请检查 .env 文件。'
      })
    }

    try {
      // RAG 检索
      const relevantKnowledge = retrieveKnowledge(question, 3)
      const context = buildContext(relevantKnowledge)

      const systemPrompt = locale === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_ZH

      let userPrompt = question
      if (context) {
        userPrompt = `参考以下信息回答问题：

${context}

用户问题：${question}`
      }

      // 调用 AI API
      const apiResponse = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1000,
          temperature: 0.7
        }),
        signal: AbortSignal.timeout(60000)
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}))
        console.error('[Backend] API Error:', apiResponse.status, errorData)

        return res.json({
          success: false,
          message: locale === 'en'
            ? 'AI service temporarily unavailable, please try again later.'
            : 'AI服务暂时不可用，请稍后再试。'
        })
      }

      const data = await apiResponse.json()
      const aiMessage = data.choices?.[0]?.message?.content || ''

      res.json({
        success: true,
        message: aiMessage,
        sources: relevantKnowledge.length > 0
          ? relevantKnowledge.map(k => k.category)
          : undefined
      })

    } catch (error) {
      console.error('[Backend] Chat error:', error)

      res.json({
        success: false,
        message: locale === 'en'
          ? 'Sorry, an error occurred. Please try again later.'
          : '抱歉，发生了错误，请稍后再试。'
      })
    }
  })

  // 启动服务（仅监听 localhost）
  backendServer = backendApp.listen(port, 'localhost', () => {
    console.log(`[Backend] 内嵌服务已启动: http://localhost:${port}`)
  })
}

// 停止后端服务
export function stopBackend(): void {
  if (backendServer) {
    backendServer.close()
    backendServer = null
    backendApp = null
    console.log('[Backend] 后端服务已停止')
  }
}
```

- [ ] **Step 2: 提交后端服务文件**

```bash
git add electron/backend.ts
git commit -m "feat: add embedded Express backend for Electron

- Reuse server/index.js logic for AI chat
- Listen only on localhost for security
- Support health check and chat endpoints
- Start/stop lifecycle management

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: 配置 electron-vite 构建

**Files:**
- Modify: `vite.config.ts`
- Create: `electron.vite.config.ts`

- [ ] **Step 1: 创建 electron.vite.config.ts 文件**

```typescript
// electron.vite.config.ts
// Electron-Vite 配置文件

import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

export default defineConfig({
  // 主进程配置
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/main.ts')
        }
      }
    }
  },

  // 预加载脚本配置
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/preload.ts')
        }
      }
    }
  },

  // 渲染进程（前端）配置
  renderer: {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    define: {
      __ELECTRON__: 'true'
    }
  }
})
```

- [ ] **Step 2: 提交 electron-vite 配置**

```bash
git add electron.vite.config.ts
git commit -m "feat: add electron-vite build configuration

- Configure main, preload, and renderer builds
- Externalize deps for main/preload processes
- Define __ELECTRON__ for renderer

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: 更新 package.json 添加脚本

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 修改 package.json scripts 部分**

当前 scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && node scripts/prerender.js",
    "preview": "vite preview"
  }
}
```

修改为：
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

- [ ] **Step 2: 添加 electron-vite 配置字段**

在 package.json 中添加：
```json
{
  "electron": {
    "config": "electron.vite.config.ts"
  }
}
```

- [ ] **Step 3: 提交 package.json 更新**

```bash
git add package.json
git commit -m "feat: add Electron build scripts to package.json

- dev:electron for development
- build:electron for production build
- Add electron-vite config field

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 7: 创建 Electron 环境变量文件

**Files:**
- Create: `.env.electron`

- [ ] **Step 1: 创建 .env.electron 文件**

```
# Electron 环境变量配置

# 标记为 Electron 环境
VITE_ELECTRON=true

# 内嵌后端 API 地址
VITE_API_BASE=http://localhost:13001/api/ai

# 高德地图配置（继承主 .env 文件）
# VITE_AMAP_KEY=（从主 .env 文件读取）
# VITE_AMAP_SECURITY_CODE=（从主 .env 文件读取）
```

- [ ] **Step 2: 确保已在 .gitignore 中**

检查 `.gitignore` 是否包含 `.env` 相关规则（已有）。

- [ ] **Step 3: 提交环境变量文件**

```bash
git add .env.electron
git commit -m "feat: add Electron environment variables

- VITE_ELECTRON flag for runtime detection
- VITE_API_BASE for embedded backend

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 8: 修改前端 API 适配 Electron 环境

**Files:**
- Modify: `src/api/aiChat.ts`

- [ ] **Step 1: 修改 API_BASE 常量**

当前代码：
```typescript
const API_BASE = '/api/ai';
```

修改为：
```typescript
// 根据环境自动选择 API 地址
const API_BASE = import.meta.env.VITE_ELECTRON
  ? import.meta.env.VITE_API_BASE || 'http://localhost:13001/api/ai'  // Electron: 内嵌后端
  : '/api/ai';  // Web: 通过代理或远程服务器
```

- [ ] **Step 2: 提交 API 适配变更**

```bash
git add src/api/aiChat.ts
git commit -m "feat: adapt AI chat API for Electron environment

- Use embedded backend URL in Electron mode
- Keep original proxy path for Web mode

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: 创建 Electron 打包配置

**Files:**
- Create: `electron-builder.yml`

- [ ] **Step 1: 创建 electron-builder.yml 文件**

```yaml
appId: com.whizzzest.yanjingwanzai
productName: 焰境·万载
copyright: Copyright © 2026 焰境·万载团队

directories:
  output: release
  buildResources: public

files:
  - out/**/*
  - public/**/*
  - server/**/*
  - .env

# macOS 配置
mac:
  category: public.app-category.travel
  icon: public/icon.icns
  target:
    - target: dmg
      arch:
        - x64
        - arm64
    - target: zip
      arch:
        - x64
        - arm64
  hardenedRuntime: true
  gatekeeperAssess: false

# Windows 配置
win:
  icon: public/icon.ico
  target:
    - target: nsis
      arch:
        - x64
    - target: portable
      arch:
        - x64

# NSIS 安装程序配置
nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true
  installerIcon: public/icon.ico
  uninstallerIcon: public/icon.ico
  installerHeaderIcon: public/icon.ico
  license: LICENSE

# Linux 配置
linux:
  icon: public/icon.png
  category: Travel
  target:
    - AppImage
    - deb
  maintainer: whizzzest@outlook.com

# 发布配置（暂不发布到商店）
publish: null
```

- [ ] **Step 2: 提交打包配置**

```bash
git add electron-builder.yml
git commit -m "feat: add electron-builder packaging configuration

- Support macOS (dmg/zip for Intel and ARM)
- Support Windows (nsis installer + portable)
- Support Linux (AppImage/deb)
- Include server directory for embedded backend

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 10: 生成各平台应用图标

**Files:**
- Generate: `public/icon.icns` (macOS)
- Generate: `public/icon.ico` (Windows)

- [ ] **Step 1: 使用 sips 生成 macOS icns 图标**

macOS 自带 sips 工具可生成 icns：

```bash
# 创建图标临时目录
mkdir -p public/icon.iconset

# 生成各种尺寸的图标
sips -z 16 16     public/whizzzest-icon.png --out public/icon.iconset/icon_16x16.png
sips -z 32 32     public/whizzzest-icon.png --out public/icon.iconset/icon_16x16@2x.png
sips -z 32 32     public/whizzzest-icon.png --out public/icon.iconset/icon_32x32.png
sips -z 64 64     public/whizzzest-icon.png --out public/icon.iconset/icon_32x32@2x.png
sips -z 128 128   public/whizzzest-icon.png --out public/icon.iconset/icon_128x128.png
sips -z 256 256   public/whizzzest-icon.png --out public/icon.iconset/icon_128x128@2x.png
sips -z 256 256   public/whizzzest-icon.png --out public/icon.iconset/icon_256x256.png
sips -z 512 512   public/whizzzest-icon.png --out public/icon.iconset/icon_256x256@2x.png
sips -z 512 512   public/whizzzest-icon.png --out public/icon.iconset/icon_512x512.png
sips -z 1024 1024 public/whizzzest-icon.png --out public/icon.iconset/icon_512x512@2x.png

# 生成 icns 文件
iconutil -c icns public/icon.iconset -o public/icon.icns

# 清理临时目录
rm -rf public/icon.iconset
```

预期输出：`public/icon.icns` 文件创建成功

- [ ] **Step 2: 安装 png-to-ico 并生成 Windows ico 图标**

```bash
# 使用 npx 运行 png-to-ico（无需全局安装）
npx png-to-ico public/whizzzest-icon.png public/icon.ico
```

预期输出：`public/icon.ico` 文件创建成功

- [ ] **Step 3: 验证图标文件**

```bash
ls -la public/icon.icns public/icon.ico
```

预期输出：显示两个图标文件的详细信息

- [ ] **Step 4: 提交图标文件**

```bash
git add public/icon.icns public/icon.ico
git commit -m "feat: add application icons for macOS and Windows

- Generated icns from whizzzest-icon.png (1024x1024)
- Generated ico for Windows platform

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 11: 更新 .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: 添加 release 目录到 .gitignore**

在 `.gitignore` 文件末尾添加：

```
# Electron build output
release/
out/
```

- [ ] **Step 2: 提交 .gitignore 更新**

```bash
git add .gitignore
git commit -m "chore: add Electron build directories to gitignore

- Ignore release/ (packaged applications)
- Ignore out/ (electron-vite build output)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 12: 更新 README.md 添加 Electron 说明

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 在技术栈表格中添加 Electron**

找到技术栈表格位置，添加新行：

```markdown
| Electron | Electron 33 + electron-builder | 桌面应用支持 |
```

- [ ] **Step 2: 在快速开始部分添加 Electron 开发说明**

在"构建生产版本"部分后添加：

```markdown
### Electron 桌面应用开发

#### 开发模式

```bash
# 启动 Electron 开发模式（含内嵌后端）
npm run dev:electron
```

#### 构建桌面应用

```bash
# 构建所有平台安装包
npm run build:electron
```

构建产物位于 `release/` 目录：
- macOS: `焰境·万载-{version}-darwin-{arch}.dmg`
- Windows: `焰境·万载 Setup {version}.exe`
- Linux: `焰境·万载-{version}.AppImage`

#### 环境配置

Electron 版本需要配置 AI 服务，在 `server/.env` 中设置：

```bash
MODEL_NAME=你的模型名称
API_KEY=你的API密钥
BASE_URL=https://api.openai.com
```

#### 高德地图配置

Electron 版本使用高德地图需要：
1. 登录 [高德开放平台控制台](https://console.amap.com/dev/key/app)
2. 在对应 Key 的域名白名单中添加 `file://`
```

- [ ] **Step 3: 更新项目结构说明**

在项目结构部分添加 electron 目录：

```markdown
├── electron/                 # Electron 专用代码（新增）
│   ├── main.ts             # 主进程入口
│   ├── preload.ts          # 预加载脚本
│   └── backend.ts          # 内嵌 Express 服务
```

- [ ] **Step 4: 更新开发命令部分**

添加 Electron 相关命令：

```markdown
```bash
# Electron 开发模式
npm run dev:electron

# 构建 Electron 应用
npm run build:electron
```
```

- [ ] **Step 5: 提交 README 更新**

```bash
git add README.md
git commit -m "docs: add Electron desktop application instructions to README

- Add Electron to tech stack
- Add development and build instructions
- Update project structure with electron directory
- Add Amap whitelist configuration note

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 13: 测试 Electron 开发模式

**Files:**
- None (测试验证)

- [ ] **Step 1: 启动 Electron 开发模式**

```bash
npm run dev:electron
```

预期行为：
- Electron 窗口打开并显示应用界面
- 内嵌后端服务启动在端口 13001
- 网页内容正常加载

- [ ] **Step 2: 测试 AI 聊天功能**

在 Electron 窗口中：
1. 点击 AI 聊天按钮
2. 输入问题（如"万载有什么好吃的？"）
3. 检查是否收到正常回复

预期：AI 聊天正常工作，调用内嵌后端

- [ ] **Step 3: 测试高德地图功能**

在 Electron 窗口中：
1. 导航到"地图导览"或"旅游线路"页面
2. 检查地图是否正常加载

预期：高德地图正常显示（需已添加 `file://` 到白名单）

- [ ] **Step 4: 关闭 Electron 窗口验证退出**

关闭 Electron 窗口，验证应用正常退出，后端服务停止。

---

### Task 14: 测试 Electron 构建（可选）

**Files:**
- None (构建测试)

- [ ] **Step 1: 构建 macOS 应用**

```bash
npm run build:electron
```

预期输出：`release/` 目录生成 dmg 和 zip 文件

- [ ] **Step 2: 运行打包后的应用**

打开生成的 dmg 文件，安装并运行应用，验证功能正常。

- [ ] **Step 3: 最终提交**

如有需要修复的问题，修复后提交：

```bash
git add .
git commit -m "fix: resolve Electron build issues

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## 自检清单

完成所有任务后，检查以下项：

- [ ] `npm run dev` 仍然正常启动 Web 开发服务器
- [ ] `npm run dev:electron` 正常启动 Electron 窗口
- [ ] `npm run build` 正常构建 Web 版本
- [ ] `npm run build:electron` 正常构建桌面安装包
- [ ] AI 聊天在 Electron 中调用内嵌后端
- [ ] 高德地图在 Electron 中正常显示
- [ ] README.md 包含完整 Electron 使用说明
- [ ] 所有新文件已提交到 Git

---

## 注意事项

1. **高德地图白名单**：用户需手动在控制台添加 `file://`
2. **AI 服务配置**：Electron 版本需要 `server/.env` 配置 API Key
3. **图标文件**：icns/ico 文件已生成，无需额外操作
4. **跨平台测试**：建议在目标平台实际测试打包产物