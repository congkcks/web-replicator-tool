
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

export const exerciseService = {
  // Generate exercise
  generateExercise: (params: ExerciseParams): Promise<ExerciseSet> => {
    return apiService.post<ExerciseSet>('/exercises/generate', params);
  },
  
  // Submit exercise answers
  submitAnswers: (exerciseId: string, answers: Record<number, string>): Promise<SubmissionResult> => {
    return apiService.post<SubmissionResult>(`/exercises/${exerciseId}/submit`, { answers });
  },
  
  // Get exercise history
  getExerciseHistory: (): Promise<ExerciseSet[]> => {
    return apiService.get<ExerciseSet[]>('/exercises/history');
  }
};
