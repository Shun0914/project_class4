interface BudgetProgressProps {
  budget: number;
  spent: number;
  remaining: number;
  percentage: number;
}

export function BudgetProgress({ budget, spent, remaining, percentage }: BudgetProgressProps) {
  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      {/* Title and Percentage */}
      <div className="flex font-['Noto_Sans_JP',sans-serif] font-bold items-center justify-between leading-[1.5] text-[16px] w-full">
        <p className="shrink-0 text-[#2a3449]">2026年01月</p>
        <p className="shrink-0 text-[#01b7a5]">残り{percentage}%</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full relative">
        <div className="bg-[#f3f3f3] h-[20px] rounded-[8px] w-full" />
        <div
          className="absolute top-0 left-0 h-[20px] rounded-bl-[8px] rounded-tl-[8px] transition-all duration-300"
          style={{
            backgroundImage:
              'linear-gradient(189.297deg, rgb(1, 183, 165) 23.571%, rgb(144, 229, 202) 48.801%, rgb(1, 183, 165) 74.03%)',
            width: `${100 - percentage}%`,
          }}
        />
      </div>

      {/* Budget Details */}
      <div className="w-full rounded-[16px]">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="flex flex-col gap-[8px] items-center justify-center px-[8px] py-[16px] w-full">
            {/* Budget Row */}
            <div className="flex gap-[8px] items-center justify-center text-[#2a3449] w-full">
              <div className="flex flex-col font-['Noto_Sans_JP',sans-serif] font-normal justify-center shrink-0 text-[16px] text-center whitespace-nowrap">
                <p className="leading-[1.5]">予算</p>
              </div>
              <div className="flex flex-1 font-['Noto_Sans_JP',sans-serif] font-bold gap-[4px] items-center justify-end leading-[1.25] text-right">
                <p className="shrink-0 text-[20px]">{budget.toLocaleString()}</p>
                <p className="shrink-0 text-[16px]">円</p>
              </div>
            </div>

            <div className="h-0 w-full relative">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318 1">
                  <line stroke="#E2E9F2" x2="318" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>

            {/* Spent Row */}
            <div className="flex gap-[8px] items-center justify-center text-[#f13434] w-full">
              <div className="flex flex-col font-['Noto_Sans_JP',sans-serif] font-normal justify-center shrink-0 text-[16px] text-center whitespace-nowrap">
                <p className="leading-[1.5]">消費</p>
              </div>
              <div className="flex flex-1 font-['Noto_Sans_JP',sans-serif] font-bold gap-[4px] items-center justify-end leading-[1.25] text-right">
                <p className="shrink-0 text-[20px]">{spent.toLocaleString()}</p>
                <p className="shrink-0 text-[16px]">円</p>
              </div>
            </div>

            <div className="h-0 w-full relative">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318 1">
                  <line stroke="#E2E9F2" x2="318" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>

            {/* Remaining Row */}
            <div className="flex gap-[8px] items-center justify-center text-[#478dff] w-full">
              <div className="flex flex-col font-['Noto_Sans_JP',sans-serif] font-normal justify-center shrink-0 text-[16px] text-center whitespace-nowrap">
                <p className="leading-[1.5]">残金</p>
              </div>
              <div className="flex flex-1 font-['Noto_Sans_JP',sans-serif] font-bold gap-[4px] items-center justify-end leading-[1.25] text-right">
                <p className="shrink-0 text-[20px]">{remaining.toLocaleString()}</p>
                <p className="shrink-0 text-[16px]">円</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}