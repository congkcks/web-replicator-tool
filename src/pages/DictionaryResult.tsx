
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { dictionaryService, WordDefinition } from '@/services/dictionaryService';
import { useApi } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';

const DictionaryResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  
  const [wordData, setWordData] = useState<WordDefinition | null>(null);
  const { isLoading, request } = useApi();

  useEffect(() => {
    const fetchWordDefinition = async () => {
      if (!keyword) {
        navigate('/dictionary');
        return;
      }

      try {
        const result = await request(
          () => dictionaryService.searchWord(keyword),
          {
            skipToast: true,
            errorMessage: "Không thể lấy dữ liệu từ điển"
          }
        );
        
        if (result) {
          setWordData(result as WordDefinition);
        } else {
          toast({
            title: "Không tìm thấy từ",
            description: `Không tìm thấy từ "${keyword}" trong từ điển`,
            variant: "destructive"
          });
          // Wait a moment before navigating back
          setTimeout(() => navigate('/dictionary'), 2000);
        }
      } catch (err) {
        console.error('Error fetching word definition:', err);
        setTimeout(() => navigate('/dictionary'), 2000);
      }
    };

    fetchWordDefinition();
  }, [keyword, navigate, request, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-engace-light dark:bg-gray-900">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-engace-purple mx-auto mb-4"></div>
            <p className="text-lg dark:text-white">Đang tải dữ liệu từ điển...</p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to empty definitions if data isn't loaded yet
  const resultData = wordData || {
    word: keyword.toUpperCase(),
    translations: [],
    examples: [],
    pronunciation: {
      ipa: "",
      spelling: ""
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-engace-light dark:bg-gray-900">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-4 px-4 animate-fade-in">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
              onClick={() => navigate('/dictionary')}
            >
              <ArrowLeft size={18} />
              Quay lại
            </Button>
          </div>

          <div className="border-b dark:border-gray-700 pb-3 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-engace-purple">{resultData.word}</h1>
              <Button variant="ghost" className="text-gray-500 rounded-full p-2">
                <Volume2 size={24} />
              </Button>
            </div>
          </div>

          {wordData ? (
            <div className="space-y-8">
              {/* Phát âm */}
              {wordData.phonetic && (
                <div>
                  <h2 className="text-xl font-bold mb-4">1. PHÁT ÂM</h2>
                  <ul className="list-disc pl-6 space-y-3">
                    <li><span className="font-medium">IPA:</span> {wordData.phonetic}</li>
                  </ul>
                </div>
              )}

              {/* Giải nghĩa */}
              {wordData.translations && wordData.translations.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">2. GIẢI NGHĨA</h2>
                  {wordData.translations.map((translation, index) => (
                    <div key={index} className="mb-4">
                      <ul className="list-disc pl-6 space-y-3">
                        <li>
                          <span className="font-medium">Nghĩa ({translation.partOfSpeech}):</span>
                          <ul className="list-disc pl-8 mt-2 space-y-2">
                            {translation.definitions.map((def, idx) => (
                              <li key={idx}>
                                <div>{def.definition}</div>
                                {def.example && (
                                  <div className="italic mt-1">Ví dụ: {def.example}</div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Examples */}
              {wordData.examples && wordData.examples.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">3. VÍ DỤ</h2>
                  <ul className="list-disc pl-6 space-y-3">
                    {wordData.examples.map((example, idx) => (
                      <li key={idx} className="italic">{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Words */}
              {wordData.relatedWords && wordData.relatedWords.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">4. TỪ LIÊN QUAN</h2>
                  <div className="flex flex-wrap gap-2">
                    {wordData.relatedWords.map((word, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="rounded-full border-gray-300"
                        onClick={() => {
                          navigate(`/dictionary/result?keyword=${encodeURIComponent(word)}`);
                        }}
                      >
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Không có dữ liệu từ điển cho từ này.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DictionaryResult;
