'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';
import { get } from '@/lib/api/client';
import type { AnalyzeResponse } from '@/lib/types/analyze';
import { ExpenseInputModal } from "./_components/ExpenseInputModal";
import { HistoryModal } from "./_components/HistoryModal";
import { BudgetSettingModal } from "./_components/BudgetSettingModal";
import { AICoachModal } from "./_components/AICoachModal";


export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && !user.nickname) {
      router.push('/setup');
    }
  }, [isLoading, user, router]);

  const fetchAnalyze = useCallback(() => {
    if (user?.nickname) {
      get<AnalyzeResponse>(`/api/analyze`)
        .then(setData)
        .catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    fetchAnalyze();
  }, [fetchAnalyze]);

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


  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remainingDays = daysInMonth - today.getDate();
  const greeting = today.getHours() < 12 ? 'おはようございます' : 
                   today.getHours() < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <div className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden bg-[#fffdf2]">
      <div className="flex-1 overflow-y-auto px-[16px] pt-[10px] pb-[120px]">
        <div className="flex flex-col gap-[16px] w-full">
          {/* Greeting */}
          <div className="flex flex-col gap-[4px] items-center text-center">
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
                {today.getFullYear()}年{String(today.getMonth() + 1).padStart(2, '0')}月{String(today.getDate()).padStart(2, '0')}日
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
                  background: data.remaining !== null && data.remaining < 0
                    ? 'linear-gradient(189.297deg, rgb(241, 52, 52) 23.571%, rgb(252, 165, 165) 48.801%, rgb(241, 52, 52) 74.03%)'
                    : 'linear-gradient(189.297deg, rgb(1, 183, 165) 23.571%, rgb(144, 229, 202) 48.801%, rgb(1, 183, 165) 74.03%)',
                  width: `${Math.min(100, 100 - (data.remaining_rate || 0))}%`,
                }}
              />
            </div>

            {/* Budget Overrun Alert
            {data.has_budget && data.remaining !== null && data.remaining < 0 && (
              <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-[8px] px-[12px] py-[1px] mb-[12px] flex items-center gap-[8px]">
                <span className="text-[18px]">&#x26A0;&#xFE0F;</span>
                <p className="text-[#dc2626] text-[13px] font-bold">
                  予算を{Math.abs(data.remaining).toLocaleString()}円オーバーしています
                </p>
              </div>
            )} */}

            {/* Budget Warning (remaining <= 10%)
            {data.has_budget && data.remaining !== null && data.remaining >= 0 && data.remaining_rate !== null && data.remaining_rate <= 10 && (
              <div className="bg-[#fffbeb] border border-[#fcd34d] rounded-[8px] px-[12px] py-[10px] mb-[12px] flex items-center gap-[8px]">
                <span className="text-[18px]">&#x26A1;</span>
                <p className="text-[#d97706] text-[13px] font-bold">
                  予算の残りが{data.remaining_rate.toFixed(0)}%です。節約を心がけましょう
                </p>
              </div>
            )} */}

            {/* Budget Details with Angel/Demon Icon */}
            <div className="flex items-center gap-[16px]">
              {/* Angel/Demon Image */}
              <div className="shrink-0 w-[80px] h-[80px] flex items-center justify-center">
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
                  <span className={`text-[16px] ${data.remaining !== null && data.remaining < 0 ? 'text-[#f13434]' : 'text-[#478dff]'}`}>残金</span>
                  <span className={`font-bold text-[20px] ${data.remaining !== null && data.remaining < 0 ? 'text-[#f13434]' : 'text-[#478dff]'}`}>
                    {data.remaining !== null ? `${data.remaining.toLocaleString()}円` : '未設定'}
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Report */}
            <div className="mt-[16px] pt-[16px] border-t border-[#e2e9f2]">
              <p className="text-[#0a0604] text-[14px] leading-relaxed">
                {data.weekly_report.start_date} ~ {data.weekly_report.end_date}<br />
                合計{data.weekly_report.total.toLocaleString()}円 （{data.weekly_report.count}件、平均{data.weekly_report.average.toLocaleString()}円）<br />
                {data.weekly_report.coach_message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-[12px] mt-[-6px]">
            <button 
                onClick={() => setIsInputOpen(true)}
                className="bg-white border border-[#f68c44] rounded-[16px] px-[12px] py-[12px] flex flex-col items-center gap-[4px] hover:bg-[#fff5f0] transition-colors shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]">
              <span className="text-[#eb6b15] text-[24px]">+</span>
              <span className="text-[#eb6b15] text-[14px] font-bold whitespace-nowrap">手入力</span>
            </button>
            <button className="bg-white border border-[#f68c44] rounded-[16px] px-[12px] py-[12px] flex flex-col items-center gap-[4px] hover:bg-[#fff5f0] transition-colors shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]">
              <span className="text-[#eb6b15] text-[24px]">📄</span>
              <span className="text-[#eb6b15] text-[14px] font-bold whitespace-nowrap">レシート読込</span>
            </button>
            <button 
              onClick={() => setIsAIModalOpen(true)}
              className="bg-white border border-[#f68c44] rounded-[16px] px-[12px] py-[12px] flex flex-col items-center gap-[4px] hover:bg-[#fff5f0] transition-colors shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]"
            >
              <span className="text-[#eb6b15] text-[24px]">📊</span>
              <span className="text-[#eb6b15] text-[14px] font-bold whitespace-nowrap">AIコーチ</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-[12px] mt-[-4px]">
            <button
              onClick={() => setIsBudgetOpen(true)}
              className={`rounded-[16px] p-[16px] flex items-center justify-center gap-[8px] transition-colors shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)] ${
                data.has_budget
                  ? 'bg-white border border-[#f68c44] hover:bg-[#fff5f0]'
                  : 'bg-[#eb6b15] border border-[#f68c44] hover:bg-[#d15a0a]'
              }`}
            >
              <span className={`text-[20px] ${data.has_budget ? 'text-[#eb6b15]' : 'text-white'}`}>¥</span>
              <span className={`text-[14px] font-bold whitespace-nowrap ${data.has_budget ? 'text-[#eb6b15]' : 'text-white'}`}>予算設定</span>
            </button>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="bg-white border border-[#f68c44] rounded-[16px] p-[16px] flex items-center justify-center gap-[8px] hover:bg-[#fff5f0] transition-colors shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]"
            >
              <span className="text-[#eb6b15] text-[20px]">🔄</span>
              <span className="text-[#eb6b15] text-[14px] font-bold whitespace-nowrap">内訳</span>
            </button>
          </div>
        </div>
      </div>

      {/* AIコーチモーダル */}
      <AICoachModal
        open={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        coachMode={data.coach_mode as 'angel' | 'demon'}
      />
      
      {/* 内訳モーダル */}
      <HistoryModal
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onAddExpense={() => setIsInputOpen(true)}
        refreshKey={historyRefreshKey}
      />

      {/* 予算設定モーダル */}
      <BudgetSettingModal
        open={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        currentBudget={data.budget}
        onSuccess={fetchAnalyze}
      />

      {/* ★ 手入力モーダル（内訳モーダルより上に表示されるよう z-[70]） */}
      <ExpenseInputModal
        open={isInputOpen}
        onClose={() => setIsInputOpen(false)}
        onSuccess={() => {
          setHistoryRefreshKey(k => k + 1);
          fetchAnalyze();
        }}
      />

      {/* フローティングボタン*/}
      <button
        type="button"
        aria-label="支出を入力"
        className="fixed bottom-[120px] right-[calc(50%-195px+16px+8px)] z-40 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white text-2xl shadow-lg"
        onClick={() => setIsInputOpen(true)}
      >
        +
      </button>

      <BottomNav />
    </div>
  );
}