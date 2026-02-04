import svgPaths from "@/imports/svg-oa4ibxvdmi";
import svgPaths2 from "@/imports/svg-1f3i968b6w";
import svgPathsDecember from "@/imports/svg-oo64g0gycn";
import { useState } from "react";
import { ReportModal } from "@/app/components/ReportModal";
import { BudgetSettingModal } from "@/app/components/BudgetSettingModal";
import { AICoachModal } from "@/app/components/AICoachModal";

interface BudgetSummaryCardProps {
  year: number;
  month: number;
  budget?: number;
  spent: number;
  remaining: number;
  percentage: number;
  isOverBudget: boolean;
  coachingMessage?: string;
  hasCoachingMessage?: boolean;
}

function DonutChart({ percentage, isOverBudget, categories, budget, year, month }: { percentage: number; isOverBudget: boolean; categories?: Array<{color: string, percentage: number}>; budget?: number; year?: number; month?: number }) {
  // Calculate the stroke dasharray for the progress
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  
  // Check if budget is not set
  const isBudgetSet = budget !== undefined && budget > 0;
  
  // Determine which SVG paths to use based on month/year
  const isDecember2025 = year === 2025 && month === 12;
  
  // Default single color mode
  if (!categories || categories.length === 0) {
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    
    return (
      <div className="bg-white flex flex-col items-center p-[8px] rounded-[16px] w-[126px]">
        <div className="aspect-square w-full relative">
          <svg className="block size-full -rotate-90" viewBox="0 0 130 130">
            {/* Background circle */}
            <circle
              cx="65"
              cy="65"
              r="55"
              fill="none"
              stroke="#F3F3F3"
              strokeWidth="20"
            />
            {/* Progress arc */}
            {!isOverBudget && isBudgetSet && (
              <circle
                cx="65"
                cy="65"
                r="55"
                fill="none"
                stroke="#FA4848"
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
              />
            )}
            {isOverBudget && (
              <circle
                cx="65"
                cy="65"
                r="55"
                fill="none"
                stroke="url(#overbudget-gradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeLinecap="round"
              />
            )}
            <defs>
              <linearGradient id="overbudget-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E91E63" />
                <stop offset="25%" stopColor="#FF6B9D" />
                <stop offset="50%" stopColor="#FFA726" />
                <stop offset="75%" stopColor="#4CAF50" />
                <stop offset="100%" stopColor="#2196F3" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#0a0604] text-[11px] leading-[1.2]">
              残り
            </p>
            <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#0a0604] text-[24px] leading-[1.2]">
              {!isBudgetSet ? '--' : (isOverBudget ? '0' : percentage)}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Multi-category donut chart - using SVG paths from Figma
  // Use December 2025 specific paths or default paths
  const paths = isDecember2025 ? svgPathsDecember : svgPaths;
  
  return (
    <div className="bg-white flex flex-col items-center p-[8px] rounded-[16px] w-[126px]">
      <div className="aspect-square w-full relative">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130 130">
          <ellipse cx="65" cy="65" rx="55" ry="55" stroke="#F3F3F3" strokeWidth="20" />
          {isDecember2025 ? (
            <>
              <path d={paths.p1fb99000} stroke="#FA4848" strokeWidth="10" />
              <path d={paths.p22847100} stroke="#FAB948" strokeWidth="10" />
              <path d={paths.pf0d4f00} stroke="#48DB3E" strokeWidth="10" />
              <path d={paths.p2b652900} stroke="#3EC3DB" strokeWidth="10" />
              <path d={paths.p143b4380} stroke="#483EDB" strokeWidth="10" />
              <path d={paths.p30a90840} stroke="#DB3EA4" strokeWidth="10" />
            </>
          ) : (
            <>
              <path d="M65 10C73.6796 10 82.236 12.0542 89.9695 15.9946C97.7031 19.9351 104.394 25.6499 109.496 32.6718" stroke="#FA4848" strokeWidth="10" />
              <path d="M109.496 32.6718C116.323 42.0684 120 53.3852 120 65" stroke="#FAB948" strokeWidth="10" />
              <path d="M120 65C120 70.7715 119.092 76.5069 117.308 81.9959" stroke="#48DB3E" strokeWidth="10" />
              <path d="M117.308 81.9959C115.525 87.4849 112.888 92.659 109.496 97.3282" stroke="#3EC3DB" strokeWidth="10" />
              <path d="M109.496 97.3282C106.104 101.997 101.997 106.104 97.3282 109.496" stroke="#483EDB" strokeWidth="10" />
              <path d="M98.0999 108.925C93.4906 112.398 88.3633 115.124 82.9063 117.003" stroke="#DB3EA4" strokeWidth="10" />
            </>
          )}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#0a0604] text-[11px] leading-[1.2]">
            残り
          </p>
          <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#0a0604] text-[24px] leading-[1.2]">
            {!isBudgetSet ? '--' : percentage}%
          </p>
        </div>
      </div>
    </div>
  );
}

function ReAnalyzeButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white flex items-center justify-between px-[16px] py-[7px] rounded-[16px] w-[153px] border border-[#eb6b15] border-solid shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)] hover:bg-[#fff5f0] transition-colors"
    >
      <div className="shrink-0 size-[16px]" />
      <div className="flex gap-[8px] items-center">
        <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
          <g clipPath="url(#clip0_1_1922)">
            <path
              d={svgPaths2.p1aa6baf0}
              fill="#EB6B15"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_1922">
              <rect fill="white" height="16" width="16" />
            </clipPath>
          </defs>
        </svg>
        <p className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#eb6b15] text-[12px]">
          再分析する
        </p>
      </div>
      <div className="shrink-0 size-[16px]" />
    </button>
  );
}

function AnalyzeButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-gradient-to-r from-[#f5a047] to-[#f7b563] flex items-center justify-center px-[24px] py-[12px] rounded-[24px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] hover:from-[#e08f36] hover:to-[#e6a552] transition-colors"
    >
      <div className="flex gap-[8px] items-center">
        <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
          <g>
            <path
              d={svgPaths2.p1aa6baf0}
              fill="white"
              transform="scale(1.5)"
            />
          </g>
        </svg>
        <p className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-white text-[16px]">
          分析する
        </p>
      </div>
    </button>
  );
}

