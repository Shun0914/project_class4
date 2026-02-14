'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';
import { get } from '@/lib/api/client';
import type { AnalyzeResponse, AIAnalyzeResponse } from '@/lib/types/analyze';
import { ExpenseInputModal } from "./_components/ExpenseInputModal";
import { HistoryModal } from "./_components/HistoryModal";


export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && !user.nickname) {
      router.push('/setup');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (user?.nickname) {
      get<AnalyzeResponse>(`/api/analyze`)
        .then(setData)
        .catch(console.error);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffdf2]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  if (!user || !data) {
    return null;
  }

  const handleAICoachClick = () => {
    setIsAIModalOpen(true);
  };

  const handleStartAnalysis = async () => {
    if (user?.nickname) {
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
    }
  };

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remainingDays = daysInMonth - today.getDate();
  const greeting = today.getHours() < 12 ? 'おはようございます' : 
                   today.getHours() < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <div className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden bg-[#fffdf2]">
      <div className="flex-1 overflow-y-auto px-[16px] pt-[60px] pb-[120px]">
        <div className="flex flex-col gap-[16px] w-full">
          {/* Greeting */}
          <div className="flex flex-col gap-[4px] items-center text-center">
            <p className="font-bold text-[#2a3449] text-[16px]">
              {today.getMonth() + 1}月{today.getDate()}日
            </p>
            <p className="font-bold text-[#2a3449] text-[26px]">
              {greeting}
            </p>
            <p className="font-normal text-[#5a6b8b] text-[14px]">
              {data.coach_message.substring(0, 30)}
            </p>
          </div>

          {/* Budget Card */}
          <div className="bg-white/80 rounded-[16px] p-[16px] shadow-sm">
            {/* Month and Remaining Days */}
            <div className="flex items-center justify-between mb-[12px]">
              <p className="font-bold text-[#2a3449] text-[16px]">
                {today.getFullYear()}年{String(today.getMonth() + 1).padStart(2, '0')}月
              </p>
              <p className="font-bold text-[#01b7a5] text-[16px]">
                残り{remainingDays}日！
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full relative mb-[16px]">
              <div className="bg-[#f3f3f3] h-[20px] rounded-[8px] w-full" />
              <div
                className="absolute top-0 left-0 h-[20px] rounded-[8px] transition-all duration-300"
                style={{
                  background: 'linear-gradient(189.297deg, rgb(1, 183, 165) 23.571%, rgb(144, 229, 202) 48.801%, rgb(1, 183, 165) 74.03%)',
                  width: `${100 - (data.remaining_rate || 0)}%`,
                }}
              />
            </div>

            {/* Budget Details with Angel/Demon Icon */}
            <div className="flex items-start gap-[16px]">
              {/* Angel/Demon Image */}
              <div className="shrink-0 w-[80px] h-[80px]">
                <Image
                  src={data.coach_mode === 'angel' ? '/angel.svg' : '/demon.svg'}
                  alt={data.coach_mode === 'angel' ? '天使' : '鬼'}
                  width={80}
                  height={80}
                />
              </div>

              {/* Budget Numbers */}
              <div className="flex-1 space-y-[8px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#2a3449] text-[16px]">予算</span>
                  <span className="font-bold text-[#2a3449] text-[20px]">
                    {data.budget ? `${data.budget.toLocaleString()}円` : '未設定'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f13434] text-[16px]">消費</span>
                  <span className="font-bold text-[#f13434] text-[20px]">
                    {data.total.toLocaleString()}円
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#478dff] text-[16px]">残金</span>
                  <span className="font-bold text-[#478dff] text-[20px]">
                    {data.remaining !== null ? `${data.remaining.toLocaleString()}円` : '未設定'}
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Report */}
            <div className="mt-[16px] pt-[16px] border-t border-[#e2e9f2]">
              <p className="text-[#0a0604] text-[14px] leading-relaxed">
                {data.weekly_report.start_date} ~ {data.weekly_report.end_date}<br />
                合計{data.weekly_report.total.toLocaleString()}円使用しました。<br />
                （{data.weekly_report.count}件、平均{data.weekly_report.average.toLocaleString()}円）<br />
                {data.weekly_report.coach_message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-[12px]">
            <button 
                onClick={() => setIsInputOpen(true)}
                className="bg-white border-2 border-[#eb6b15] rounded-[12px] p-[16px] flex flex-col items-center gap-[8px] hover:bg-[#fff5f0] transition-colors">
              <span className="text-[#eb6b15] text-[24px]">+</span>
              <span className="text-[#eb6b15] text-[14px] font-bold">手入力</span>
            </button>
            <button className="bg-white border-2 border-[#eb6b15] rounded-[12px] p-[16px] flex flex-col items-center gap-[8px] hover:bg-[#fff5f0] transition-colors">
              <span className="text-[#eb6b15] text-[24px]">📄</span>
              <span className="text-[#eb6b15] text-[14px] font-bold">レシート読込</span>
            </button>
            <button 
              onClick={handleAICoachClick}
              className="bg-white border-2 border-[#eb6b15] rounded-[12px] p-[16px] flex flex-col items-center gap-[8px] hover:bg-[#fff5f0] transition-colors"
            >
              <span className="text-[#eb6b15] text-[24px]">📊</span>
              <span className="text-[#eb6b15] text-[14px] font-bold">AIコーチ</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-[12px]">
            <button className="bg-white border-2 border-[#eb6b15] rounded-[12px] p-[16px] flex items-center justify-center gap-[8px] hover:bg-[#fff5f0] transition-colors">
              <span className="text-[#eb6b15] text-[20px]">¥</span>
              <span className="text-[#eb6b15] text-[14px] font-bold">予算設定</span>
            </button>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="bg-white border-2 border-[#eb6b15] rounded-[12px] p-[16px] flex items-center justify-center gap-[8px] hover:bg-[#fff5f0] transition-colors"
            >
              <span className="text-[#eb6b15] text-[20px]">🔄</span>
              <span className="text-[#eb6b15] text-[14px] font-bold">内訳</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Coach Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40" 
            onClick={() => setIsAIModalOpen(false)}
          />
          <div className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden">
            <div className="flex items-center justify-center px-[16px] py-[20px] w-full border-b border-[#e2e9f2] relative">
              <h2 className="font-bold text-[#2a3449] text-[20px]">AIコーチ分析</h2>
              <button
                onClick={() => setIsAIModalOpen(false)}
                className="absolute right-[16px] flex items-center justify-center size-[40px] rounded-full hover:bg-gray-200/50 transition-colors"
              >
                <span className="text-[#7C7A78] text-[24px]">×</span>
              </button>
            </div>
            <div className="px-[16px] py-[24px] flex flex-col gap-[20px]">
              <h3 className="font-bold text-[16px] text-[#2a3449]">今月の分析</h3>
              {aiAnalysis ? (
                <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] max-h-[400px] overflow-y-auto prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {aiAnalysis}
                  </ReactMarkdown>
                </div>
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
                      src={data.coach_mode === 'angel' ? '/angel.svg' : '/demon.svg'}
                      alt={data.coach_mode === 'angel' ? '天使' : '鬼'}
                      width={24}
                      height={24}
                    />
                    分析開始
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* 内訳モーダル */}
      <HistoryModal
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onAddExpense={() => setIsInputOpen(true)}
        refreshKey={historyRefreshKey}
      />

      {/* ★ 手入力モーダル（内訳モーダルより上に表示されるよう z-[70]） */}
      <ExpenseInputModal
        open={isInputOpen}
        onClose={() => setIsInputOpen(false)}
        onSuccess={() => setHistoryRefreshKey(k => k + 1)}
      />

      <button
        type="button"
        aria-label="支出を入力"
        className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white text-3xl shadow-lg"
        onClick={() => setIsInputOpen(true)}
      >
        +
      </button>

      <BottomNav />
    </div>
  );
}
