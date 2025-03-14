
import React, { useState } from 'react';
import { GraduationCap, Check } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Exercises: React.FC = () => {
  const [questionCount, setQuestionCount] = useState(10);
  const exerciseTypes = [
    { id: 'msw', name: 'Most Suitable Word: Chọn từ thích hợp nhất' },
    { id: 'vc', name: 'Verb Conjugation: Chia động từ' },
    { id: 'cs', name: 'Conditional Sentences: Câu điều kiện' },
    { id: 'ps', name: 'Phrasal Verbs: Cụm động từ' },
    { id: 'rc', name: 'Reading Comprehension: Đọc hiểu' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-engace-pink rounded-2xl flex items-center justify-center">
            <GraduationCap size={48} color="white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2">BÀI TẬP</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Thiết lập bài tập phù hợp với nhu cầu học tập của bạn với các chủ đề và dạng bài tập đa dạng.
        </p>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Input 
              placeholder="Nhập chủ đề bài tập..." 
              className="text-lg py-6 mb-6"
            />
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Số lượng câu hỏi</label>
              <Input 
                type="number" 
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
                className="text-lg py-6"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Chọn một hoặc nhiều dạng câu hỏi</label>
              <div className="border rounded-lg overflow-hidden">
                {exerciseTypes.map((type, index) => (
                  <div 
                    key={type.id} 
                    className={`p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center ${index !== exerciseTypes.length - 1 ? 'border-b' : ''}`}
                  >
                    <span>{type.name}</span>
                    <Check size={20} className="text-engace-pink opacity-0 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Button className="w-full py-6 bg-engace-pink hover:bg-engace-pink/90 rounded-xl flex items-center justify-center gap-2 text-lg">
            Tạo bài tập
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Exercises;
