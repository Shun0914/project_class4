import svgPaths from "./svg-me42fw6bw3";

function Chevron() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="chevron">
          <path d={svgPaths.p3472a680} id="Vector" stroke="var(--stroke-0, #EB6B15)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function ChevronButton() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[44px]" data-name="chevron_button">
      <Chevron />
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="chevron">
          <path d={svgPaths.p349b8c00} id="Vector" stroke="var(--stroke-0, #EB6B15)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function ChevronButton1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[44px]" data-name="chevron_button">
      <Chevron1 />
    </div>
  );
}

function DateDefault() {
  return (
    <div className="content-stretch flex items-center justify-between relative rounded-[12px] shrink-0 w-[358px]" data-name="date/Default">
      <ChevronButton />
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#2a3449] text-[22px]">2026年01月</p>
      <ChevronButton1 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] top-[110px] w-[358px]">
      <DateDefault />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] relative shrink-0 w-full" data-name="title">
      <div aria-hidden="true" className="absolute border-[#c5d3e6] border-b border-solid inset-0 pointer-events-none" />
      <p className="flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[#2a3449] text-[16px] whitespace-pre-wrap">2026年01月予算</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Noto_Sans_JP:Regular',sans-serif] leading-[1.25] not-italic relative shrink-0 text-[#2a3449] text-[14px] underline">設定</p>
    </div>
  );
}

function Group() {
  return (
    <div className="aspect-[109.76204681396484/109.76203918457031] relative shrink-0 w-full">
      <div className="absolute inset-[-9.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130 130">
          <g id="Group 26086853">
            <ellipse cx="65" cy="65" id="Ellipse 112" rx="55" ry="55" stroke="var(--stroke-0, #F3F3F3)" strokeWidth="20" />
            <path d={svgPaths.p1fb99000} id="Ellipse 169" stroke="var(--stroke-0, #FA4848)" strokeWidth="10" />
            <path d={svgPaths.p22847100} id="Ellipse 170" stroke="var(--stroke-0, #FAB948)" strokeWidth="10" />
            <path d={svgPaths.pf0d4f00} id="Ellipse 171" stroke="var(--stroke-0, #48DB3E)" strokeWidth="10" />
            <path d={svgPaths.p2b652900} id="Ellipse 172" stroke="var(--stroke-0, #3EC3DB)" strokeWidth="10" />
            <path d={svgPaths.p143b4380} id="Ellipse 173" stroke="var(--stroke-0, #483EDB)" strokeWidth="10" />
            <path d={svgPaths.p3a273880} id="Ellipse 174" stroke="var(--stroke-0, #DB3EA4)" strokeWidth="10" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center leading-[0] not-italic relative shrink-0 text-[#0a0604] whitespace-nowrap">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center relative shrink-0 text-[11px]">
        <p className="leading-[1.2]">残り</p>
      </div>
      <div className="flex flex-col font-['Noto_Sans_JP:Bold',sans-serif] justify-center relative shrink-0 text-[24px]">
        <p className="leading-[1.2]">60%</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-center left-[calc(50%+0.5px)] top-[36px]">
      <Frame />
    </div>
  );
}

function DashboardWeeklyChart() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center p-[8px] relative rounded-[16px] shrink-0 w-[126px]" data-name="DashboardWeeklyChart">
      <Group />
      <Frame21 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <DashboardWeeklyChart />
    </div>
  );
}

