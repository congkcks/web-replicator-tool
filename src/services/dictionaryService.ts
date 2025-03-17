
import { apiService } from './api';

export interface WordDefinition {
  word: string;
  phonetic?: string;
  translations: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
  examples: string[];
  relatedWords?: string[];
}

export interface SearchHistoryItem {
  word: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export const dictionaryService = {
  // Search for a word
  searchWord: async (keyword: string): Promise<WordDefinition> => {
    try {
      const response = await apiService.get<ApiResponse<WordDefinition>>(
        `/api/Dictionary/Search?keyword=${encodeURIComponent(keyword)}`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching word:', error);
      throw error;
    }
  },
  
  // Get search history
  getSearchHistory: async (): Promise<SearchHistoryItem[]> => {
    try {
      const response = await apiService.get<ApiResponse<SearchHistoryItem[]>>('/api/Dictionary/History');
      return response.data;
    } catch (error) {
      console.error('Error fetching search history:', error);
      throw error;
    }
  },
  
  // Add word to favorites
  addToFavorites: async (word: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.post<ApiResponse<{ success: boolean }>>(
        '/api/Dictionary/Favorites', 
        { word }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding word to favorites:', error);
      throw error;
    }
  },
  
  // Get favorite words
  getFavorites: async (): Promise<string[]> => {
    try {
      const response = await apiService.get<ApiResponse<string[]>>('/api/Dictionary/Favorites');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },
  
  // Remove word from favorites
  removeFromFavorites: async (word: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.delete<ApiResponse<{ success: boolean }>>(
        `/api/Dictionary/Favorites/${encodeURIComponent(word)}`
      );
      return response.data;
    } catch (error) {
      console.error('Error removing word from favorites:', error);
      throw error;
    }
  }
};
