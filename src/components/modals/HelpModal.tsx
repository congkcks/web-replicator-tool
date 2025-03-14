
import React from 'react';
import { HelpCircle, BookOpen, Lightbulb, Mail, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onOpenChange }) => {
  const helpItems = [
    {
      icon: <BookOpen size={20} />,
      title: 'Hướng dẫn sử dụng',
      description: 'Tìm hiểu cách sử dụng EngAce hiệu quả nhất'
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'Mẹo và thủ thuật',
      description: 'Các mẹo học tiếng Anh hiệu quả với EngAce'
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Câu hỏi thường gặp',
      description: 'Các câu hỏi và giải đáp phổ biến'
    },
    {
      icon: <Mail size={20} />,
      title: 'Liên hệ hỗ trợ',
      description: 'Gửi yêu cầu hỗ trợ đến đội ngũ EngAce'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trợ giúp</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {helpItems.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start p-4 h-auto"
            >
              <div className="mr-3 text-engace-purple">
                {item.icon}
              </div>
              <div className="text-left">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ExternalLink size={14} className="ml-auto text-gray-400" />
            </Button>
          ))}
          
          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-sm text-gray-500 mb-2">Phiên bản hiện tại: v1.0.0</p>
            <Button variant="link" className="text-engace-purple">
              Kiểm tra cập nhật
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
