'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { get } from '@/lib/api/client';
import type { AIAnalyzeResponse } from '@/lib/types/analyze';

type Props = {
  open: boolean;
  onClose: () => void;
  coachMode: 'angel' | 'demon';
};

export function AICoachModal({ open, onClose, coachMode }: Props) {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // モーダルを開くたびに前回の分析結果をリセット
  useEffect(() => {
    if (open) {
      setAiAnalysis(null);
    }
  }, [open]);

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await get<AIAnalyzeResponse>(`/api/ai-analyze`);
      setAiAnalysis(response.ai_message);
    } catch (error) {
      console.error('AI分析エラー:', error);
      if (error instanceof Error && error.message.includes('予算が設定されていません')) {
        setAiAnalysis('予算が設定されていません。先に予算を設定してください。');
      } else {
        setAiAnalysis('AI分析の取得に失敗しました。');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div key="aicoach-modal-root" className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            key="aicoach-overlay"
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="aicoach-content"
            className="relative bg-[#fffdf2] rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden flex flex-col h-[calc(100vh-44px)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
        <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2] bg-white shrink-0">
          <div className="w-[40px]" />
          <h2 className="font-bold text-[#2a3449] text-[20px]">AIコーチ分析</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="size-[24px] text-[#7C7A78]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[16px] py-[24px] flex flex-col gap-[20px]">
          <h3 className="font-bold text-[16px] text-[#2a3449]">今月の分析</h3>
          {aiAnalysis ? (
            <>
              <div className="bg-[#f7f6f5] rounded-[16px] px-[20px] py-[20px] overflow-y-auto prose max-w-none prose-headings:text-[#2a3449] prose-headings:text-[15px] prose-headings:mt-[16px] prose-headings:mb-[8px] prose-p:text-[14px] prose-p:leading-[1.8] prose-p:text-[#3a3a3a] prose-p:my-[8px] prose-li:text-[14px] prose-li:leading-[1.8] prose-li:text-[#3a3a3a] prose-li:my-[4px] prose-strong:text-[#2a3449] prose-ul:my-[8px] prose-ol:my-[8px]">
                <ReactMarkdown>
                  {aiAnalysis}
                </ReactMarkdown>
              </div>
              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-[8px] py-[14px] rounded-[8px] font-bold text-[16px] transition-colors border border-[#eb6b15] bg-white text-[#eb6b15] hover:bg-[#fff5f0] disabled:bg-[#9ca3af] disabled:text-white disabled:cursor-not-allowed disabled:border-[#9ca3af]"
              >
                {isAnalyzing ? (
                  <>
                    <div className="size-[20px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                    再分析する
                  </>
                ) : (
                  <>
                    <Image
                      src={coachMode === 'angel' ? '/angel.svg' : '/demon.svg'}
                      alt={coachMode === 'angel' ? '天使' : '鬼'}
                      width={16}
                      height={16}
                    />
                    再分析する
                  </>
                )}
              </button>
            </>
          ) : isAnalyzing ? (
            <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] min-h-[200px] flex items-center justify-center">
              <div className="animate-spin size-[40px] border-4 border-[#eb6b15] border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-[16px]">
              <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] min-h-[120px] flex items-center justify-center w-full">
                <p className="text-[16px] text-[#6a7282] text-center">分析開始ボタンを押してください</p>
              </div>
              <button
                onClick={handleStartAnalysis}
                className="w-full bg-gradient-to-r from-[#f5a047] to-[#f7b563] text-white py-[14px] rounded-[8px] font-bold text-[16px] hover:from-[#e08f36] hover:to-[#e6a552] transition-colors flex items-center justify-center gap-[8px]"
              >
                <Image
                  src={coachMode === 'angel' ? '/angel.svg' : '/demon.svg'}
                  alt={coachMode === 'angel' ? '天使' : '鬼'}
                  width={24}
                  height={24}
                />
                分析開始
              </button>
            </div>
          )}
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
