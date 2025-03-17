
import { apiService } from './api';

export interface ExerciseParams {
  topic: string;
  questionCount: number;
  exerciseType: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: string;
}

export interface ExerciseSet {
  id: string;
  topic: string;
  questions: Question[];
  timeLimit: number; // in seconds
}

export interface SubmissionResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  feedback: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export const exerciseService = {
  // Generate exercise
  generateExercise: async (params: ExerciseParams): Promise<ExerciseSet> => {
    try {
      const response = await apiService.post<ApiResponse<ExerciseSet>>(
        '/exercises/generate', 
        params
      );
      return response.data;
    } catch (error) {
      console.error('Error generating exercise:', error);
      throw error;
    }
  },
  
  // Submit exercise answers
  submitAnswers: async (exerciseId: string, answers: Record<number, string>): Promise<SubmissionResult> => {
    try {
      const response = await apiService.post<ApiResponse<SubmissionResult>>(
        `/exercises/${exerciseId}/submit`, 
        { answers }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  },
  
  // Get exercise history
  getExerciseHistory: async (): Promise<ExerciseSet[]> => {
    try {
      const response = await apiService.get<ApiResponse<ExerciseSet[]>>('/exercises/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching exercise history:', error);
      throw error;
    }
  },
  
  // Get exercise by ID
  getExerciseById: async (exerciseId: string): Promise<ExerciseSet> => {
    try {
      const response = await apiService.get<ApiResponse<ExerciseSet>>(`/exercises/${exerciseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw error;
    }
  }
};
