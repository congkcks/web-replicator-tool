
import React, { useState } from 'react';
import { MessageSquare, Send, Paperclip } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
};

const Consultation: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Chào Cong! Mình là EngAce, trợ lý ảo được thiết kế riêng để hỗ trợ bạn học tiếng Anh nè. 😊\n\nMình luôn cố gắng hỗ trợ bạn tốt nhất, nhưng đôi khi vẫn có thể mắc sai sót, nên bạn nhớ kiểm tra lại những thông tin quan trọng nha!',
      isUser: false,
      timestamp: '10:08 PM'
    },
    {
      id: 2,
      content: 'hi',
      isUser: true,
      timestamp: '10:08 PM'
    },
    {
      id: 3,
      content: 'Chào Cong! ✨\n\nMình rất vui khi được gặp bạn! Bạn đã sẵn sàng bắt đầu buổi học tiếng Anh đầu tiên với mình chưa?\n\nMình sẽ luôn ở đây để giúp bạn học tiếng Anh một cách dễ dàng và hiệu quả. Bạn có câu hỏi gì không? Hoặc bạn muốn bắt đầu từ đâu? Mình có thể giúp bạn ôn lại bảng chữ cái, cách phát âm, hay đơn giản là làm quen với những câu chào hỏi thường ngày nhé!',
      isUser: false,
      timestamp: '10:09 PM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        content: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-4 px-4 flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-engace-orange rounded-lg flex items-center justify-center">
                <MessageSquare size={20} color="white" />
              </div>
              <h2 className="font-semibold text-lg">Tư vấn với EngAce</h2>
            </div>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              Xóa cuộc trò chuyện
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-3xl ${msg.isUser ? 'ml-auto' : ''}`}
              >
                <div 
                  className={`rounded-2xl p-4 ${
                    msg.isUser 
                      ? 'bg-blue-100 text-right' 
                      : 'bg-orange-100'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Shift + Enter để xuống dòng"
                  className="pr-10 py-6 rounded-xl"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Paperclip size={20} className="text-gray-400" />
                </Button>
              </div>
              <Button 
                className="bg-engace-orange hover:bg-engace-orange/90 rounded-xl px-4"
                onClick={handleSendMessage}
              >
                <Send size={20} />
              </Button>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="flex-1 mr-2">
                Đính kèm ảnh
              </Button>
              <Button variant="outline" className="flex-1 mr-2">
                Suy luận sâu
              </Button>
              <Button variant="outline" className="flex-1">
                Tìm kiếm trên Google
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consultation;
