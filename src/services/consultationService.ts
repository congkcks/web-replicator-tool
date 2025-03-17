
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
      // Get the raw response first
      const response = await fetch(`${apiService.getBaseUrl()}/api/Consultation/Message`, {
        method: 'POST',
        headers: apiService.getHeaders(),
        body: JSON.stringify({ content })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // Check the content type to determine how to process the response
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // If it's JSON, parse it as JSON
        const jsonData = await response.json();
        return jsonData.data || jsonData;
      } else {
        // If it's not JSON, throw an error since we expect a Message object
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Get conversation history
  getConversationHistory: async (): Promise<ConversationHistory[]> => {
    try {
      const response = await apiService.get<ApiResponse<ConversationHistory[]>>('/api/Consultation/History');
      return (response as ApiResponse<ConversationHistory[]>).data || [];
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  },
  
  // Clear conversation
  clearConversation: async (): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.delete<ApiResponse<{ success: boolean }>>(
        '/api/Consultation/Clear'
      );
      return (response as ApiResponse<{ success: boolean }>).data || { success: true };
    } catch (error) {
      console.error('Error clearing conversation:', error);
      throw error;
    }
  },
  
  // Get conversation by ID
  getConversationById: async (conversationId: string): Promise<ConversationHistory> => {
    try {
      const response = await apiService.get<ApiResponse<ConversationHistory>>(
        `/api/Consultation/History/${conversationId}`
      );
      return (response as ApiResponse<ConversationHistory>).data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  }
};
