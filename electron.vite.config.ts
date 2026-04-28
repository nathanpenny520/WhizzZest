// electron.vite.config.ts
// Electron-Vite 配置文件 - 支持 Vite 7

import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'electron-vite'

export default defineConfig({
  // 主进程配置
  main: {
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
    root: '.',
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