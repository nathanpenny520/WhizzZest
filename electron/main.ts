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
      preload: join(__dirname, '../preload/index.cjs'),
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