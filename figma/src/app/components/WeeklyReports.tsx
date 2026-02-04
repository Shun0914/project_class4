import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ReportModal } from "@/app/components/ReportModal";

interface Report {
  id: number;
  title: string;
  content: string;
}

export function WeeklyReports() {
  const reports: Report[] = [
    {
      id: 1,
      title: "12/29~01/04 のレポート",
      content: "ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。"
    },
    {
      id: 2,
      title: "01/05~01/11 のレポート",
      content: "ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。"
    },
    {
      id: 3,
      title: "01/12~01/18 のレポート",
      content: "ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。"
    },
    {
      id: 4,
      title: "01/19~01/25 のレポート",
      content: "ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。"
    },
    {
      id: 5,
      title: "01/26~02/01 のレポート",
      content: "ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。"
    }
  ];

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="bg-[rgba(255,255,255,0.8)] flex flex-col items-start p-[16px] rounded-[16px] w-full">
      {/* Header */}
      <div className="flex gap-[4px] items-center pb-[8px] w-full">
        <p className="flex-1 font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[16px]">
          1週間のレポート
        </p>
      </div>

      {/* Reports List */}
      <div className="flex flex-col items-start pt-[8px] w-full">
        {reports.map((report, index) => (
          <div key={report.id} className="w-full">
            {/* Report Item */}
            <button className="flex flex-col gap-[8px] items-start py-[8px] w-full text-left" onClick={() => setSelectedReport(report)}>
              {/* Report Title */}
              <div className="flex items-center justify-between w-full">
                <p className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[14px]">
                  {report.title}
                </p>
                <ChevronRight className="size-[16px] text-[#6f6d6c]" />
              </div>
              
              {/* Report Content Preview */}
              <div className="w-full">
                <p className="font-['Noto_Sans_JP',sans-serif] font-normal leading-[1.5] text-[#5a6b8b] text-[14px] line-clamp-2">
                  {report.content}
                </p>
              </div>
            </button>
            
            {/* Divider */}
            {index < reports.length - 1 && (
              <div className="h-px w-full bg-[#e2e9f2]" />
            )}
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <ReportModal 
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={selectedReport.title}
          content={selectedReport.content}
        />
      )}
    </div>
  );
}