function PieChartArea() {
  return (
    <div className="content-stretch flex flex-col gap-[6.94px] items-center justify-center p-[6px] relative shrink-0" data-name="pieChartArea">
      <div className="flex flex-col font-['Noto_Sans_JP:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#01b7a5] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">目標達成！</p>
      </div>
      <Frame28 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center justify-end leading-[1.25] min-h-px min-w-px relative text-right">
      <p className="relative shrink-0 text-[20px]">10,000</p>
      <p className="relative shrink-0 text-[16px]">円</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center not-italic relative shrink-0 text-[#2a3449] w-full">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">予算</p>
      </div>
      <Frame29 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center justify-end leading-[1.25] min-h-px min-w-px relative text-right">
      <p className="relative shrink-0 text-[20px]">4,000</p>
      <p className="relative shrink-0 text-[16px]">円</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center not-italic relative shrink-0 text-[#f35555] w-full">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">消費</p>
      </div>
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center justify-end leading-[1.25] min-h-px min-w-px relative text-right">
      <p className="relative shrink-0 text-[20px]">6,000</p>
      <p className="relative shrink-0 text-[16px]">円</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center not-italic relative shrink-0 text-[#478dff] w-full">
      <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.5]">残金</p>
      </div>
      <Frame31 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[8px] py-[16px] relative size-full">
          <Frame23 />
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 148 1">
                <line id="Line 159" stroke="var(--stroke-0, #E2E9F2)" x2="148" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <Frame24 />
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 148 1">
                <line id="Line 159" stroke="var(--stroke-0, #E2E9F2)" x2="148" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function GraphArea() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative rounded-[16px] shrink-0 w-full" data-name="graph_area">
      <PieChartArea />
      <Frame19 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#f7f6f5] h-[96px] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[16px] relative size-full">
        <div className="flex flex-col font-['Noto_Sans_JP:Regular',sans-serif] h-[71px] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#0a0604] text-[16px] text-ellipsis w-full">
          <p className="whitespace-pre-wrap">
            <span className="leading-[1.5]">ここに今月の鬼コーチによる分析結果のテキストが入ります。</span>
            <span className="font-['Noto_Sans_JP:Regular',sans-serif] leading-[1.5] not-italic">ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function EdgeLeft() {
  return <div className="overflow-clip shrink-0 size-[16px]" data-name="edge_left" />;
}

function DashboardIcon() {
  return (
    <div className="absolute left-0 size-[16px] top-[0.5px]" data-name="DashboardIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_32692)" id="DashboardIcon">
          <path d={svgPaths.p1aa6baf0} fill="url(#paint0_linear_2_32692)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_32692" x1="1.06303" x2="15.8178" y1="0.11384" y2="15.6903">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
          <clipPath id="clip0_2_32692">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="inline_left">
      <DashboardIcon />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px]" style={{ backgroundImage: "linear-gradient(165.082deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        再分析する
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <InlineLeft />
      <Title1 />
    </div>
  );
}

function EdgeRight() {
  return <div className="overflow-clip shrink-0 size-[16px]" data-name="edge_right" />;
}

function ButtonMasterSp() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[16px] py-[7px] relative rounded-[16px] shrink-0 w-[153px]" data-name="Button_Master_SP">
      <div aria-hidden="true" className="absolute border border-[#f68c44] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      <EdgeLeft />
      <Frame14 />
      <EdgeRight />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full">
      <Frame20 />
      <ButtonMasterSp />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[8px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Title />
          <GraphArea />
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function ChevronRightRoundedIcon() {
  return (
    <div className="absolute left-0 size-[16px] top-[0.5px]" data-name="ChevronRightRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronRightRoundedIcon">
          <mask height="16" id="mask0_1_1310" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_1_1310)">
            <path d={svgPaths.p1a77bf80} fill="var(--fill-0, #6F6D6C)" id="Vector" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function InlineLeft1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="inline_left">
      <ChevronRightRoundedIcon />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pb-[8px] relative shrink-0" data-name="title">
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#2a3449] text-[16px] w-[306px] whitespace-pre-wrap">内訳</p>
      <InlineLeft1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0 w-[82px]">
      <div className="bg-[#fa4848] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">食費</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 text-[#2a3449] text-center">
      <p className="relative shrink-0 text-[16px]">100</p>
      <p className="relative shrink-0 text-[12px]">円</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center leading-none not-italic relative shrink-0">
      <Frame34 />
      <p className="relative shrink-0 text-[#445371] text-[12px] text-right w-[37px] whitespace-pre-wrap">15.3%</p>
    </div>
  );
}

function LegendItem() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend_item">
      <Frame2 />
      <Frame5 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0 w-[82px]">
      <div className="bg-[#fab948] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">日用品</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 text-[#2a3449] text-center">
      <p className="relative shrink-0 text-[16px]">100</p>
      <p className="relative shrink-0 text-[12px]">円</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center leading-none not-italic relative shrink-0">
      <Frame35 />
      <p className="relative shrink-0 text-[#445371] text-[12px] text-right w-[37px] whitespace-pre-wrap">15.3%</p>
    </div>
  );
}

function LegendItem1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend_item">
      <Frame3 />
      <Frame6 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0">
      <div className="bg-[#48db3e] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">趣味・娯楽</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 text-[#2a3449] text-center">
      <p className="relative shrink-0 text-[16px]">100</p>
      <p className="relative shrink-0 text-[12px]">円</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center leading-none not-italic relative shrink-0">
      <Frame36 />
      <p className="relative shrink-0 text-[#445371] text-[12px] text-right w-[37px] whitespace-pre-wrap">15.3%</p>
    </div>
  );
}

function LegendItem2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend_item">
      <Frame4 />
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0">
      <div className="bg-[#3ec3db] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">交通費</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 text-[#2a3449] text-center">
      <p className="relative shrink-0 text-[16px]">100</p>
      <p className="relative shrink-0 text-[12px]">円</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center leading-none not-italic relative shrink-0">
      <Frame37 />
      <p className="relative shrink-0 text-[#445371] text-[12px] text-right w-[37px] whitespace-pre-wrap">15.3%</p>
    </div>
  );
}

function LegendItem3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend_item">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0">
      <div className="bg-[#483edb] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">水道・光熱費</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 text-[#2a3449] text-center">
      <p className="relative shrink-0 text-[16px]">100</p>
      <p className="relative shrink-0 text-[12px]">円</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center leading-none not-italic relative shrink-0">
      <Frame38 />
      <p className="relative shrink-0 text-[#445371] text-[12px] text-right w-[37px] whitespace-pre-wrap">15.3%</p>
    </div>
  );
}

function LegendItem4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend_item">
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0">
      <div className="bg-[#db3ea4] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">未分類</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 text-[#2a3449] text-center">
      <p className="relative shrink-0 text-[16px]">100</p>
      <p className="relative shrink-0 text-[12px]">円</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex font-['Noto_Sans_JP:Bold',sans-serif] gap-[4px] items-center leading-none not-italic relative shrink-0">
      <Frame39 />
      <p className="relative shrink-0 text-[#445371] text-[12px] text-right w-[37px] whitespace-pre-wrap">15.3%</p>
    </div>
  );
}

