
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
      // Get the raw response first
      const response = await fetch(`${apiService.getBaseUrl()}/api/Exercises/Generate`, {
        method: 'POST',
        headers: apiService.getHeaders(),
        body: JSON.stringify(params)
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
        // If it's not JSON, throw an error
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error generating exercise:', error);
      throw error;
    }
  },
  
  // Submit exercise answers
  submitAnswers: async (exerciseId: string, answers: Record<number, string>): Promise<SubmissionResult> => {
    try {
      const response = await fetch(`${apiService.getBaseUrl()}/api/Exercises/${exerciseId}/Submit`, {
        method: 'POST',
        headers: apiService.getHeaders(),
        body: JSON.stringify({ answers })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      return jsonData.data || jsonData;
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  },
  
  // Get exercise history
  getExerciseHistory: async (): Promise<ExerciseSet[]> => {
    try {
      const response = await apiService.get<ApiResponse<ExerciseSet[]>>('/api/Exercises/History');
      return (response as ApiResponse<ExerciseSet[]>).data || [];
    } catch (error) {
      console.error('Error fetching exercise history:', error);
      throw error;
    }
  },
  
  // Get exercise by ID
  getExerciseById: async (exerciseId: string): Promise<ExerciseSet> => {
    try {
      const response = await apiService.get<ApiResponse<ExerciseSet>>(`/api/Exercises/${exerciseId}`);
      return (response as ApiResponse<ExerciseSet>).data;
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw error;
    }
  }
};
