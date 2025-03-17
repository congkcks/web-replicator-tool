
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

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export const consultationService = {
  // Send a message and get a response
  sendMessage: async (content: string): Promise<Message> => {
    try {
      const response = await apiService.post<ApiResponse<Message>>(
        '/consultation/message', 
        { content }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Get conversation history
  getConversationHistory: async (): Promise<ConversationHistory[]> => {
    try {
      const response = await apiService.get<ApiResponse<ConversationHistory[]>>('/consultation/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  },
  
  // Clear conversation
  clearConversation: async (): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.delete<ApiResponse<{ success: boolean }>>(
        '/consultation/clear'
      );
      return response.data;
    } catch (error) {
      console.error('Error clearing conversation:', error);
      throw error;
    }
  },
  
  // Get conversation by ID
  getConversationById: async (conversationId: string): Promise<ConversationHistory> => {
    try {
      const response = await apiService.get<ApiResponse<ConversationHistory>>(
        `/consultation/history/${conversationId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  }
};
