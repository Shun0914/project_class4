'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';
import { BudgetSettingModal } from '@/app/_components/BudgetSettingModal';
import { getBudget } from '@/lib/api/budget';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth() + 1);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  // 表示月の予算を取得
  useEffect(() => {
    if (user) {
      getBudget(viewYear, viewMonth)
        .then((res) => setCurrentBudget(res?.monthly_budget ?? null))
        .catch(() => setCurrentBudget(null));
    }
  }, [user, viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewYear((y) => y - 1);
      setViewMonth(12);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1);
      setViewMonth(1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffdf2]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden bg-[#fffdf2]">
      <div className="flex-1 overflow-y-auto px-[16px] pt-[60px] pb-[120px]">
        <h1 className="text-xl font-bold text-[#423f3e]">ダッシュボード</h1>

        {/* 月ナビゲーション */}
        <div className="flex items-center justify-center gap-[16px] mt-[16px]">
          <button onClick={handlePrevMonth} className="text-[#6a7282] text-lg">&lt;</button>
          <span className="text-[16px] font-bold text-[#423f3e]">{viewYear}年{String(viewMonth).padStart(2, '0')}月</span>
          <button onClick={handleNextMonth} className="text-[#6a7282] text-lg">&gt;</button>
        </div>

        {/* 予算セクション */}
        <div className="mt-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#423f3e]">
              {viewYear}年{String(viewMonth).padStart(2, '0')}月予算
            </h2>
            <button
              onClick={() => setIsBudgetOpen(true)}
              className="text-[14px] text-[#6a7282] hover:text-[#eb6b15] transition-colors"
            >
              設定
            </button>
          </div>

          {currentBudget != null ? (
            <p className="mt-[8px] text-[14px] text-[#423f3e]">
              予算: {currentBudget.toLocaleString()}円
            </p>
          ) : (
            <p className="mt-[8px] text-[14px] text-[#6a7282]">
              予算が設定されていません
            </p>
          )}
        </div>

        <p className="mt-[24px] text-sm text-[#5a6b8b]">ダッシュボードの詳細は準備中です</p>
      </div>

      <BudgetSettingModal
        open={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        onSuccess={() => {
          getBudget(viewYear, viewMonth)
            .then((res) => setCurrentBudget(res?.monthly_budget ?? null))
            .catch(() => setCurrentBudget(null));
        }}
        currentBudget={currentBudget}
        defaultYear={viewYear}
        defaultMonth={viewMonth}
      />

      <BottomNav />
    </div>
  );
}
