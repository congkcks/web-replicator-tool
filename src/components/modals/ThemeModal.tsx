
import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ThemeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ open, onOpenChange }) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chế độ hiển thị</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value as 'light' | 'dark' | 'system')}>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <ToggleGroupItem 
                  value="light" 
                  className={cn(
                    "w-full aspect-square mb-2",
                    theme === 'light' ? "border-2 border-engace-blue" : ""
                  )}
                >
                  <Sun size={24} className="text-engace-orange" />
                </ToggleGroupItem>
                <span className="text-sm">Sáng</span>
              </div>
              
              <div className="flex flex-col items-center">
                <ToggleGroupItem 
                  value="dark" 
                  className={cn(
                    "w-full aspect-square mb-2",
                    theme === 'dark' ? "border-2 border-engace-blue" : ""
                  )}
                >
                  <Moon size={24} className="text-indigo-500" />
                </ToggleGroupItem>
                <span className="text-sm">Tối</span>
              </div>
              
              <div className="flex flex-col items-center">
                <ToggleGroupItem 
                  value="system" 
                  className={cn(
                    "w-full aspect-square mb-2",
                    theme === 'system' ? "border-2 border-engace-blue" : ""
                  )}
                >
                  <Monitor size={24} className="text-gray-600 dark:text-gray-400" />
                </ToggleGroupItem>
                <span className="text-sm">Hệ thống</span>
              </div>
            </div>
          </ToggleGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeModal;
