import svgPaths from "./svg-dxcw8ohw0x";

function Notch() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-2px]" data-name="Notch">
      <div className="-translate-x-1/2 absolute h-[31px] left-1/2 top-[-2px] w-[164px]" data-name="Notch">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 31">
          <path d={svgPaths.paf70480} fill="var(--fill-0, #232323)" id="Notch" />
        </svg>
      </div>
    </div>
  );
}

function Battery() {
  return (
    <div className="absolute contents right-[14.67px] top-[17.33px]" data-name="Battery">
      <div className="absolute h-[11.333px] right-[17px] top-[17.33px] w-[22px]" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 11.3333">
          <path d={svgPaths.p7e6b880} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, #232323)" />
        </svg>
      </div>
      <div className="absolute h-[4px] right-[14.67px] top-[21px] w-[1.328px]" data-name="Combined Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32804 4">
          <path d={svgPaths.p32d253c0} fill="var(--fill-0, #232323)" id="Combined Shape" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute h-[7.333px] right-[19px] top-[19.33px] w-[18px]" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 7.33333">
          <path d={svgPaths.p22aabe00} fill="var(--fill-0, #232323)" id="Rectangle" />
        </svg>
      </div>
    </div>
  );
}

function RightSide() {
  return (
    <div className="absolute contents right-[14.67px] top-[17.33px]" data-name="Right Side">
      <Battery />
      <div className="absolute h-[10.966px] right-[44.03px] top-[17.33px] w-[15.272px]" data-name="Wifi">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2724 10.9656">
          <path clipRule="evenodd" d={svgPaths.p6c9880} fill="var(--fill-0, #232323)" fillRule="evenodd" id="Wifi" />
        </svg>
      </div>
      <div className="absolute h-[10.667px] right-[64.33px] top-[17.67px] w-[17px]" data-name="Mobile Signal">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10.6667">
          <path clipRule="evenodd" d={svgPaths.p2836df00} fill="var(--fill-0, #232323)" fillRule="evenodd" id="Mobile Signal" />
        </svg>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="absolute h-[21px] left-[24px] rounded-[24px] top-[12px] w-[54px]" data-name="_Time">
      <p className="-translate-x-1/2 absolute font-['Noto_Sans:SemiBold',sans-serif] font-semibold h-[20px] leading-[20px] left-[27px] text-[#232323] text-[15px] text-center top-px tracking-[-0.5px] w-[54px] whitespace-pre-wrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        9:41
      </p>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="absolute contents left-[24px] top-[12px]" data-name="Left Side">
      <Time />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-full" data-name="Status bar">
      <Notch />
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="header">
      <StatusBar />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[390px]">
      <Header />
    </div>
  );
}

function HomeIcon() {
  return (
    <div className="absolute left-0 size-[32px] top-px" data-name="HomeIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_2_23961)" id="HomeIcon">
          <mask height="32" id="mask0_2_23961" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_2_23961)">
            <path d={svgPaths.p2c2ce00} fill="url(#paint0_linear_2_23961)" id="Vector" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_23961" x1="6.13409" x2="27.6739" y1="4.83268" y2="27.009">
            <stop stopColor="#FFA04C" />
            <stop offset="0.331731" stopColor="#FBB441" />
            <stop offset="1" stopColor="#F06E23" />
          </linearGradient>
          <clipPath id="clip0_2_23961">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="inline_left">
      <HomeIcon />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px]" style={{ backgroundImage: "linear-gradient(156.058deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)", WebkitTextFillColor: "transparent" }}>
        ホーム
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft />
      <Title />
    </div>
  );
}

function ButtonMasterSp() {
  return (
    <div className="bg-[#f2f2f1] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[2px] relative rounded-[999px] shrink-0 w-[116px]" data-name="Button_Master_SP">
      <Frame1 />
    </div>
  );
}

function BarChartIcon() {
  return (
    <div className="absolute left-0 size-[32px] top-px" data-name="BarChartIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="BarChartIcon">
          <mask height="32" id="mask0_1_1328" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_1_1328)">
            <path d={svgPaths.p2af2ee00} fill="var(--fill-0, #7A7877)" id="bar_chart_4_bars" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function InlineLeft1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="inline_left">
      <BarChartIcon />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#7a7877] text-[12px]">ダッシュボード</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft1 />
      <Title1 />
    </div>
  );
}

function ButtonMasterSp1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[2px] relative rounded-[999px] shrink-0" data-name="Button_Master_SP">
      <Frame2 />
    </div>
  );
}

function SettingRoundedIcon() {
  return (
    <div className="absolute left-0 size-[32px] top-px" data-name="SettingRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SettingRoundedIcon">
          <mask height="32" id="mask0_1_1374" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_1_1374)">
            <path d={svgPaths.p16219380} fill="var(--fill-0, #7A7877)" id="Union" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function InlineLeft2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="inline_left">
      <SettingRoundedIcon />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#7a7877] text-[12px]">設定</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft2 />
      <Title2 />
    </div>
  );
}

