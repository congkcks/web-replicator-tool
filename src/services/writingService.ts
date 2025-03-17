
import { apiService } from './api';

export interface WritingSubmission {
  prompt: string;
  content: string;
}

export interface WritingFeedback {
  title: string;
  points: string[];
  sections: {
    title: string;
    subsections: {
      title: string;
      points: {
        question: string;
        answer: string;
      }[];
    }[];
  }[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export interface WritingDraft extends WritingSubmission {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const writingService = {
  // Submit writing for feedback
  submitWriting: async (submission: WritingSubmission): Promise<WritingFeedback> => {
    try {
      const response = await apiService.post<ApiResponse<WritingFeedback>>(
        '/writing/feedback', 
        submission
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting writing:', error);
      throw error;
    }
  },
  
  // Get writing history
  getWritingHistory: async (): Promise<WritingSubmission[]> => {
    try {
      const response = await apiService.get<ApiResponse<WritingSubmission[]>>('/writing/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching writing history:', error);
      throw error;
    }
  },
  
  // Save draft
  saveDraft: async (submission: WritingSubmission): Promise<{ id: string }> => {
    try {
      const response = await apiService.post<ApiResponse<{ id: string }>>(
        '/writing/drafts', 
        submission
      );
      return response.data;
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  },
  
  // Get drafts
  getDrafts: async (): Promise<WritingDraft[]> => {
    try {
      const response = await apiService.get<ApiResponse<WritingDraft[]>>('/writing/drafts');
      return response.data;
    } catch (error) {
      console.error('Error fetching drafts:', error);
      throw error;
    }
  },
  
  // Get draft by ID
  getDraftById: async (draftId: string): Promise<WritingDraft> => {
    try {
      const response = await apiService.get<ApiResponse<WritingDraft>>(`/writing/drafts/${draftId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching draft:', error);
      throw error;
    }
  },
  
  // Update draft
  updateDraft: async (draftId: string, submission: WritingSubmission): Promise<WritingDraft> => {
    try {
      const response = await apiService.put<ApiResponse<WritingDraft>>(
        `/writing/drafts/${draftId}`, 
        submission
      );
      return response.data;
    } catch (error) {
      console.error('Error updating draft:', error);
      throw error;
    }
  },
  
  // Delete draft
  deleteDraft: async (draftId: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiService.delete<ApiResponse<{ success: boolean }>>(
        `/writing/drafts/${draftId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting draft:', error);
      throw error;
    }
  }
};
