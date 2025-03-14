
import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ThemeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chế độ hiển thị</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4 py-4">
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 border-2 border-engace-blue"
          >
            <Sun size={24} className="mb-2 text-engace-orange" />
            <span>Sáng</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4"
          >
            <Moon size={24} className="mb-2 text-indigo-500" />
            <span>Tối</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4"
          >
            <Monitor size={24} className="mb-2 text-gray-600" />
            <span>Hệ thống</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeModal;
