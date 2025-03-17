
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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

  return (
    <div className="min-h-screen flex flex-col bg-engace-light dark:bg-gray-900">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto py-4 px-4 animate-fade-in">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
              onClick={() => navigate('/dictionary')}
            >
              <ArrowLeft size={18} />
              Quay lại
            </Button>
            <Button 
              variant="ghost" 
              className="rounded-full p-2 text-gray-500"
              aria-label="Phát âm"
            >
              <Volume2 size={24} />
            </Button>
          </div>

          {wordData ? (
            <div className="space-y-8">
              {/* Word Title */}
              <h1 className="text-4xl font-bold text-purple-600 uppercase mb-2">
                {wordData.word}
              </h1>
              <Separator className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full" />
              
              {/* 1. Phát âm */}
              <div>
                <h2 className="text-xl font-bold mb-4">1. PHÁT ÂM</h2>
                <ul className="list-disc pl-6 space-y-3">
                  {wordData.phonetic && (
                    <li><span className="font-medium">IPA:</span> {wordData.phonetic} (Anh - Mỹ)</li>
                  )}
                  <li>
                    <span className="font-medium">Trọng âm:</span> {wordData.word.toUpperCase().split('').map((char, i) => 
                      i === 0 ? char : char.toLowerCase()
                    ).join('-')} (nhấn mạnh cả hai từ)
                  </li>
                </ul>
              </div>

              {/* 2. Giải nghĩa */}
              {wordData.translations && wordData.translations.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">2. GIẢI NGHĨA</h2>
                  <ul className="list-disc pl-6 space-y-5">
                    {wordData.translations.map((translation, index) => (
                      <li key={index}>
                        <div className="font-medium mb-2">
                          {index === 0 ? "Nghĩa phổ biến nhất:" : "Nghĩa khác:"} {translation.definitions[0].definition}
                        </div>
                        <ul className="list-disc pl-8 space-y-3">
                          {translation.definitions.map((def, idx) => (
                            def.example && (
                              <li key={idx} className="italic">
                                <span className="font-medium not-italic">Ví dụ:</span> {def.example} 
                                {/* Add translation if available */}
                                {def.example && (
                                  <span className="not-italic"> → {def.example}</span>
                                )}
                              </li>
                            )
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Ứng dụng vào ngữ pháp */}
              <div>
                <h2 className="text-xl font-bold mb-4">3. ỨNG DỤNG VÀO NGỮ PHÁP</h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <span className="font-medium">Loại từ:</span> {wordData.translations && wordData.translations[0] ? 
                      wordData.translations[0].partOfSpeech === 'noun' ? 'Danh từ' : 
                      wordData.translations[0].partOfSpeech === 'verb' ? 'Động từ' : 
                      wordData.translations[0].partOfSpeech === 'adjective' ? 'Tính từ' : 
                      wordData.translations[0].partOfSpeech === 'adverb' ? 'Trạng từ' : 
                      wordData.translations[0].partOfSpeech : 'Chưa xác định'}
                      {wordData.translations && wordData.translations[0] && wordData.translations[0].partOfSpeech === 'verb' && ' (phrasal verb)'}
                  </li>
                  <li>
                    <span className="font-medium">Cấu trúc câu phổ biến:</span>
                    <ul className="list-disc pl-8 mt-2 space-y-2">
                      <li>{wordData.word} + something (a plan, an order, a task, etc.)</li>
                      {wordData.examples && wordData.examples.map((example, idx) => (
                        <li key={idx} className="italic">
                          <span className="font-medium not-italic">Ví dụ:</span> {example} 
                          {/* Add translation if available */}
                          <span className="not-italic"> → {example}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Related Words if available */}
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
