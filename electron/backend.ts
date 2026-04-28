// electron/backend.ts
// 内嵌 Express 后端服务 - 复用 server/index.js 逻辑

import express from 'express'
import cors from 'cors'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { app } from 'electron'

// 加载环境变量（开发模式从 server/.env，生产模式从 resourcesPath）
function loadEnvConfig() {
  try {
    const envPath = app.isPackaged
      ? resolve(process.resourcesPath, 'server/.env')
      : resolve(dirname(__dirname), '../server/.env')

    if (existsSync(envPath)) {
      const envContent = readFileSync(envPath, 'utf-8')
      envContent.split('\n').forEach(line => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, value] = trimmed.split('=')
          if (key && value && !process.env[key.trim()]) {
            process.env[key.trim()] = value.trim()
          }
        }
      })
      console.log('[Backend] 环境变量加载成功')
    }
  } catch (error) {
    console.warn('[Backend] 环境变量加载失败:', error)
  }
}

loadEnvConfig()

// 知识库数据（从 JSON 加载）
interface KnowledgeItem {
  id: string
  category: string
  keywords: string[]
  content: string
}

let knowledgeBase: KnowledgeItem[] = []

// 加载知识库
function loadKnowledgeBase() {
  try {
    const basePath = app.isPackaged
      ? resolve(process.resourcesPath, 'server/knowledgeBase.json')
      : resolve(__dirname, '../server/knowledgeBase.json')

    const data = readFileSync(basePath, 'utf-8')
    knowledgeBase = JSON.parse(data)
    console.log('[Backend] 知识库加载成功，共', knowledgeBase.length, '条')
  } catch (error) {
    console.error('[Backend] 知识库加载失败:', error)
    knowledgeBase = []
  }
}

// 关键词匹配评分
function scoreKeywords(question: string, item: KnowledgeItem): number {
  const questionLower = question.toLowerCase()
  let score = 0
  for (const keyword of item.keywords) {
    if (questionLower.includes(keyword.toLowerCase())) {
      score += 1
    }
  }
  return score
}

// RAG 检索
function retrieveKnowledge(question: string, topK = 3): KnowledgeItem[] {
  const scoredItems = knowledgeBase.map(item => ({
    ...item,
    score: scoreKeywords(question, item)
  }))

  return scoredItems
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}

// 构建上下文
function buildContext(items: KnowledgeItem[]): string {
  if (items.length === 0) return ''
  return items.map(item => `[${item.category}]\n${item.content}`).join('\n\n')
}

// Express 应用实例
let backendApp: express.Application | null = null
let backendServer: ReturnType<typeof express.application.listen> | null = null

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

  // 加载知识库
  loadKnowledgeBase()

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
          ? relevantKnowledge.map((k: any) => k.category)
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