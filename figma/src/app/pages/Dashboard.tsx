import { StatusBar } from "@/app/components/StatusBar";
import { MonthSelector } from "@/app/components/MonthSelector";
import { BudgetSummaryCard } from "@/app/components/BudgetSummaryCard";
import { CategoryBreakdown } from "@/app/components/CategoryBreakdown";
import { FloatingAddButton } from "@/app/components/FloatingAddButton";
import { WeeklyReports } from "@/app/components/WeeklyReports";
import { useState } from "react";

interface DashboardProps {
  onManualEntryClick?: () => void;
}

// Mock data for different months
const getMonthData = (year: number, month: number) => {
  const key = `${year}-${month}`;
  
  const monthlyData: Record<string, any> = {
    "2026-1": {
      budget: 10000,
      spent: 4000,
      remaining: 6000,
      percentage: 60,
      isOverBudget: false,
      categories: [
        { id: 1, name: '食費', amount: 1200, percentage: 12.0, color: '#fa4848' },
        { id: 2, name: '日用品', amount: 800, percentage: 8.0, color: '#fab948' },
        { id: 3, name: '趣味・娯楽', amount: 500, percentage: 5.0, color: '#48db3e' },
        { id: 4, name: '交通費', amount: 500, percentage: 5.0, color: '#3ec3db' },
        { id: 5, name: '水道・光熱費', amount: 500, percentage: 5.0, color: '#483edb' },
        { id: 6, name: '未分類', amount: 500, percentage: 5.0, color: '#db3ea4' },
      ],
      hasCoachingMessage: true,
      coachingMessage: "ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。",
      hasWeeklyReports: true,
    },
    "2025-12": {
      budget: 10000,
      spent: 10000,
      remaining: 0,
      percentage: 0,
      isOverBudget: false,
      categories: [
        { id: 1, name: '食費', amount: 1200, percentage: 12.0, color: '#fa4848' },
        { id: 2, name: '日用品', amount: 800, percentage: 8.0, color: '#fab948' },
        { id: 3, name: '趣味・娯楽', amount: 500, percentage: 5.0, color: '#48db3e' },
        { id: 4, name: '交通費', amount: 500, percentage: 5.0, color: '#3ec3db' },
        { id: 5, name: '水道・光熱費', amount: 500, percentage: 5.0, color: '#483edb' },
        { id: 6, name: '未分類', amount: 6500, percentage: 65.0, color: '#db3ea4' },
      ],
      hasCoachingMessage: false,
      coachingMessage: "今月の分析結果はありません",
      hasWeeklyReports: true,
    },
    "2025-11": {
      budget: undefined,
      spent: 4000,
      remaining: 0,
      percentage: 0,
      isOverBudget: false,
      categories: [
        { id: 1, name: '食費', amount: 100, percentage: 2.5, color: '#fa4848' },
      ],
      hasCoachingMessage: false,
      coachingMessage: "今月の分析結果はありません",
      hasWeeklyReports: true,
    },
    "2025-10": {
      budget: 10000,
      spent: 14000,
      remaining: -6000,
      percentage: 0,
      isOverBudget: true,
      categories: [
        { id: 1, name: '食費', amount: 1200, percentage: 12.0, color: '#fa4848' },
        { id: 2, name: '日用品', amount: 800, percentage: 8.0, color: '#fab948' },
        { id: 3, name: '趣味・娯楽', amount: 500, percentage: 5.0, color: '#48db3e' },
        { id: 4, name: '交通費', amount: 500, percentage: 5.0, color: '#3ec3db' },
        { id: 5, name: '水道・光熱費', amount: 500, percentage: 5.0, color: '#483edb' },
        { id: 6, name: '未分類', amount: 10500, percentage: 105.0, color: '#db3ea4' },
      ],
      hasCoachingMessage: false,
      coachingMessage: "今月の分析結果はありません",
      hasWeeklyReports: true,
    },
  };
  
  return monthlyData[key] || {
    budget: undefined,
    spent: 0,
    remaining: 0,
    percentage: 0,
    isOverBudget: false,
    categories: [],
    hasCoachingMessage: false,
    coachingMessage: "今月の分析結果はありません",
    hasWeeklyReports: false,
  };
};

export function Dashboard({ onManualEntryClick }: DashboardProps) {
  const [currentDate, setCurrentDate] = useState({ year: 2026, month: 1 });
  
  const monthData = getMonthData(currentDate.year, currentDate.month);
  
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  return (
    <div
      className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(155.199deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)",
      }}
    >
      {/* Header */}
      <div className="shrink-0 w-full">
        <StatusBar />
        <div className="flex items-center pb-[8px] pl-[20px] pr-[16px] pt-[7px]">
          <h1 className="font-['Noto_Sans',sans-serif] font-bold leading-[1.5] text-[#423f3e] text-[21px]">
            ダッシュボード
          </h1>
        </div>
      </div>

      {/* Month Selector */}
      <div className="shrink-0 w-full px-[16px] pt-[16px]">
        <MonthSelector 
          year={currentDate.year} 
          month={currentDate.month}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-[16px] pt-[16px] pb-[120px]">
        <div className="flex flex-col gap-[16px] w-full">
          {/* Budget Summary Card */}
          <BudgetSummaryCard
            year={currentDate.year}
            month={currentDate.month}
            budget={monthData.budget}
            spent={monthData.spent}
            remaining={monthData.remaining}
            percentage={monthData.percentage}
            isOverBudget={monthData.isOverBudget}
            coachingMessage={monthData.coachingMessage}
            hasCoachingMessage={monthData.hasCoachingMessage}
          />

          {/* Category Breakdown */}
          {monthData.categories.length > 0 && (
            <CategoryBreakdown 
              categories={monthData.categories}
              year={currentDate.year}
              month={currentDate.month}
              onManualEntryClick={onManualEntryClick}
            />
          )}

          {/* Weekly Reports */}
          {monthData.hasWeeklyReports && <WeeklyReports />}
        </div>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={onManualEntryClick} />
    </div>
  );
}