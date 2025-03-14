
import React from 'react';
import { Pen, Upload } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const WritingPractice: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-engace-green rounded-2xl flex items-center justify-center">
            <Pen size={48} color="white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2">LUYỆN VIẾT</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Nhận phản hồi chi tiết để nâng cao kỹ năng viết tiếng Anh của bạn.
        </p>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Đề bài</label>
              <Textarea 
                placeholder="Nhập đề bài hoặc yêu cầu bạn cần viết..." 
                className="text-lg py-3 min-h-24"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">Bài viết của bạn</label>
                <Button variant="outline" className="flex items-center gap-1 text-sm">
                  <Upload size={15} />
                  Nhập từ ảnh
                </Button>
              </div>
              <Textarea 
                placeholder="Nhập nội dung bài viết của bạn ở đây..." 
                className="text-lg py-3 min-h-48"
              />
            </div>
          </div>
          
          <Button className="w-full py-6 bg-engace-green hover:bg-engace-green/90 rounded-xl flex items-center justify-center gap-2 text-lg">
            Nhận phản hồi
          </Button>
        </div>
      </main>
    </div>
  );
};

export default WritingPractice;
