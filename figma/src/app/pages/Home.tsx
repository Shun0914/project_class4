import { StatusBar } from "@/app/components/StatusBar";
import { BudgetProgress } from "@/app/components/BudgetProgress";
import { RecentReport } from "@/app/components/RecentReport";
import { ActionButtons } from "@/app/components/ActionButtons";
import { BudgetSettingModal } from "@/app/components/BudgetSettingModal";
import { useState } from "react";

interface HomeProps {
  onManualEntryClick?: () => void;
  onReceiptScanClick?: () => void;
  onAICoachClick?: () => void;
}

export function Home({ onManualEntryClick, onReceiptScanClick, onAICoachClick }: HomeProps) {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  
  // Mock data - 後でAPIから取得
  const [budgetData, setBudgetData] = useState({
    budget: 10000,
    spent: 4000,
    remaining: 6000,
    percentage: 60,
  });

  const reportText =
    "ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。";

  const handleBudgetSave = (newBudget: number) => {
    // Update budget and recalculate
    const spent = budgetData.spent;
    const remaining = newBudget - spent;
    const percentage = remaining > 0 ? Math.round((remaining / newBudget) * 100) : 0;
    
    setBudgetData({
      budget: newBudget,
      spent,
      remaining,
      percentage,
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header with Status Bar */}
      <div className="shrink-0 w-full">
        <StatusBar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-[16px] pt-[40px] pb-[120px]">
        <div className="flex flex-col gap-[11px] w-full">
          {/* Greeting Section */}
          <div className="flex flex-col gap-[4px] items-start leading-[1.5] w-full text-center">
            <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] w-full">
              1月31日
            </p>
            <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[26px] w-full">
              おはようございます
            </p>
            <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] w-full">
              👼今日乗り切れば目標達成だ！
            </p>
          </div>

          {/* Budget Progress Card */}
          <div className="bg-[rgba(255,255,255,0.8)] rounded-[8px] w-full">
            <div className="flex flex-col gap-[16px] items-start p-[12px]">
              <BudgetProgress
                budget={budgetData.budget}
                spent={budgetData.spent}
                remaining={budgetData.remaining}
                percentage={budgetData.percentage}
              />
              <RecentReport reportText={reportText} />
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons 
            onBudgetClick={() => setIsBudgetModalOpen(true)}
            onManualEntryClick={onManualEntryClick}
            onReceiptScanClick={onReceiptScanClick}
            onAICoachClick={onAICoachClick}
          />
        </div>
      </div>

      {/* Budget Setting Modal */}
      <BudgetSettingModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        currentBudget={budgetData.budget}
        onSave={handleBudgetSave}
      />
    </div>
  );
}