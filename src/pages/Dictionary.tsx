
import React, { useState, useEffect } from 'react';
import { BookText, Search, Star, History } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { dictionaryService, SearchHistoryItem } from '@/services/dictionaryService';

const Dictionary: React.FC = () => {
  const navigate = useNavigate();
  const { error } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch recent searches on component mount
  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        // In a real-world scenario, this would call the API
        // For demonstration, we'll use mock data
        
        // Uncomment for production with real API
        // const history = await dictionaryService.getSearchHistory();
        // const terms = history.map(item => item.word);
        // setRecentSearches(terms);
        
        // Mock data
        setRecentSearches(['hello', 'beat around the bush', 'spontaneous', 'come across', 'innovative']);
      } catch (err) {
        console.error('Error fetching search history:', err);
      }
    };
    
    fetchRecentSearches();
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchTerm.trim()) {
      error('Vui lòng nhập từ cần tra cứu', 'Bạn chưa nhập từ hoặc cụm từ để tra cứu');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real scenario, we might want to check if the word exists first
      // const wordResult = await dictionaryService.searchWord(searchTerm.trim());
      
      // For demonstration, we'll navigate directly
      navigate(`/dictionary/result?keyword=${encodeURIComponent(searchTerm.trim())}`);
    } catch (err) {
      console.error('Error searching word:', err);
      error('Không thể tra cứu từ', 'Đã xảy ra lỗi khi tra cứu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = async (word: string) => {
    try {
      // In a real scenario, this would call the API
      // await dictionaryService.addToFavorites(word);
      
      // For demonstration
      toast.success('Đã thêm vào danh sách yêu thích');
    } catch (err) {
      console.error('Error adding to favorites:', err);
      toast.error('Không thể thêm vào danh sách yêu thích');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-engace-light dark:bg-gray-900">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-engace-blue rounded-2xl flex items-center justify-center">
            <BookText size={48} color="white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2 dark:text-white">TỪ ĐIỂN</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Tra cứu từ vựng với định nghĩa chi tiết, ví dụ thực tế và gợi ý sử dụng trong nhiều ngữ
          cảnh khác nhau.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              placeholder="Nhập từ hoặc cụm từ cần tra cứu..."
              className="pl-4 pr-10 py-6 rounded-xl text-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
            <Star 
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-engace-purple cursor-pointer" 
              size={20} 
              onClick={() => handleAddToFavorites(searchTerm)}
            />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent dark:text-gray-300"
              disabled={isLoading}
            >
              <Search className="text-gray-500 dark:text-gray-300" size={20} />
            </Button>
          </div>
        </form>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center mb-4">
            <History size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="text-md font-medium dark:text-gray-300">Gợi ý tra cứu</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full border-gray-300 hover:border-engace-blue hover:bg-blue-50 text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => {
                  setSearchTerm(term);
                  // Automatically search after a short delay
                  setTimeout(() => handleSearch(), 100);
                }}
                disabled={isLoading}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Button 
            onClick={handleSearch}
            className="w-full py-6 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl flex items-center justify-center gap-2 text-lg"
            disabled={isLoading}
          >
            <Search size={20} />
            {isLoading ? 'Đang tra cứu...' : 'Tra cứu'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dictionary;
