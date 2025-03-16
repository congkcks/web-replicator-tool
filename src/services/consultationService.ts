
import { apiService } from './api';

export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface ConversationHistory {
  id: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export const consultationService = {
  // Send a message and get a response
  sendMessage: (content: string): Promise<Message> => {
    return apiService.post<Message>('/consultation/message', { content });
  },
  
  // Get conversation history
  getConversationHistory: (): Promise<ConversationHistory[]> => {
    return apiService.get<ConversationHistory[]>('/consultation/history');
  },
  
  // Clear conversation
  clearConversation: (): Promise<{ success: boolean }> => {
    return apiService.delete<{ success: boolean }>('/consultation/clear');
  }
};
