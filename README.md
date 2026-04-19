# 焰境·万载 - 万载文旅宣传网站

> 由北京高校在读生发起，AI技术赋能县域文旅数字化转型

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-green?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7.2-blue?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-cyan?logo=tailwindcss)

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
| UI样式 | Tailwind CSS 3.4 |
| 状态管理 | Zustand 4.5 |
| 国际化 | Vue I18n 11.2 |
| 地图服务 | 高德地图 JS API 2.0 |
| 图表 | Chart.js 4.5 |
| PWA | vite-plugin-pwa |
| 后端代理 | Express 4.18 |
| AI集成 | OpenAI兼容API + RAG |

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
│   │   └── aiChat.ts         # AI聊天API
│   ├── types/                # TypeScript类型
│   │   └── aiChat.ts
│   ├── locales/              # 国际化配置
│   │   └── index.ts          # 中英双语文本
│   ├── assets/               # 静态资源
│   │   ├── images/           # 图片
│   │   ├── videos/           # 视频
│   │   └── audio/            # 音频
│   ├── router/               # 路由配置
│   │   └── index.ts
│   ├── App.vue               # 根组件
│   ├── main.ts               # 入口文件
│   └── style.css             # 全局样式
│
├── server/                   # 后端AI代理服务
│   ├── index.js              # Express服务
│   ├── knowledgeBase.js      # 知识库数据(~40条)
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
├── vite.config.ts            # Vite配置
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

```bash
# 1. 克隆项目
git clone <repository-url>
cd whizzzest

# 2. 安装前端依赖
npm install

# 3. 配置高德地图API密钥
# 在项目根目录创建 .env 文件，填写：
# VITE_AMAP_KEY=你的Key
# VITE_AMAP_SECURITY_CODE=你的安全密钥

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

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录。

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

### 驾车路线规划

旅游线路页面使用 `AMap.Driving` 插件实现真实导航路线：
- 路线沿实际道路绘制，而非直线连接
- 支持途经点设置
- 显示起点、终点和中间站点标记
- 自动调整地图视野

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

#### 1. 服务器环境准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js (使用nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 安装PM2（进程管理器）
npm install -g pm2

# 安装Nginx
sudo apt install nginx -y
```

#### 2. 上传项目文件

**方式一：使用git clone**

```bash
git clone <repository-url> /var/www/whizzzest
cd /var/www/whizzzest
npm install
npm run build
```

**方式二：使用scp上传已构建文件**

```bash
# 在本地机器上构建
npm run build

# 上传到服务器
scp -r dist/ server/ package.json package-lock.json user@your-server:/var/www/whizzzest/
scp .env user@your-server:/var/www/whizzzest/
```

#### 3. 配置环境变量

在服务器上创建 `.env` 文件：

```bash
cd /var/www/whizzzest
nano .env
```

写入以下内容：

```bash
# 高德地图配置（必须）
VITE_AMAP_KEY=你的高德地图Key
VITE_AMAP_SECURITY_CODE=你的安全密钥
```

#### 4. 构建前端

```bash
cd /var/www/whizzzest
npm install
npm run build
```

构建完成后，静态文件位于 `dist/` 目录。

#### 5. 配置后端服务

```bash
cd /var/www/whizzzest/server

# 安装依赖
npm install

# 创建配置文件
cp .env.example .env
nano .env  # 编辑填写API配置
```

后端 `.env` 配置：

```bash
# AI服务配置
MODEL_NAME=gpt-4o
API_KEY=sk-your-api-key
BASE_URL=https://api.openai.com
PORT=3001
```

```bash
# 使用PM2启动服务
pm2 start index.js --name "wanzai-ai"

# 设置开机自启
pm2 startup
pm2 save
```

#### 6. 配置Nginx

```bash
# 创建Nginx配置
sudo nano /etc/nginx/sites-available/whizzzest
```

