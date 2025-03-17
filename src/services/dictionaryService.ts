
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

export const dictionaryService = {
  // Search for a word
  searchWord: async (keyword: string): Promise<WordDefinition | string | null> => {
    try {
      // Get the raw response first
      const response = await fetch(`${apiService.getBaseUrl()}/api/Dictionary/Search?keyword=${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: apiService.getHeaders(),
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
        // If it's not JSON, treat it as text
        const textData = await response.text();
        return textData;
      }
    } catch (error) {
      console.error('Error searching word:', error);
      throw error;
    }
  },
  
  // Get search history
  getSearchHistory: async (): Promise<SearchHistoryItem[]> => {
    try {
      const response = await apiService.get('/api/Dictionary/History');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching search history:', error);
      throw error;
    }
  },
  
  // Add word to favorites
  addToFavorites: async (word: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.post(
        '/api/Dictionary/Favorites', 
        { word }
      );
      return response.data || { success: true };
    } catch (error) {
      console.error('Error adding word to favorites:', error);
      throw error;
    }
  },
  
  // Get favorite words
  getFavorites: async (): Promise<string[]> => {
    try {
      const response = await apiService.get('/api/Dictionary/Favorites');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },
  
  // Remove word from favorites
  removeFromFavorites: async (word: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.delete(
        `/api/Dictionary/Favorites/${encodeURIComponent(word)}`
      );
      return response.data || { success: true };
    } catch (error) {
      console.error('Error removing word from favorites:', error);
      throw error;
    }
  }
};