function ButtonMasterSp2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[999px] shrink-0 w-[116px]" data-name="Button_Master_SP">
      <Frame3 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] bottom-[25px] content-stretch flex items-center left-[13px] p-[8px] rounded-[40px]">
      <ButtonMasterSp />
      <ButtonMasterSp1 />
      <ButtonMasterSp2 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.5] not-italic relative shrink-0 text-center w-full whitespace-pre-wrap">
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] relative shrink-0 text-[#2a3449] text-[16px] w-full">1月31日</p>
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] relative shrink-0 text-[#2a3449] text-[26px] w-full">おはようございます</p>
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] relative shrink-0 text-[#5a6b8b] text-[14px] w-full">👼今日乗り切れば目標達成だ！</p>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] items-center justify-between leading-[1.5] not-italic relative shrink-0 text-[16px] w-full" data-name="title">
      <p className="relative shrink-0 text-[#2a3449] w-[98px] whitespace-pre-wrap">2026年01月</p>
      <p className="relative shrink-0 text-[#01b7a5]">残り60%</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <div className="bg-[#f3f3f3] col-1 h-[20px] ml-0 mt-0 rounded-[8px] row-1 w-[334px]" />
      <div className="col-1 h-[20px] ml-0 mt-0 rounded-bl-[8px] rounded-tl-[8px] row-1 w-[166px]" style={{ backgroundImage: "linear-gradient(189.297deg, rgb(1, 183, 165) 23.571%, rgb(144, 229, 202) 48.801%, rgb(1, 183, 165) 74.03%)" }} />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center justify-end leading-[1.25] min-h-px min-w-px relative text-right">
      <p className="relative shrink-0 text-[20px]">10,000</p>
      <p className="relative shrink-0 text-[16px]">円</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center not-italic relative shrink-0 text-[#2a3449] w-full">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">予算</p>
      </div>
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center justify-end leading-[1.25] min-h-px min-w-px relative text-right">
      <p className="relative shrink-0 text-[20px]">4,000</p>
      <p className="relative shrink-0 text-[16px]">円</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center not-italic relative shrink-0 text-[#f13434] w-full">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">消費</p>
      </div>
      <Frame19 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center justify-end leading-[1.25] min-h-px min-w-px relative text-right">
      <p className="relative shrink-0 text-[20px]">6,000</p>
      <p className="relative shrink-0 text-[16px]">円</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center not-italic relative shrink-0 text-[#478dff] w-full">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">残金</p>
      </div>
      <Frame20 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[8px] py-[16px] relative size-full">
          <Frame13 />
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318 1">
                <line id="Line 159" stroke="var(--stroke-0, #E2E9F2)" x2="318" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <Frame14 />
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318 1">
                <line id="Line 159" stroke="var(--stroke-0, #E2E9F2)" x2="318" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function GraphArea() {
  return (
    <div className="content-stretch flex items-start relative rounded-[16px] shrink-0 w-full" data-name="graph_area">
      <Frame9 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Title3 />
      <Group />
      <GraphArea />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#2a3449] text-[14px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        直近のレポート
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#f7f6f5] h-[96px] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] h-[71px] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#0a0604] text-[16px] text-ellipsis w-full">
          <p className="leading-[1.5] whitespace-pre-wrap">ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。ここに一週間前のレポートが表示されます。</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame23 />
      <Frame21 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[8px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[12px] relative w-full">
          <Frame24 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function AddRoundedIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="AddRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="AddRoundedIcon">
          <mask height="24" id="mask0_2_23957" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_23957)">
            <path d={svgPaths.p363b8400} fill="url(#paint0_linear_2_23957)" id="Vector" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_23957" x1="2.7507" x2="21.0918" y1="2.1423" y2="22.7956">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="inline_left">
      <AddRoundedIcon />
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px]" style={{ backgroundImage: "linear-gradient(156.058deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        手入力
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft3 />
      <Title4 />
    </div>
  );
}

function ButtonMasterSp3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Button_Master_SP">
      <div aria-hidden="true" className="absolute border border-[#f68c44] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function DocumentIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="DocumentIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DocumentIcon">
          <mask height="24" id="mask0_2_23945" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_23945)">
            <path d={svgPaths.p280a9380} fill="url(#paint0_linear_2_23945)" id="description" />
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

function InlineLeft4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="inline_left">
      <DocumentIcon />
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px]" style={{ backgroundImage: "linear-gradient(167.483deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        レシート読込
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft4 />
      <Title5 />
    </div>
  );
}

function ButtonMasterSp4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Button_Master_SP">
      <div aria-hidden="true" className="absolute border border-[#f68c44] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function DashboardIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="DashboardIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_23942)" id="DashboardIcon">
          <path d={svgPaths.p37ed9900} fill="url(#paint0_linear_2_23942)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_23942" x1="1.59454" x2="23.7266" y1="0.170759" y2="23.5354">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
          <clipPath id="clip0_2_23942">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="inline_left">
      <DashboardIcon />
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px]" style={{ backgroundImage: "linear-gradient(161.581deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        AIコーチ
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft5 />
      <Title6 />
    </div>
  );
}

