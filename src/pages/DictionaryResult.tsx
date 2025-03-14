
import React from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const DictionaryResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';

  // Mocked result data for the example
  const resultData = {
    word: keyword?.toUpperCase() || 'METICULOUS',
    pronunciation: {
      ipa: "/məˈtɪkjələs/ (Anh - Mỹ)",
      spelling: "me-TIC-u-lous (nhấn âm thứ hai)"
    },
    definitions: [
      {
        type: "Tính từ",
        mainDefinition: "Tỉ mỉ, kỹ lưỡng, chú trọng đến từng chi tiết nhỏ nhất.",
        examples: [
          {
            en: "She is a meticulous researcher.",
            vi: "Cô ấy là một nhà nghiên cứu rất tỉ mỉ."
          },
          {
            en: "He kept meticulous records.",
            vi: "Anh ấy lưu giữ hồ sơ một cách tỉ mỉ."
          }
        ]
      }
    ],
    usage: [
      {
        pattern: "be meticulous about (something)",
        meaning: "Tỉ mỉ về cái gì đó.",
        examples: [
          {
            en: "She's always been meticulous about her appearance.",
            vi: "Cô ấy luôn tỉ mỉ về ngoại hình của mình."
          }
        ]
      },
      {
        pattern: "meticulous attention to detail",
        meaning: "Sự chú ý tỉ mỉ đến từng chi tiết.",
        examples: [
          {
            en: "The project requires meticulous attention to detail.",
            vi: "Dự án này đòi hỏi sự chú ý tỉ mỉ đến từng chi tiết."
          }
        ]
      }
    ]
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

          <div className="space-y-8">
            {/* Phát âm */}
            <div>
              <h2 className="text-xl font-bold mb-4">1. PHÁT ÂM</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="font-medium">IPA:</span> {resultData.pronunciation.ipa}</li>
                <li><span className="font-medium">Trọng âm:</span> {resultData.pronunciation.spelling}</li>
              </ul>
            </div>

            {/* Giải nghĩa */}
            <div>
              <h2 className="text-xl font-bold mb-4">2. GIẢI NGHĨA</h2>
              {resultData.definitions.map((def, index) => (
                <div key={index} className="mb-4">
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <span className="font-medium">Nghĩa phổ biến nhất (tính từ):</span> {def.mainDefinition}
                      <ul className="list-disc pl-8 mt-2 space-y-2">
                        {def.examples.map((example, idx) => (
                          <li key={idx}>
                            <div className="italic">Ví dụ: {example.en} → {example.vi}</div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Ứng dụng */}
            <div>
              <h2 className="text-xl font-bold mb-4">3. ỨNG DỤNG VÀO NGỮ PHÁP</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="font-medium">Loại từ:</span> Tính từ</li>
                <li>
                  <span className="font-medium">Cấu trúc câu phổ biến:</span>
                  <ul className="list-disc pl-8 mt-2 space-y-4">
                    {resultData.usage.map((usage, idx) => (
                      <li key={idx}>
                        <div className="italic">{usage.pattern}: {usage.meaning}</div>
                        <ul className="list-disc pl-8 mt-2">
                          {usage.examples.map((example, exIdx) => (
                            <li key={exIdx} className="italic">
                              Ví dụ: {example.en} → {example.vi}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DictionaryResult;
