// frontend/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';
import { getDashboardSummary } from '@/lib/api/dashboard';

// 共通および専用コンポーネントのインポート
import { MonthSelector } from '@/app/_components/MonthSelector';
import { BudgetSummaryCard } from '@/app/_components/BudgetSummaryCard';
import { CategoryBreakdown } from '@/app/_components/CategoryBreakdown';
import { BudgetSettingModal } from '@/app/_components/BudgetSettingModal';
import { HistoryModal } from '@/app/_components/HistoryModal';
import { ExpenseInputModal } from '@/app/_components/ExpenseInputModal';
import { AICoachModal } from '@/app/_components/AICoachModal';


/**
 * ダッシュボードページ
 * 収支のサマリー表示、月次切り替え、各種設定/登録モーダルの管理を行います。
 */
export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // 表示対象の年月（初期値は現在の年月）
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth() + 1);
  
  // 各モーダルの開閉状態を管理
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);   // 予算設定
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // 履歴一覧
  const [isInputOpen, setIsInputOpen] = useState(false);     // 支出登録
  const [isAIModalOpen, setIsAIModalOpen] = useState(false); // AI分析

  // APIから取得したサマリーデータとローディング状態
  const [summaryData, setSummaryData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  
  // 支出登録後に一覧やカードを再更新するためのトリガー
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  // 1. 認証チェック: ログインしていない場合はログイン画面へリダイレクト
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  /**
   * 2. データ取得関数: 指定年月のサマリー情報をバックエンドから取得
   */
  const fetchDashboardData = async () => {
    if (user) {
      try {
        setIsDataLoading(true);
        const res = await getDashboardSummary(viewYear, viewMonth);
        setSummaryData(res);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  // 表示月や更新フラグが変更された際にデータを再取得
  useEffect(() => { 
    fetchDashboardData(); 
  }, [user, viewYear, viewMonth, historyRefreshKey]);

  // 認証中または初期データ取得中はローディングを表示
  if (authLoading || isDataLoading) return <div className="p-10 text-center">読み込み中...</div>;

  return (
    <div className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden"
      style={{ backgroundImage: "linear-gradient(155.199deg, #fffdf2 0%, #fffcef 45.29%, #fff2ea 100%)" }}>
      
      {/* 画面ヘッダー */}
      <div className="shrink-0 w-full pt-[40px] px-[20px] pb-[10px]">
        <h1 className="font-bold text-[#423f3e] text-[21px]">ダッシュボード</h1>
      </div>

      {/* 月選択ナビゲーション */}
      <div className="shrink-0 w-full px-[16px] pt-[8px]">
        <MonthSelector 
          year={viewYear} 
          month={viewMonth}
          onPrevMonth={() => {
            if (viewMonth === 1) {
              setViewYear(prev => prev - 1); // 1月なら前年の12月へ
              setViewMonth(12);
            } else {
              setViewMonth(prev => prev - 1);
            }
          }}
          onNextMonth={() => {
            if (viewMonth === 12) {
              setViewYear(prev => prev + 1); // 12月なら翌年の1月へ
              setViewMonth(1);
            } else {
              setViewMonth(prev => prev + 1);
            }
          }}
        />
      </div>

      {/* メインコンテンツエリア（スクロール可能） */}
      <div className="flex-1 overflow-y-auto px-[16px] pt-[16px] pb-[120px]">
        <div className="flex flex-col gap-[16px] w-full">
          
          {/* 予算状況サマリーカード */}
          <BudgetSummaryCard
            year={viewYear}   
            month={viewMonth} 
            budget={summaryData?.total_budget}
            spent={summaryData?.total_spent}
            remaining={summaryData?.remaining_amount}
            categories={summaryData?.categories}
            status={summaryData?.status}
            onSettingsClick={() => setIsBudgetOpen(true)}
            onAnalyzeClick={() => setIsAIModalOpen(true)}
            coachMode={user?.coach_mode || summaryData?.coach_mode || 'demon'}
          />

          {/* カテゴリ別の支出内訳リスト */}
          {summaryData?.categories.length > 0 && (
            <CategoryBreakdown 
              categories={[...summaryData.categories].sort((a, b) => b.amount - a.amount)} 
              budget={summaryData?.total_budget}
              onHeaderClick={() => setIsHistoryOpen(true)} 
            />
          )}

          {/* 週次レポートエリアは未実装のためコメントアウト */}
          {/* <div className="p-4 bg-white/60 rounded-2xl border border-white">
            <p className="text-xs text-gray-400">1週間のレポート</p>
            <p className="text-sm font-bold mt-1">直近のレポートを表示 ＞</p>
          </div>
          */}
        </div>
      </div>

      {/* --- モーダルコンポーネント管理 --- */}

      {/* 1. 履歴閲覧モーダル */}
      <HistoryModal
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onAddExpense={() => {
          setIsHistoryOpen(false); // 履歴を閉じて
          setIsInputOpen(true);    // 登録を開く連携
        }}
        refreshKey={historyRefreshKey}
      />

      {/* 2. 予算設定モーダル */}
      <BudgetSettingModal
        open={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        onSuccess={fetchDashboardData} // 設定成功時に表示を更新
        currentBudget={summaryData?.total_budget}
        defaultYear={viewYear}
        defaultMonth={viewMonth}
      />

      {/* 3. 支出登録モーダル */}
      <ExpenseInputModal
        open={isInputOpen}
        onClose={() => setIsInputOpen(false)}
        onSuccess={() => setHistoryRefreshKey(k => k + 1)} // 登録成功時にデータを再取得
      />

      {/* 4. AIコーチ分析モーダル: ユーザー設定（天使/鬼）を優先反映 */}
      <AICoachModal 
        open={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        coachMode={(user?.coach_mode === 'devil' ? 'demon' : user?.coach_mode) || 'demon'}
      />

      {/* 浮遊アクションボタン (FAB): 支出登録ショートカット */}
      <button
        type="button"
        className="absolute bottom-28 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white text-3xl shadow-lg active:scale-95 transition-transform"
        onClick={() => setIsInputOpen(true)}
      >
        +
      </button>
      
      {/* 下部ナビゲーション */}
      <BottomNav />
    </div>
  );
}