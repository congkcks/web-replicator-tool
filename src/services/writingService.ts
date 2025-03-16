
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

export const writingService = {
  // Submit writing for feedback
  submitWriting: (submission: WritingSubmission): Promise<WritingFeedback> => {
    return apiService.post<WritingFeedback>('/writing/feedback', submission);
  },
  
  // Get writing history
  getWritingHistory: (): Promise<WritingSubmission[]> => {
    return apiService.get<WritingSubmission[]>('/writing/history');
  },
  
  // Save draft
  saveDraft: (submission: WritingSubmission): Promise<{ id: string }> => {
    return apiService.post<{ id: string }>('/writing/drafts', submission);
  }
};
