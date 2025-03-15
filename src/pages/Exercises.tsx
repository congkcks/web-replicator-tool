
import React, { useState } from 'react';
import { GraduationCap, ArrowLeft, Clock, ArrowRight, Copy, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const [showExercise, setShowExercise] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('9:49');
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [exerciseType, setExerciseType] = useState('');

  const question = {
    text: "January is the first month of the ____.",
    options: ["day", "week", "year", "season"]
  };

  // Progress percentage calculation
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const handleCreateExercise = () => {
    setTotalQuestions(Number(questionCount));
    setShowExercise(true);
  };

  const suggestedTopics = [
    "Places in town",
    "Numbers around me", 
    "Favorite food",
    "Animals I like", 
    "Hobbies I enjoy"
  ];

  const exerciseTypes = [
    { value: "most-suitable", label: "Most Suitable Word: Chọn từ thích hợp nhất" },
    { value: "verb-conjugation", label: "Verb Conjugation: Chia động từ" },
    { value: "conditional", label: "Conditional Sentences: Câu điều kiện" },
    { value: "indirect-speech", label: "Indirect Speech: Câu gián tiếp" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1 container max-w-screen-md mx-auto py-8 px-4 animate-fade-in">
        {!showExercise ? (
          // Exercise creation form
          <>
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-engace-pink rounded-2xl flex items-center justify-center">
                <GraduationCap size={48} color="white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-center mb-2 dark:text-white">BÀI TẬP</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Thiết lập bài tập phù hợp với nhu cầu học tập của bạn với các chủ đề và dạng bài tập đa dạng.
            </p>
            
            <div className="space-y-6">
              <div className="mb-4">
                <Label htmlFor="topic" className="text-gray-700 dark:text-gray-300 mb-2 block">Nhập chủ đề bài tập...</Label>
                <Input 
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Nhập chủ đề bài tập..."
                  className="text-lg py-6 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Sparkles size={16} className="text-gray-600 dark:text-gray-400 mr-2" />
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">Chủ đề gợi ý</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedTopics.map((topic, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setTopic(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="questionCount" className="text-gray-700 dark:text-gray-300 mb-2 block">Số lượng câu hỏi</Label>
                <Input 
                  id="questionCount"
                  type="number" 
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  min="5"
                  max="50"
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              
              <div className="mb-6">
                <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Chọn một hoặc nhiều dạng câu hỏi</Label>
                <Select value={exerciseType} onValueChange={setExerciseType}>
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Chọn dạng câu hỏi" />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseTypes.map((type, index) => (
                      <SelectItem key={index} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 text-lg"
                onClick={handleCreateExercise}
              >
                <GraduationCap size={20} />
                Tạo bài tập
              </Button>
            </div>
          </>
        ) : (
          // Exercise questions
          <>
            <div className="flex justify-between items-center mb-8">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                onClick={() => setShowExercise(false)}
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
          </>
        )}
      </main>
    </div>
  );
};

export default Exercises;