function LegendItem5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="legend_item">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Legend() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[8px] relative shrink-0 w-full" data-name="legend">
      <LegendItem />
      <LegendItem1 />
      <LegendItem2 />
      <LegendItem3 />
      <LegendItem4 />
      <LegendItem5 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Title2 />
      <Legend />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] shrink-0 w-[358px]">
      <Frame33 />
    </div>
  );
}

function ScrollWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[16px] overflow-x-clip overflow-y-auto pt-[16px] top-[154px] w-[358px]" data-name="scroll-wrapper">
      <Frame22 />
      <Frame27 />
    </div>
  );
}

function AddRoundedIcon() {
  return (
    <div className="absolute left-0 size-[44.786px] top-0" data-name="AddRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.7857 44.7857">
        <g id="AddRoundedIcon">
          <mask height="45" id="mask0_2_28045" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="45" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="44.7857" id="Bounding box" width="44.7857" />
          </mask>
          <g mask="url(#mask0_2_28045)">
            <path d={svgPaths.pb36300} fill="var(--fill-0, white)" id="Vector" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function InlineLeft2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[44.786px]" data-name="inline_left">
      <AddRoundedIcon />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[14.929px] items-center relative shrink-0">
      <InlineLeft2 />
    </div>
  );
}

function ButtonMasterSp1() {
  return (
    <div className="content-stretch flex gap-[11px] items-center justify-center py-[8.25px] relative rounded-[1373.625px] shadow-[0px_1.375px_4.125px_0px_rgba(0,0,0,0.1),0px_1.375px_2.75px_0px_rgba(0,0,0,0.06)] shrink-0 size-[66px]" data-name="Button_Master_SP" style={{ backgroundImage: "linear-gradient(138.394deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)" }}>
      <Frame15 />
    </div>
  );
}

function HomeIcon() {
  return (
    <div className="absolute left-0 size-[32px] top-px" data-name="HomeIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_1903)" id="HomeIcon">
          <mask height="32" id="mask0_1_1903" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_1_1903)">
            <path d={svgPaths.p2c2ce00} fill="var(--fill-0, #7A7877)" id="Vector" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1903">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="inline_left">
      <HomeIcon />
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#7a7877] text-[12px]">ホーム</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft3 />
      <Title3 />
    </div>
  );
}

