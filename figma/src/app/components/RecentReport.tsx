import svgPaths from "@/imports/svg-phu49jyac3";
import { useState } from "react";
import { ReportModal } from "@/app/components/ReportModal";

interface RecentReportProps {
  reportText: string;
}

function ChevronRightRoundedIcon() {
  return (
    <div className="absolute left-0 size-[16px] top-[0.5px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <mask height="16" id="mask0_1_1310" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="16" x="0" y="0">
            <rect fill="#D9D9D9" height="16" width="16" />
          </mask>
          <g mask="url(#mask0_1_1310)">
            <path d={svgPaths.p1a77bf80} fill="#6F6D6C" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function RecentReport({ reportText }: RecentReportProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      {/* Header */}
      <div className="flex items-center w-full">
        <p className="font-['Noto_Sans',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[14px]">
          直近のレポート
        </p>
      </div>

      {/* Report Card */}
      <div className="flex flex-col items-center justify-center w-full">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f7f6f5] h-[96px] rounded-[16px] w-full cursor-pointer hover:bg-[#eeeeed] transition-colors"
        >
          <div className="flex flex-col items-start px-[8px] py-[16px] size-full">
            <div className="flex flex-col font-['Noto_Sans_JP',sans-serif] font-normal h-[71px] justify-center overflow-hidden text-[#0a0604] text-[16px] text-ellipsis w-full">
              <p className="leading-[1.5] whitespace-pre-wrap line-clamp-3">{reportText}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Report Modal */}
      <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="01/19-01/25 のレポート"
        content={reportText}
      />
    </div>
  );
}