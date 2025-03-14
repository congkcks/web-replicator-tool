
import React from 'react';
import { User, Edit, LogOut, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thông tin cá nhân</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <User size={40} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold">Nguyen Van A</h3>
          <p className="text-gray-500">nguyenvana@example.com</p>
          
          <div className="mt-4 w-full">
            <Separator className="my-4" />
            
            <div className="space-y-3 w-full">
              <Button variant="outline" className="w-full justify-start">
                <Edit size={16} className="mr-2" /> Chỉnh sửa hồ sơ
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings size={16} className="mr-2" /> Cài đặt tài khoản
              </Button>
              <Button variant="outline" className="w-full justify-start text-engace-red">
                <LogOut size={16} className="mr-2" /> Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
