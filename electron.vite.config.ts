// electron.vite.config.ts
// Electron-Vite 配置文件 - 支持 Vite 7

import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'electron-vite'

export default defineConfig({
  // 主进程配置 - externalizeDeps 默认启用
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/main.ts')
        },
        output: {
          format: 'cjs'
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
        },
        output: {
          format: 'cjs'
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
      'import.meta.env.VITE_ELECTRON': JSON.stringify('true')
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      }
    },
    // 网页版代理配置（浏览器访问时使用）
    server: {
      proxy: {
        '/api/ai': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai/, '/api')
        }
      }
    }
  }
})