
import React from 'react';
import { Sun, MessageCircle, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm animate-fade-in">
      <div className="flex items-center gap-8">
        <Logo />
        <div className="text-gray-500 text-sm font-medium">Cộng</div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
          <User size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
          <Sun size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
          <MessageCircle size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
          <HelpCircle size={20} />
        </Button>
        <Button className="font-medium bg-engace-red hover:bg-engace-red/90 text-white rounded-lg">
          Đăng xuất
        </Button>
      </div>
    </header>
  );
};

export default Header;
