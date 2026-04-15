// AI聊天API调用封装
import axios from 'axios';
import type { AIResponse, ChatRequest } from '@/types/aiChat';

const API_BASE = '/api/ai';

export async function sendChatMessage(question: string): Promise<AIResponse> {
  try {
    const locale = localStorage.getItem('locale') || 'zh-CN';

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

    // 根据错误类型返回不同消息
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: '请求超时，请稍后再试。'
        };
      }
      if (error.response?.status === 500) {
        return {
          success: false,
          message: '服务器内部错误，请稍后再试。'
        };
      }
    }

    return {
      success: false,
      message: '抱歉，服务暂时不可用，请稍后再试。'
    };
  }
}