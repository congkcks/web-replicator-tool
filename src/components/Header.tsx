
import React, { useState } from 'react';
import { Sun, MessageCircle, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import UserProfileModal from './modals/UserProfileModal';
import ThemeModal from './modals/ThemeModal';
import MessagesModal from './modals/MessagesModal';
import HelpModal from './modals/HelpModal';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [messagesModalOpen, setMessagesModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm animate-fade-in">
      <div className="flex items-center gap-8">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <Logo />
        </div>
        <div className="text-gray-500 text-sm font-medium">Cộng</div>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-600"
          onClick={() => setUserModalOpen(true)}
        >
          <User size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-600"
          onClick={() => setThemeModalOpen(true)}
        >
          <Sun size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-600"
          onClick={() => setMessagesModalOpen(true)}
        >
          <MessageCircle size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-600"
          onClick={() => setHelpModalOpen(true)}
        >
          <HelpCircle size={20} />
        </Button>
        <Button className="font-medium bg-engace-red hover:bg-engace-red/90 text-white rounded-lg">
          Đăng xuất
        </Button>
      </div>

      {/* Modals */}
      <UserProfileModal 
        open={userModalOpen} 
        onOpenChange={setUserModalOpen} 
      />
      <ThemeModal 
        open={themeModalOpen} 
        onOpenChange={setThemeModalOpen} 
      />
      <MessagesModal 
        open={messagesModalOpen} 
        onOpenChange={setMessagesModalOpen} 
      />
      <HelpModal 
        open={helpModalOpen} 
        onOpenChange={setHelpModalOpen} 
      />
    </header>
  );
};

export default Header;
