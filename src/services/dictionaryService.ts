
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
  searchWord: (keyword: string): Promise<WordDefinition> => {
    return apiService.get<WordDefinition>(`/dictionary/search?keyword=${encodeURIComponent(keyword)}`);
  },
  
  // Get search history
  getSearchHistory: (): Promise<SearchHistoryItem[]> => {
    return apiService.get<SearchHistoryItem[]>('/dictionary/history');
  },
  
  // Add word to favorites
  addToFavorites: (word: string): Promise<{ success: boolean }> => {
    return apiService.post<{ success: boolean }>('/dictionary/favorites', { word });
  },
  
  // Get favorite words
  getFavorites: (): Promise<string[]> => {
    return apiService.get<string[]>('/dictionary/favorites');
  }
};
