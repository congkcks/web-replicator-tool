
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Paperclip } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { consultationService, Message } from '@/services/consultationService';

const Consultation: React.FC = () => {
  const { success, error } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial messages
  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        // In a real-world scenario, this would call the API
        // For demonstration, we'll use mock data
        
        // Uncomment for production with real API
        // const history = await consultationService.getConversationHistory();
        // if (history.length > 0) {
        //   setMessages(history[0].messages);
        // } else {
        //   // Set default welcome message
        //   setMessages([
        //     {
        //       id: 1,
        //       content: 'Chào! Mình là CDKAce, trợ lý ảo được thiết kế riêng để hỗ trợ bạn học tiếng Anh. 😊',
        //       isUser: false,
        //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        //     }
        //   ]);
        // }
        
        // Mock data
        setMessages([
          {
            id: 1,
            content: 'Chào! Mình là CDKAce, trợ lý ảo được thiết kế riêng để hỗ trợ bạn học tiếng Anh nè. 😊\n\nMình luôn cố gắng hỗ trợ bạn tốt nhất, nhưng đôi khi vẫn có thể mắc sai sót, nên bạn nhớ kiểm tra lại những thông tin quan trọng nha!',
            isUser: false,
            timestamp: '10:08 PM'
          }
        ]);
      } catch (err) {
        console.error('Error loading conversation history:', err);
        error('Không thể tải lịch sử trò chuyện', 'Vui lòng thử lại sau');
      }
    };
    
    loadInitialMessages();
  }, [error]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      content: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // In a real-world scenario, this would call the API
      // For demonstration, we'll simulate an API call with a timeout
      
      // Uncomment for production with real API
      // const response = await consultationService.sendMessage(message.trim());
      // setMessages(prev => [...prev, response]);
      
      // Mock response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          content: 'Cảm ơn bạn đã nhắn tin! Tôi rất vui được hỗ trợ bạn học tiếng Anh. Bạn có thể hỏi tôi bất kỳ câu hỏi nào về ngữ pháp, từ vựng, hoặc cách diễn đạt. Tôi sẽ cố gắng giúp bạn hiểu rõ hơn về tiếng Anh.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
      
    } catch (err) {
      console.error('Error sending message:', err);
      error('Không thể gửi tin nhắn', 'Vui lòng thử lại sau');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = async () => {
    try {
      // In a real-world scenario, this would call the API
      // await consultationService.clearConversation();
      
      // For demonstration
      setMessages([
        {
          id: Date.now(),
          content: 'Cuộc trò chuyện đã được làm mới. Bạn có thể bắt đầu cuộc trò chuyện mới!',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      
      success('Đã xóa cuộc trò chuyện', 'Cuộc trò chuyện đã được làm mới');
    } catch (err) {
      console.error('Error clearing conversation:', err);
      error('Không thể xóa cuộc trò chuyện', 'Vui lòng thử lại sau');
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
              <h2 className="font-semibold text-lg">Tư vấn với CDKAce</h2>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleClearConversation}
            >
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
            {isLoading && (
              <div className="max-w-3xl">
                <div className="bg-orange-100 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
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
                  disabled={isLoading}
                />
                <Button variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Paperclip size={20} className="text-gray-400" />
                </Button>
              </div>
              <Button 
                className="bg-engace-orange hover:bg-engace-orange/90 rounded-xl px-4"
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
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
