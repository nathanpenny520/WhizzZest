// 万载文旅AI代理服务
// Express服务器，处理AI聊天请求

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { retrieveKnowledge, buildContext } = require('./knowledgeBase');

// 加载环境变量
dotenv.config();

const app = express();

// 配置
const PORT = process.env.PORT || 3001;
const MODEL_NAME = process.env.MODEL_NAME || 'gpt-4o';
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL || 'https://api.openai.com';

// 检查必要配置
if (!API_KEY) {
  console.warn('⚠️  API_KEY 未配置，请在 .env 文件中设置');
}

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 请求日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    model: MODEL_NAME,
    baseUrl: BASE_URL,
    apiKeyConfigured: !!API_KEY
  });
});

// 系统提示词
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
- 如果不知道的信息，诚实告知并建议其他查询方式`;

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
- If you don't know something, be honest and suggest alternative ways to find out`;

// AI聊天接口
app.post('/api/chat', async (req, res) => {
  const { question, locale } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({
      success: false,
      message: locale === 'en' ? 'Please provide a valid question.' : '请提供有效的问题'
    });
  }

  if (!API_KEY) {
    return res.json({
      success: false,
      message: locale === 'en'
        ? 'AI service is not configured. Please contact the administrator.'
        : 'AI服务未配置，请联系管理员。'
    });
  }

  try {
    // 1. RAG检索相关知识
    const relevantKnowledge = retrieveKnowledge(question, 3);
    const context = buildContext(relevantKnowledge);

    // 2. 构建提示词
    const systemPrompt = locale === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_ZH;

    let userPrompt = question;
    if (context) {
      userPrompt = `参考以下信息回答问题：

${context}

用户问题：${question}`;
    }

    // 3. 调用OpenAI兼容API（增加超时时间）
    const apiResponse = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      }),
      // 增加超时时间
      signal: AbortSignal.timeout(60000)
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      console.error('API Error:', apiResponse.status, errorData);

      return res.json({
        success: false,
        message: locale === 'en'
          ? 'AI service temporarily unavailable, please try again later.'
          : 'AI服务暂时不可用，请稍后再试。'
      });
    }

    const data = await apiResponse.json();
    const aiMessage = data.choices?.[0]?.message?.content || '';

    // 4. 返回结果
    res.json({
      success: true,
      message: aiMessage,
      sources: relevantKnowledge.length > 0
        ? relevantKnowledge.map(k => k.category)
        : undefined
    });

  } catch (error) {
    console.error('Chat error:', error);

    res.json({
      success: false,
      message: locale === 'en'
        ? 'Sorry, an error occurred. Please try again later.'
        : '抱歉，发生了错误，请稍后再试。'
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 万载文旅AI代理服务已启动`);
  console.log(`   端口: ${PORT}`);
  console.log(`   模型: ${MODEL_NAME}`);
  console.log(`   API地址: ${BASE_URL}/v1/chat/completions`);
  console.log(`   API密钥: ${API_KEY ? '已配置 ✓' : '未配置 ✗'}`);
  console.log('');
  console.log(`测试命令: curl http://localhost:${PORT}/api/health`);
});