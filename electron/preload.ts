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