写入以下内容：

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name whizzzest-yanjingwanzai.top www.whizzzest-yanjingwanzai.top;

    # SSL证书配置（使用Let's Encrypt）
    ssl_certificate /etc/letsencrypt/live/whizzzest-yanjingwanzai.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/whizzzest-yanjingwanzai.top/privkey.pem;

    # 前端静态文件
    root /var/www/whizzzest/dist;
    index index.html;

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # AI API代理
    location /api/ai/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|mp3|mp4)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # 安全头
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/whizzzest /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载Nginx
sudo systemctl reload nginx
```

#### 7. 配置SSL证书（推荐）

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书
sudo certbot --nginx -d whizzzest-yanjingwanzai.top -d www.whizzzest-yanjingwanzai.top

# 自动续期
sudo certbot renew --dry-run
```

#### 8. 验证部署

```bash
# 检查服务状态
pm2 status
sudo systemctl status nginx

# 测试API
curl http://localhost:3001/api/health

# 测试网站
curl -I https://whizzzest-yanjingwanzai.top
```

### 常用运维命令

```bash
# 查看后端日志
pm2 logs wanzai-ai

# 重启后端
pm2 restart wanzai-ai

# 更新部署
cd /var/www/whizzzest
npm run build
sudo systemctl reload nginx

# 查看Nginx日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 更新部署流程

当有新代码更新时：

```bash
# 1. 拉取最新代码
cd /var/www/whizzzest
git pull origin main

# 2. 安装新依赖（如有）
npm install

# 3. 重新构建
npm run build

# 4. 重载Nginx
sudo systemctl reload nginx

# 5. 重启后端服务（如有更新）
cd server
pm2 restart wanzai-ai
```

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

在 `server/.env` 中配置：

| 参数 | 说明 | 示例 |
|------|------|------|
| MODEL_NAME | AI模型名称 | `gpt-4o`, `deepseek-chat` |
| API_KEY | API密钥 | `sk-xxx...` |
| BASE_URL | API基础地址 | `https://api.openai.com` |
| PORT | 服务端口 | `3001` |

支持的OpenAI兼容API：
- OpenAI
- DeepSeek (`https://api.deepseek.com`)
- 百度文心一言
- 阿里通义千问
- MiniMax
- 其他兼容API

### 知识库维护

知识库位于 `server/knowledgeBase.js`，包含约40条知识点。

添加新知识点：

```javascript
{
  id: 'new_001',
  category: '新类别',
  keywords: ['关键词1', '关键词2'],
  content: '知识点内容...'
}
```

---

## 🌐 API接口

### 前端API

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/ai/chat` | POST | AI聊天 |
| `/api/ai/health` | GET | 服务状态 |

### AI聊天接口

```bash
# 请求
POST /api/ai/chat
Content-Type: application/json

{
  "question": "万载有什么好吃的？",
  "locale": "zh-CN"
}

# 响应
{
  "success": true,
  "message": "万载美食有...",
  "sources": ["美食特产"]
}
```

---

## 📱 PWA使用

网站支持PWA，可以安装到桌面：

1. 在浏览器中访问网站
2. 点击地址栏右侧的"安装"图标
3. 或在菜单中选择"安装应用"

PWA特性：
- 离线访问已缓存页面
- 桌面图标快捷启动
- 全屏应用体验
- 自动更新

---

## 🎨 数字烟花功能

访问 `/firework` 或 `/en/firework` 页面体验数字烟花：

**烟花效果：**
- 多种烟花类型（牡丹、柳叶、噼啪、鬼影、棕榈等）
- 可调节大小和画质（低/中/高）
- 支持音效和全屏模式
- 点击/触摸屏幕发射烟花
- 自动播放模式 + 高潮模式

**背景设置：**
- 默认背景为万载古城烟花实景图
- 背景透明度自适应，不影响烟花观赏

**交互控制：**
- 播放/暂停按钮
- 音效开关
- 设置面板（烟花类型、大小、画质等）
- 返回按钮退出烟花页面

---

## 🌍 国际化

网站支持中英双语：

- 中文：`zh-CN`（默认）
- 英文：`en`

切换方式：
- 点击导航栏的语言切换按钮
- URL参数：`?lang=en`
- 路径前缀：`/en`

---

## 🔒 安全配置

网站包含以下安全措施：

| 配置 | 说明 |
|------|------|
| CSP | Content-Security-Policy限制资源来源 |
| XSS Protection | X-XSS-Protection防护 |
| Frame Protection | X-Frame-Options防止iframe嵌入 |
| HTTPS | SSL证书加密传输 |
| API Key保护 | 后端代理隐藏敏感信息 |
| 高德安全密钥 | securityJsCode保护API调用 |

---

## 📊 性能优化

- **预渲染**：关键页面预生成HTML
- **懒加载**：图片按需加载
- **代码分割**：按路由分割JS
- **资源压缩**：Gzip + Terser
- **缓存策略**：静态资源30天缓存
- **PWA缓存**：Service Worker缓存API请求

---

## 🛠️ 开发命令

```bash
# 开发模式
npm run dev

