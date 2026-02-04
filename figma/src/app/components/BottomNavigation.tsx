import svgPaths from "@/imports/svg-phu49jyac3";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface BottomNavigationProps {
  activeTab: 'home' | 'dashboard' | 'settings';
  onTabChange: (tab: 'home' | 'dashboard' | 'settings') => void;
}

function NavButton({ icon, label, active = false, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[999px] ${
        active ? 'bg-[#f2f2f1]' : ''
      }`}
    >
      <div className="flex flex-col gap-[4px] items-center justify-center">
        <div className="overflow-clip relative shrink-0 size-[32px]">
          {icon}
        </div>
        <div className="flex items-center justify-center">
          <p
            className={`font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[12px] whitespace-nowrap ${
              active ? 'bg-clip-text' : 'text-[#7a7877]'
            }`}
            style={
              active
                ? {
                    backgroundImage:
                      'linear-gradient(156.058deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)',
                    WebkitTextFillColor: 'transparent',
                  }
                : undefined
            }
          >
            {label}
          </p>
        </div>
      </div>
    </button>
  );
}

function HomeIcon({ active = false }: { active?: boolean }) {
  return (
    <div className="absolute left-0 size-[32px] top-px">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_1336)">
          <mask height="32" id="mask0_1_1336" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="32" x="0" y="0">
            <rect fill="#D9D9D9" height="32" width="32" />
          </mask>
          <g mask="url(#mask0_1_1336)">
            <path
              d={svgPaths.p2c2ce00}
              fill={active ? 'url(#paint0_linear_1_1336)' : '#7a7877'}
            />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1336" x1="6.13409" x2="27.6739" y1="4.83268" y2="27.009">
            <stop stopColor="#FFA04C" />
            <stop offset="0.331731" stopColor="#FBB441" />
            <stop offset="1" stopColor="#F06E23" />
          </linearGradient>
          <clipPath id="clip0_1_1336">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BarChartIcon({ active = false }: { active?: boolean }) {
  return (
    <div className="absolute left-0 size-[32px] top-px">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          <mask height="32" id="mask0_1_1328" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="32" x="0" y="0">
            <rect fill="#D9D9D9" height="32" width="32" />
          </mask>
          <g mask="url(#mask0_1_1328)">
            <path d={svgPaths.p2af2ee00} fill={active ? 'url(#paint0_linear_1_1328)' : '#7a7877'} />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1328" x1="6.13409" x2="27.6739" y1="4.83268" y2="27.009">
            <stop stopColor="#FFA04C" />
            <stop offset="0.331731" stopColor="#FBB441" />
            <stop offset="1" stopColor="#F06E23" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function SettingRoundedIcon({ active = false }: { active?: boolean }) {
  return (
    <div className="absolute left-0 size-[32px] top-px">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          <mask height="32" id="mask0_1_1374" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="32" x="0" y="0">
            <rect fill="#D9D9D9" height="32" width="32" />
          </mask>
          <g mask="url(#mask0_1_1374)">
            <path d={svgPaths.p16219380} fill={active ? 'url(#paint0_linear_1_1374)' : '#7a7877'} />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1374" x1="6.13409" x2="27.6739" y1="4.83268" y2="27.009">
            <stop stopColor="#FFA04C" />
            <stop offset="0.331731" stopColor="#FBB441" />
            <stop offset="1" stopColor="#F06E23" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] flex items-center p-[8px] rounded-[40px] w-full">
      <NavButton 
        icon={<HomeIcon active={activeTab === 'home'} />} 
        label="ホーム" 
        active={activeTab === 'home'}
        onClick={() => onTabChange('home')}
      />
      <NavButton 
        icon={<BarChartIcon active={activeTab === 'dashboard'} />} 
        label="ダッシュボード" 
        active={activeTab === 'dashboard'}
        onClick={() => onTabChange('dashboard')}
      />
      <NavButton 
        icon={<SettingRoundedIcon active={activeTab === 'settings'} />} 
        label="設定" 
        active={activeTab === 'settings'}
        onClick={() => onTabChange('settings')}
      />
    </div>
  );
}