function ButtonMasterSp5() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Button_Master_SP">
      <div aria-hidden="true" className="absolute border border-[#f68c44] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative w-full">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full">
      <ButtonMasterSp3 />
      <ButtonMasterSp4 />
      <ButtonMasterSp5 />
    </div>
  );
}

function EdgeLeft() {
  return <div className="overflow-clip shrink-0 size-[24px]" data-name="edge_left" />;
}

function CurrencyYenIcon() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="CurrencyYenIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CurrencyYenIcon">
          <mask height="24" id="mask0_2_23938" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_23938)">
            <path d={svgPaths.p33f46540} fill="url(#paint0_linear_2_23938)" id="currency_yen" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_23938" x1="5.52549" x2="22.0039" y1="3.12807" y2="17.5604">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="inline_left">
      <CurrencyYenIcon />
    </div>
  );
}

function Title7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px]" style={{ backgroundImage: "linear-gradient(161.581deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        予算設定
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <InlineLeft6 />
      <Title7 />
    </div>
  );
}

function EdgeRight() {
  return <div className="overflow-clip shrink-0 size-[24px]" data-name="edge_right" />;
}

function ButtonMasterSp6() {
  return (
    <div className="bg-white h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button_Master_SP">
      <div aria-hidden="true" className="absolute border border-[#f68c44] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[4px] relative size-full">
          <EdgeLeft />
          <Frame7 />
          <EdgeRight />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[8px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
          <Frame26 />
          <ButtonMasterSp6 />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11px] items-start left-[16px] top-[84px] w-[358px]">
      <Frame28 />
      <Frame12 />
      <Frame29 />
    </div>
  );
}

function Modal() {
  return (
    <div className="absolute h-[844px] left-0 top-0 w-[390px]" data-name="Modal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 390 844">
        <path d="M0 0H390V844H0V0Z" fill="var(--fill-0, black)" fillOpacity="0.38" id="Overlay" />
      </svg>
    </div>
  );
}

function Frame17() {
  return <div className="content-stretch flex flex-col gap-px items-center justify-center overflow-clip shrink-0 size-[44px]" />;
}

function CloseRoundedIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CloseRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CloseRoundedIcon">
          <mask height="24" id="mask0_1_17749" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_17749)">
            <path d={svgPaths.p14d01a00} fill="var(--fill-0, #7C7A78)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[70px] shrink-0 size-[44px]">
      <CloseRoundedIcon />
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[20px] relative w-full">
          <Frame17 />
          <p className="font-['BIZ_UDPGothic:Bold',sans-serif] leading-[1.25] not-italic relative shrink-0 text-[#0a0604] text-[24px] text-center tracking-[0.96px]">AIコーチ分析</p>
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#f7f6f5] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center not-italic px-[20px] relative w-full">
          <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] relative shrink-0 text-[#2a3449] text-[14px]">今月の分析</p>
          <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] min-w-full relative shrink-0 text-[#0a0604] text-[16px] w-[min-content]">
            <p className="whitespace-pre-wrap">
              <span className="leading-[1.5]">ここに今月の鬼コーチによる分析結果のテキストが入ります。</span>
              <span className="font-['Noto_Sans_JP:Regular',sans-serif] leading-[1.5] not-italic">ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EdgeLeft1() {
  return <div className="overflow-clip shrink-0 size-[24px]" data-name="edge_left" />;
}

function DashboardIcon1() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="DashboardIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_23942)" id="DashboardIcon">
          <path d={svgPaths.p37ed9900} fill="url(#paint0_linear_2_23942)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_23942" x1="1.59454" x2="23.7266" y1="0.170759" y2="23.5354">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
          <clipPath id="clip0_2_23942">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="inline_left">
      <DashboardIcon1 />
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px]" style={{ backgroundImage: "linear-gradient(165.082deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        再分析する
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <InlineLeft7 />
      <Title8 />
    </div>
  );
}

function EdgeRight1() {
  return <div className="overflow-clip shrink-0 size-[24px]" data-name="edge_right" />;
}

function ButtonMasterSp7() {
  return (
    <div className="bg-white h-[48px] relative rounded-[32px] shrink-0 w-full" data-name="Button_Master_SP">
      <div aria-hidden="true" className="absolute border border-[#f68c44] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
          <EdgeLeft1 />
          <Frame8 />
          <EdgeRight1 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame11 />
      <ButtonMasterSp7 />
    </div>
  );
}

function LogbookDisplayEdit() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f7f6f5] bottom-[22px] content-stretch flex flex-col items-center left-1/2 pb-[40px] rounded-tl-[24px] rounded-tr-[24px] size-[390px]" data-name="logbook_display_edit">
      <Frame31 />
      <Frame30 />
    </div>
  );
}

export default function MepNativeBackup() {
  return (
    <div className="relative size-full" data-name="MEP-Native-backup. バックアップ確認画面" style={{ backgroundImage: "linear-gradient(154.633deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)" }}>
      <Frame />
      <Frame22 />
      <Frame27 />
      <Modal />
      <LogbookDisplayEdit />
    </div>
  );
}