# 类型检查
npx vue-tsc --noEmit

# 构建生产版本
npm run build

# 构建后预览
npm run preview

# 启动后端服务
cd server && node index.js

# 后端健康检查
curl http://localhost:3001/api/health
```

---

## 📝 更新日志

### v1.5.0 (2026-04)
- 新增"关于我们"页面，展示团队信息
- 团队成员扩展至6人（含AI赋能助手Claude）
- 新增多渠道联系方式：抖音、微信视频号、小红书
- 合作伙伴支持超链接和二维码展示
- 项目定位升级：AI技术赋能县域文旅数字化转型
- 新增企业客服在线咨询链接

### v1.4.0 (2026-04)
- 集成高德地图 JS API 2.0
- 旅游线路页面支持真实驾车导航路线
- 地图导览页面支持景点标记和分类筛选
- 更新景点精确坐标数据
- 修复TypeScript类型声明问题

### v1.3.0 (2026-04)
- 重构数字烟花页面，代码简化优化
- 修复烟花页面中英文切换与外部不一致的问题
- 修复背景图片显示问题，添加默认万载古城烟花背景
- 修复首页语言切换无法返回中文的问题
- 烟花效果优化，多种烟花类型可选

### v1.2.0 (2026-04)
- 新增AI智能问答系统
- 基于RAG技术的知识库检索
- 支持OpenAI兼容API
- Markdown渲染支持

### v1.1.0
- 新增数字烟花互动页面
- Canvas烟花效果实现
- 音效和全屏支持

### v1.0.0
- 项目初始化
- 中英双语支持
- PWA功能
- 响应式设计
- SEO优化

---

## 👥 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'Add xxx'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建Pull Request

---

## 📄 许可证

本项目仅供学习和展示用途。

---

## 📞 联系方式

- **官方网站**：https://whizzzest-yanjingwanzai.top
- **电子邮箱**：whizzzest@outlook.com
- **官方抖音**：焰境·万载
- **微信公众号**：云上万载-焰遇乡旅
- **微信视频号**：焰境万载
- **小红书**：焰境万载
- **企业客服**：https://work.weixin.qq.com/kfid/kfc339afcb020ce4dd8

### 合作伙伴

| 合作伙伴 | 链接 |
|----------|------|
| 万载县文旅局 | 点击显示二维码 |
| 万载古城景区 | http://zgwzgc.com/ |
| 彩天艺术焰火 | https://wwbnn.lanzouu.com/i5Esy3j90hcb |
| 泰麟花炮 | http://www.wztlhp.com/ |

---

## 👥 团队介绍

焰境·万载团队由6位成员组成：

| 成员 | 职位 | 职责 |
|------|------|------|
| 林雨晴 | 项目负责人 | 统筹全局战略规划与团队协作 |
| 陈浩然 | 技术架构师 | 主导网站全栈开发与系统架构设计 |
| 周雅琪 | 品牌运营总监 | 统筹新媒体矩阵运营与品牌传播策略 |
| 苏婉婷 | 视频创意总监 | 主导视觉内容的策划与制作 |
| 刘思颖 | 内容战略总监 | 制定平台内容规划与项目方案撰写 |
| Claude AI | 智能赋能助手 | AI技术赋能，协助内容生成与技术优化 |

---

> 一朝相逢，便是万载 🎆