function ButtonMasterSp2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[2px] relative rounded-[999px] shrink-0 w-[116px]" data-name="Button_Master_SP">
      <Frame16 />
    </div>
  );
}

function BarChartIcon() {
  return (
    <div className="absolute left-0 size-[32px] top-px" data-name="BarChartIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="BarChartIcon">
          <mask height="32" id="mask0_2_28031" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_2_28031)">
            <path d={svgPaths.p2af2ee00} fill="url(#paint0_linear_2_28031)" id="bar_chart_4_bars" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_28031" x1="3.66761" x2="25.2871" y1="4.17076" y2="31.2208">
            <stop stopColor="#FFA04C" />
            <stop offset="0.331731" stopColor="#FBB441" />
            <stop offset="1" stopColor="#F06E23" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="inline_left">
      <BarChartIcon />
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="bg-clip-text font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px]" style={{ backgroundImage: "linear-gradient(169.226deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)", WebkitTextFillColor: "transparent" }}>
        ダッシュボード
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft4 />
      <Title4 />
    </div>
  );
}

function ButtonMasterSp3() {
  return (
    <div className="bg-[#f2f2f1] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[2px] relative rounded-[999px] shrink-0" data-name="Button_Master_SP">
      <Frame17 />
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

function InlineLeft5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="inline_left">
      <SettingRoundedIcon />
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#7a7877] text-[12px]">設定</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0">
      <InlineLeft5 />
      <Title5 />
    </div>
  );
}

function ButtonMasterSp4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[2px] relative rounded-[999px] shrink-0 w-[116px]" data-name="Button_Master_SP">
      <Frame18 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[40px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <ButtonMasterSp2 />
          <ButtonMasterSp3 />
          <ButtonMasterSp4 />
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[13px] top-[693px] w-[364px]">
      <ButtonMasterSp1 />
      <Frame41 />
    </div>
  );
}

function Notch() {
  return (
    <div className="-translate-x-1/2 absolute h-[31px] left-1/2 top-[-2px] w-[164px]" data-name="Notch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 31">
        <g id="Notch">
          <path d={svgPaths.paf70480} fill="var(--fill-0, black)" id="Notch_2" />
        </g>
      </svg>
    </div>
  );
}

function RightSide() {
  return (
    <div className="absolute h-[11.336px] right-[14.67px] top-[17.33px] w-[66.661px]" data-name="Right Side">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.6612 11.336">
        <g id="Right Side">
          <g id="Battery">
            <path d={svgPaths.p18c81cf0} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, black)" />
            <path d={svgPaths.p3d3cbf00} fill="var(--fill-0, black)" id="Combined Shape" opacity="0.4" />
            <path d={svgPaths.p3cceaf80} fill="var(--fill-0, black)" id="Rectangle_2" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p1d7c8600} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
          <path clipRule="evenodd" d={svgPaths.p3e2de00} fill="var(--fill-0, black)" fillRule="evenodd" id="Mobile Signal" />
        </g>
      </svg>
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

function Title6() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-center relative shrink-0" data-name="Title">
      <p className="font-['Noto_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#423f3e] text-[21px] text-center" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        ダッシュボード
      </p>
    </div>
  );
}

function Header1() {
  return (
    <div className="relative shrink-0 w-full" data-name="header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[8px] pl-[20px] pr-[16px] relative w-full">
          <div className="flex flex-row items-center self-stretch">
            <Title6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[89px] items-start relative shrink-0 w-full" data-name="header">
      <div className="h-[44px] overflow-clip relative shrink-0 w-full" data-name="Status bar">
        <Notch />
        <RightSide />
        <LeftSide />
      </div>
      <Header1 />
    </div>
  );
}

function Frame1({ className }: { className?: string }) {
  return (
    <div className={className || "absolute content-stretch flex flex-col items-start left-0 top-0 w-[390px]"}>
      <Header />
    </div>
  );
}

export default function MepNativeBackup() {
  return (
    <div className="relative size-full" data-name="MEP-Native-backup. バックアップ確認画面" style={{ backgroundImage: "linear-gradient(155.199deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)" }}>
      <Frame26 />
      <ScrollWrapper />
      <Frame40 />
      <Frame1 />
    </div>
  );
}