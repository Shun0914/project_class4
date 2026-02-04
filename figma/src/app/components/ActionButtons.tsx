import svgPaths from "@/imports/svg-phu49jyac3";

function AddRoundedIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <mask height="24" id="mask0_1_1324" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="24" x="0" y="0">
            <rect fill="#D9D9D9" height="24" width="24" />
          </mask>
          <g mask="url(#mask0_1_1324)">
            <path d={svgPaths.p363b8400} fill="url(#paint0_linear_1_1324)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1324" x1="2.7507" x2="21.0918" y1="2.1423" y2="22.7956">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function DocumentIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <mask height="24" id="mask0_2_23945" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="#D9D9D9" height="24" width="24" />
          </mask>
          <g mask="url(#mask0_2_23945)">
            <path d={svgPaths.p280a9380} fill="url(#paint0_linear_2_23945)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_23945" x1="4.60056" x2="22.9708" y1="2.1423" y2="18.6913">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function DashboardIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1371)">
          <path d={svgPaths.p37ed9900} fill="url(#paint0_linear_1_1371)" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1371" x1="1.59454" x2="23.7266" y1="0.170759" y2="23.5354">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
          <clipPath id="clip0_1_1371">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CurrencyYenIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <mask height="24" id="mask0_1_1361" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="24" x="0" y="0">
            <rect fill="#D9D9D9" height="24" width="24" />
          </mask>
          <g mask="url(#mask0_1_1361)">
            <path d={svgPaths.p33f46540} fill="url(#paint0_linear_1_1361)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1361" x1="5.52549" x2="22.0039" y1="3.12807" y2="17.5604">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white flex-1 min-w-0 relative rounded-[16px] border border-[#f68c44] border-solid shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-col items-center justify-center px-[12px] py-[12px]">
        <div className="flex flex-col gap-[4px] items-center justify-center">
          <div className="overflow-clip relative shrink-0 size-[24px]">{icon}</div>
          <div className="flex items-center justify-center">
            <p
              className="bg-clip-text font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[16px] whitespace-nowrap"
              style={{
                backgroundImage:
                  'linear-gradient(156.058deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {label}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

function BudgetButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full border border-[#f68c44] border-solid shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[4px] relative size-full">
          <div className="overflow-clip shrink-0 size-[24px]" />
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <CurrencyYenIcon />
            </div>
            <div className="content-stretch flex items-center justify-center relative shrink-0">
              <p
                className="bg-clip-text font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] not-italic relative shrink-0 text-[16px]"
                style={{
                  backgroundImage:
                    'linear-gradient(161.581deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                予算設定
              </p>
            </div>
          </div>
          <div className="overflow-clip shrink-0 size-[24px]" />
        </div>
      </div>
    </button>
  );
}

export function ActionButtons({ onBudgetClick, onManualEntryClick, onReceiptScanClick, onAICoachClick }: { 
  onBudgetClick?: () => void; 
  onManualEntryClick?: () => void;
  onReceiptScanClick?: () => void;
  onAICoachClick?: () => void;
}) {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[8px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
          {/* Top Row - 3 Buttons */}
          <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full">
            <ActionButton icon={<AddRoundedIcon />} label="手入力" onClick={onManualEntryClick} />
            <ActionButton icon={<DocumentIcon />} label="レシート読込" onClick={onReceiptScanClick} />
            <ActionButton icon={<DashboardIcon />} label="AIコーチ" onClick={onAICoachClick} />
          </div>

          {/* Bottom Button */}
          <BudgetButton onClick={onBudgetClick} />
        </div>
      </div>
    </div>
  );
}