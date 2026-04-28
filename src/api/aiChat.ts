// AI聊天API调用封装
import axios from 'axios';
import type { AIResponse, ChatRequest } from '@/types/aiChat';

// 根据环境自动选择 API 地址
const API_BASE = import.meta.env.VITE_ELECTRON
  ? import.meta.env.VITE_API_BASE || 'http://localhost:13001/api/ai'  // Electron: 内嵌后端
  : '/api/ai';  // Web: 通过代理或远程服务器

export async function sendChatMessage(question: string, locale: string): Promise<AIResponse> {
  try {
    const request: ChatRequest = {
      question,
      locale
    };

    const response = await axios.post<AIResponse>(`${API_BASE}/chat`, request, {
      timeout: 30000, // 30秒超时
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('AI Chat error:', error);

    const isEn = locale === 'en';

    // 根据错误类型返回不同消息
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: isEn ? 'Request timeout, please try again later.' : '请求超时，请稍后再试。'
        };
      }
      if (error.response?.status === 500) {
        return {
          success: false,
          message: isEn ? 'Server error, please try again later.' : '服务器内部错误，请稍后再试。'
        };
      }
    }

    return {
      success: false,
      message: isEn ? 'Sorry, service is temporarily unavailable, please try again later.' : '抱歉，服务暂时不可用，请稍后再试。'
    };
  }
}