export function BudgetSummaryCard({
  year,
  month,
  budget,
  spent,
  remaining,
  percentage,
  isOverBudget,
  coachingMessage,
  hasCoachingMessage,
}: BudgetSummaryCardProps) {
  const isBudgetSet = budget !== undefined && budget > 0;
  
  // Category data for the donut chart
  const categoryData = [
    { color: '#FA4848', percentage: 16.7 }, // 食費
    { color: '#FAB948', percentage: 16.7 }, // 日用品
    { color: '#48DB3E', percentage: 16.7 }, // 趣味・娯楽
    { color: '#3EC3DB', percentage: 16.7 }, // 交通費
    { color: '#483EDB', percentage: 16.6 }, // 水道・光熱費
    { color: '#DB3EA4', percentage: 16.7 }, // 未分類
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [isBudgetSettingModalOpen, setBudgetSettingModalOpen] = useState(false);
  const [isAICoachModalOpen, setAICoachModalOpen] = useState(false);

  return (
    <div className="bg-[rgba(255,255,255,0.8)] rounded-[8px] w-full">
      <div className="flex flex-col gap-[8px] items-start p-[12px]">
        {/* Title */}
        <div className="flex gap-[4px] items-center pb-[8px] w-full border-b border-[#c5d3e6]">
          <p className="flex-1 font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[16px]">
            {year}年{String(month).padStart(2, '0')}月予算
          </p>
          <button
            className="font-['Noto_Sans_JP',sans-serif] font-normal leading-[1.25] text-[#2a3449] text-[14px] underline"
            onClick={() => setBudgetSettingModalOpen(true)}
          >
            設定
          </button>
        </div>

        {/* Graph Area */}
        <div className="flex gap-[32px] items-start rounded-[16px] w-full">
          {/* Pie Chart */}
          <div className="flex flex-col gap-[6.94px] items-center justify-center p-[6px]">
            {!isOverBudget && isBudgetSet && (
              <div className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#01b7a5] text-[14px] text-center whitespace-nowrap">
                目標達成！
              </div>
            )}
            {isOverBudget && (
              <div className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#f35555] text-[14px] text-center whitespace-nowrap">
                予算オーバー
              </div>
            )}
            {!isBudgetSet && (
              <div className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[14px] text-center whitespace-nowrap">
                　
              </div>
            )}
            <DonutChart percentage={percentage} isOverBudget={isOverBudget} categories={isBudgetSet && !isOverBudget ? categoryData : undefined} budget={budget} year={year} month={month} />
          </div>

          {/* Budget Details */}
          <div className="flex-1 rounded-[16px]">
            <div className="flex flex-col gap-[8px] px-[8px] py-[16px]">
              {/* Budget Row */}
              <div className="flex gap-[8px] items-center justify-between w-full">
                <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#2a3449] text-[16px] whitespace-nowrap">
                  予算
                </p>
                <div className="flex items-end gap-[4px] text-right">
                  {isBudgetSet ? (
                    <>
                      <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[20px] leading-[1.25]">
                        {budget.toLocaleString()}
                      </p>
                      <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[1.25]">
                        円
                      </p>
                    </>
                  ) : (
                    <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[20px] leading-[1.25]">
                      未設定
                    </p>
                  )}
                </div>
              </div>

              <div className="h-0 w-full">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 148 1">
                  <line stroke="#E2E9F2" x2="148" y1="0.5" y2="0.5" />
                </svg>
              </div>

              {/* Spent Row */}
              <div className="flex gap-[8px] items-center justify-between w-full">
                <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#f35555] text-[16px] whitespace-nowrap">
                  消費
                </p>
                <div className="flex items-end gap-[4px] text-right">
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#f35555] text-[20px] leading-[1.25]">
                    {spent.toLocaleString()}
                  </p>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#f35555] text-[16px] leading-[1.25]">
                    円
                  </p>
                </div>
              </div>

              <div className="h-0 w-full">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 148 1">
                  <line stroke="#E2E9F2" x2="148" y1="0.5" y2="0.5" />
                </svg>
              </div>

              {/* Remaining Row */}
              <div className="flex gap-[8px] items-center justify-between w-full">
                <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#478dff] text-[16px] whitespace-nowrap">
                  残金
                </p>
                <div className="flex items-end gap-[4px] text-right">
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#478dff] text-[20px] leading-[1.25]">
                    {isBudgetSet ? remaining.toLocaleString() : '-'}
                  </p>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#478dff] text-[16px] leading-[1.25]">
                    円
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coaching Message */}
        {hasCoachingMessage && (
          <div className="flex flex-col gap-[8px] items-center justify-center w-full">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#f7f6f5] h-[96px] rounded-[16px] w-full cursor-pointer hover:bg-[#eeeeed] transition-colors"
            >
              <div className="flex flex-col items-start px-[8px] py-[16px] size-full">
                <div className="flex flex-col font-['Noto_Sans_JP',sans-serif] font-normal h-[71px] justify-center overflow-hidden text-[#0a0604] text-[16px] text-ellipsis w-full">
                  <p className="leading-[1.5] whitespace-pre-wrap line-clamp-3">{coachingMessage}</p>
                </div>
              </div>
            </button>
            <ReAnalyzeButton onClick={() => setAICoachModalOpen(true)} />
          </div>
        )}
        
        {/* Analyze Button - shown when no coaching message */}
        {!hasCoachingMessage && coachingMessage && (
          <div className="flex flex-col gap-[8px] items-center justify-center w-full">
            <div className="bg-[#f7f6f5] min-h-[60px] rounded-[16px] w-full flex items-center justify-center px-[8px] py-[12px]">
              <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#0a0604] text-[16px] leading-[1.5] text-center">
                {coachingMessage}
              </p>
            </div>
            <AnalyzeButton onClick={() => setAICoachModalOpen(true)} />
          </div>
        )}

        {/* Coaching Message Modal */}
        <ReportModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title=""
          content={coachingMessage || ""}
        />

        {/* Budget Setting Modal */}
        <BudgetSettingModal
          isOpen={isBudgetSettingModalOpen}
          onClose={() => setBudgetSettingModalOpen(false)}
          currentBudget={budget}
          selectedYear={year}
          selectedMonth={month}
          onSave={(newBudget) => {
            // TODO: Save budget to state management
            console.log(`Budget saved for ${year}/${month}: ${newBudget}`);
            setBudgetSettingModalOpen(false);
          }}
        />

        {/* AI Coach Modal */}
        <AICoachModal
          isOpen={isAICoachModalOpen}
          onClose={() => setAICoachModalOpen(false)}
          analysisText={coachingMessage}
          hasAnalysis={hasCoachingMessage}
        />
      </div>
    </div>
  );
}