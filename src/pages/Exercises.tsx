
import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowLeft, Clock, ArrowRight, Copy } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('9:49');

  const question = {
    text: "January is the first month of the ____.",
    options: ["day", "week", "year", "season"]
  };

  // Progress percentage calculation
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1 container max-w-screen-md mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} />
            Quay lại
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <Copy size={18} />
            Sao chép
          </Button>
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg mb-4 p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-gray-700 dark:text-gray-300">
              Câu {currentQuestion}/{totalQuestions}
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock size={16} />
              {timeLeft}
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-2 bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full bg-engace-pink rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            />
          </Progress>
        </Card>

        <div className="mb-6">
          <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-4">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-6">
              {question.text}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedAnswer === option 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-engace-pink' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              Câu trước
            </Button>
            <Button 
              className="flex items-center gap-2 bg-engace-pink hover:bg-engace-pink/90 px-6"
            >
              Câu tiếp
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <Button className="w-full py-6 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-xl flex items-center justify-center gap-2 text-lg">
          Nộp bài ngay
        </Button>
      </main>
    </div>
  );
};

export default Exercises;
