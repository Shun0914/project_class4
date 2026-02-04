import svgPaths from "@/imports/svg-oa4ibxvdmi";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
  year: number;
  month: number;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

export function MonthSelector({ year, month, onPrevMonth, onNextMonth }: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-between rounded-[12px] w-full">
      {/* Previous Month Button */}
      <button
        onClick={onPrevMonth}
        className="flex items-center justify-center rounded-[12px] shrink-0 size-[44px]"
      >
        <ChevronLeft className="size-[28px] text-[#eb6b15]" strokeWidth={3} />
      </button>

      {/* Month Display */}
      <p className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[22px]">
        {year}年{String(month).padStart(2, '0')}月
      </p>

      {/* Next Month Button */}
      <button
        onClick={onNextMonth}
        className="flex items-center justify-center rounded-[12px] shrink-0 size-[44px]"
      >
        <ChevronRight className="size-[28px] text-[#eb6b15]" strokeWidth={3} />
      </button>
    </div>
  );
}
