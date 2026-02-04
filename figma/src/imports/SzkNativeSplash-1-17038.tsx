import svgPaths from "./svg-5k50ztz8md";

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 w-[390px]" data-name="HomeIndicator">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8px] h-[5px] left-1/2 rounded-[100px] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Nunito_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#2a3449] text-[17px] text-center">つながるドライブ</p>
    </div>
  );
}

function FilterAltIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="FilterAltIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="FilterAltIcon">
          <mask height="24" id="mask0_1_14729" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_14729)">
            <path d={svgPaths.p17da0b00} fill="var(--fill-0, #5A6B8B)" id="filter_alt" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SettingIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SettingIcon">
          <mask height="24" id="mask0_1_14721" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_14721)">
            <path d={svgPaths.p3f71c80} fill="var(--fill-0, #5A6B8B)" id="settings" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Right() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-end min-h-px min-w-px relative" data-name="Right">
      <FilterAltIcon />
      <SettingIcon />
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] inset-[48.35%_0_1.1%_0] items-center px-[16px]" data-name="header">
      <Title />
      <Right />
    </div>
  );
}

function Notch() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[-2px]" data-name="Notch">
      <div className="-translate-x-1/2 absolute h-[31px] left-1/2 top-[-2px] w-[164px]" data-name="Notch">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 31">
          <path d={svgPaths.paf70480} fill="var(--fill-0, black)" id="Notch" />
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
          <path d={svgPaths.p7e6b880} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, black)" />
        </svg>
      </div>
      <div className="absolute h-[4px] right-[14.67px] top-[21px] w-[1.328px]" data-name="Combined Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32804 4">
          <path d={svgPaths.p32d253c0} fill="var(--fill-0, black)" id="Combined Shape" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute h-[7.333px] right-[19px] top-[19.33px] w-[18px]" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 7.33333">
          <path d={svgPaths.p22aabe00} fill="var(--fill-0, black)" id="Rectangle" />
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
          <path clipRule="evenodd" d={svgPaths.p6c9880} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
        </svg>
      </div>
      <div className="absolute h-[10.667px] right-[64.33px] top-[17.67px] w-[17px]" data-name="Mobile Signal">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10.6667">
          <path clipRule="evenodd" d={svgPaths.p2836df00} fill="var(--fill-0, black)" fillRule="evenodd" id="Mobile Signal" />
        </svg>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="absolute h-[21px] left-[24px] rounded-[24px] top-[12px] w-[54px]" data-name="_Time">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[20px] left-[27px] not-italic text-[15px] text-black text-center top-px tracking-[-0.5px] w-[54px] whitespace-pre-wrap">9:41</p>
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
    <div className="absolute bg-white inset-[0_0_51.65%_0] overflow-clip" data-name="Status bar">
      <Notch />
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute h-[90px] left-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] top-0 w-[390px]" data-name="header">
      <Header1 />
      <StatusBar />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[11.51%_12.5%_13.55%_12.5%]">
      <div className="absolute inset-[-2.86%_-4.17%_-4.18%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.75 22.4586">
          <g id="Group 26087095">
            <circle cx="17.675" cy="17.3838" fill="var(--fill-0, #EB6B15)" id="Ellipse 103" r="2.625" />
            <path d={svgPaths.p1ca37000} fill="var(--fill-0, #EB6B15)" id="Subtract" />
            <path d={svgPaths.p3d4f1dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
            <path d={svgPaths.p1cc020} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
            <path d={svgPaths.pf1e8680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-[28px]">
      <Group2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['BIZ_UDPGothic:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[1.28px] whitespace-nowrap">
        <p className="leading-none">脳トレアプリ</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function OpenInNewIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="OpenInNewIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="OpenInNewIcon">
          <mask height="24" id="mask0_1_14700" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_14700)">
            <path d={svgPaths.pff2e4c0} fill="var(--fill-0, white)" id="open_in_new" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#eb6b15] content-stretch flex items-center justify-between left-1/2 overflow-clip p-[16px] rounded-[20px] top-[109px] w-[358px]">
      <Frame9 />
      <OpenInNewIcon />
    </div>
  );
}

function FlagIcon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="FlagIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="FlagIcon">
          <path d={svgPaths.p210cf600} fill="var(--fill-0, #EB6B15)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#fff3e1] relative rounded-[20px] shrink-0 size-[40px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <FlagIcon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start leading-[1.5] not-italic relative w-full">
        <p className="font-['BIZ_UDPGothic:Regular',sans-serif] relative shrink-0 text-[#a4a1a0] text-[12px] tracking-[0.96px]">2024年12月18日 08:15</p>
        <p className="font-['BIZ_UDPGothic:Bold',sans-serif] relative shrink-0 text-[#494746] text-[16px] tracking-[1.28px]">運転スコア</p>
      </div>
    </div>
  );
}

function MainScreen() {
  return (
    <div className="relative shrink-0 w-full" data-name="MainScreen">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-center relative w-full">
          <Frame12 />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex font-['BIZ_UDPGothic:Regular',sans-serif] gap-[8px] items-center leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">
      <p className="relative shrink-0">車</p>
      <p className="relative shrink-0">80%</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#ffeee3] items-start justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 to-[#fef5e8]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f99b39] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Frame18 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#ffeee3] gap-[8px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 to-[#fef5e8]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f99b39] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <p className="font-['BIZ_UDPGothic:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">バス</p>
      <p className="font-['BIZ_UDPGothic:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">20%</p>
    </div>
  );
}

function MainScreen1() {
  return (
    <div className="relative shrink-0 w-full" data-name="MainScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-start pt-[8px] relative w-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[17px] pl-[16.999px] pr-[17px] pt-[16.999px] relative w-full">
          <MainScreen />
          <MainScreen1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dddbdb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function AddressRoundedIcon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="AddressRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="AddressRoundedIcon">
          <mask height="22" id="mask0_1_14688" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="22" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="22" id="Bounding box" width="22" />
          </mask>
          <g mask="url(#mask0_1_14688)">
            <path d={svgPaths.p1a8b1b00} fill="var(--fill-0, #EB6B15)" id="location_on" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#fff3e1] relative rounded-[20px] shrink-0 size-[40px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <AddressRoundedIcon />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start leading-[1.5] not-italic relative w-full">
        <p className="font-['BIZ_UDPGothic:Regular',sans-serif] relative shrink-0 text-[#7c7a78] text-[12px] tracking-[0.96px]">2024年12月18日 08:15</p>
        <p className="font-['BIZ_UDPGothic:Bold',sans-serif] relative shrink-0 text-[#494746] text-[16px] tracking-[1.28px]">ルートマップ</p>
      </div>
    </div>
  );
}

function MainScreen2() {
  return (
    <div className="relative shrink-0 w-full" data-name="MainScreen">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-center relative w-full">
          <Frame14 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex font-['BIZ_UDPGothic:Regular',sans-serif] gap-[8px] items-center leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">
      <p className="relative shrink-0">車</p>
      <p className="relative shrink-0">80%</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#ffeee3] items-start justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 to-[#fef5e8]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f99b39] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Frame19 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#ffeee3] gap-[8px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 to-[#fef5e8]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f99b39] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <p className="font-['BIZ_UDPGothic:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">バス</p>
      <p className="font-['BIZ_UDPGothic:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">20%</p>
    </div>
  );
}

function MainScreen3() {
  return (
    <div className="relative shrink-0 w-full" data-name="MainScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-start pt-[8px] relative w-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[17px] pl-[16.999px] pr-[17px] pt-[16.999px] relative w-full">
          <MainScreen2 />
          <MainScreen3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dddbdb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function CarIcon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="CarIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="CarIcon">
          <mask height="22" id="mask0_1_14746" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="22" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="22" id="Bounding box" width="22" />
          </mask>
          <g mask="url(#mask0_1_14746)">
            <path d={svgPaths.p2f39600} fill="var(--fill-0, #EB6B15)" id="directions_car" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#fff3e1] relative rounded-[20px] shrink-0 size-[40px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <CarIcon />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start leading-[1.5] not-italic relative w-full">
        <p className="font-['BIZ_UDPGothic:Regular',sans-serif] relative shrink-0 text-[#7c7a78] text-[12px] tracking-[0.96px]">2024年12月18日 08:15</p>
        <p className="font-['BIZ_UDPGothic:Bold',sans-serif] relative shrink-0 text-[#494746] text-[16px] tracking-[1.28px]">ユーザーセグメント</p>
      </div>
    </div>
  );
}

function ChevronUpRoundedIcon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="ChevronUpRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="ChevronUpRoundedIcon">
          <mask height="22" id="mask0_1_14684" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="22" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="22" id="Bounding box" width="22" />
          </mask>
          <g mask="url(#mask0_1_14684)">
            <path d={svgPaths.p2d38cb80} fill="var(--fill-0, #A4A1A0)" id="Vector" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MainScreen4() {
  return (
    <div className="relative shrink-0 w-full" data-name="MainScreen">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-center relative w-full">
          <Frame15 />
          <Container6 />
          <ChevronUpRoundedIcon />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex font-['BIZ_UDPGothic:Regular',sans-serif] gap-[8px] items-center leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">
      <p className="relative shrink-0">車</p>
      <p className="relative shrink-0">80%</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#ffeee3] items-start justify-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 to-[#fef5e8]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f99b39] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Frame20 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#ffeee3] gap-[8px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 to-[#fef5e8]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f99b39] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <p className="font-['BIZ_UDPGothic:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">バス</p>
      <p className="font-['BIZ_UDPGothic:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#f46c02] text-[14px] tracking-[1.12px]">20%</p>
    </div>
  );
}

function MainScreen5() {
  return (
    <div className="relative shrink-0 w-full" data-name="MainScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.999px] items-start pt-[8px] relative w-full">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[17px] pl-[16.999px] pr-[17px] pt-[16.999px] relative w-full">
          <MainScreen4 />
          <MainScreen5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dddbdb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['BIZ_UDPGothic:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2c2a28] text-[14px] tracking-[1.12px] w-full">
        <p className="leading-[1.5] whitespace-pre-wrap">12月18日</p>
      </div>
      <Frame10 />
    </div>
  );
}

function Frame16() {
  return <div className="h-[197.997px] shrink-0 w-full" />;
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[16px] top-[204px] w-[358.003px]">
      <Frame11 />
      <Frame16 />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Nunito_Sans:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#2a3449] text-[17px] text-center">つながるドライブ</p>
    </div>
  );
}

function FilterAltIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="FilterAltIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="FilterAltIcon">
          <mask height="24" id="mask0_1_14729" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_14729)">
            <path d={svgPaths.p17da0b00} fill="var(--fill-0, #5A6B8B)" id="filter_alt" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SettingIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SettingIcon">
          <mask height="24" id="mask0_1_14721" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_14721)">
            <path d={svgPaths.p3f71c80} fill="var(--fill-0, #5A6B8B)" id="settings" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Right1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-end min-h-px min-w-px relative" data-name="Right">
      <FilterAltIcon1 />
      <SettingIcon1 />
    </div>
  );
}

function Header3() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] inset-[48.35%_0_1.1%_0] items-center px-[16px]" data-name="header">
      <Title1 />
      <Right1 />
    </div>
  );
}

function Battery1() {
  return (
    <div className="absolute contents right-[14.67px] top-[17.33px]" data-name="Battery">
      <div className="absolute h-[11.333px] right-[17px] top-[17.33px] w-[22px]" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 11.3333">
          <path d={svgPaths.p7e6b880} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <div className="absolute h-[4px] right-[14.67px] top-[21px] w-[1.328px]" data-name="Combined Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32804 4">
          <path d={svgPaths.p32d253c0} fill="var(--fill-0, white)" id="Combined Shape" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute h-[7.333px] right-[19px] top-[19.33px] w-[18px]" data-name="Rectangle">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 7.33333">
          <path d={svgPaths.p22aabe00} fill="var(--fill-0, white)" id="Rectangle" />
        </svg>
      </div>
    </div>
  );
}

function RightSide1() {
  return (
    <div className="absolute contents right-[14.67px] top-[17.33px]" data-name="Right Side">
      <Battery1 />
      <div className="absolute h-[10.966px] right-[44.03px] top-[17.33px] w-[15.272px]" data-name="Wifi">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2724 10.9656">
          <path clipRule="evenodd" d={svgPaths.p6c9880} fill="var(--fill-0, white)" fillRule="evenodd" id="Wifi" />
        </svg>
      </div>
      <div className="absolute h-[10.667px] right-[64.33px] top-[17.67px] w-[17px]" data-name="Mobile Signal">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10.6667">
          <path clipRule="evenodd" d={svgPaths.p2836df00} fill="var(--fill-0, white)" fillRule="evenodd" id="Mobile Signal" />
        </svg>
      </div>
    </div>
  );
}

function Time1() {
  return (
    <div className="absolute h-[21px] left-[24px] rounded-[24px] top-[12px] w-[54px]" data-name="_Time">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[20px] left-[27px] not-italic text-[15px] text-center text-white top-px tracking-[-0.5px] w-[54px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function LeftSide1() {
  return (
    <div className="absolute contents left-[24px] top-[12px]" data-name="Left Side">
      <Time1 />
    </div>
  );
}

function StatusBar1() {
  return (
    <div className="absolute bg-[#232323] inset-[0_0_51.65%_0] overflow-clip" data-name="Status bar">
      <RightSide1 />
      <LeftSide1 />
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute h-[90px] left-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] top-0 w-[390px]" data-name="header">
      <Header3 />
      <StatusBar1 />
    </div>
  );
}

function Modal() {
  return (
    <div className="absolute h-[810px] left-0 top-[34px] w-[390px]" data-name="Modal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 390 810">
        <path d="M0 0H390V810H0V0Z" fill="var(--fill-0, black)" id="Overlay" />
      </svg>
    </div>
  );
}

function Frame7() {
  return <div className="content-stretch flex items-center justify-center overflow-clip rounded-[70px] shrink-0 size-[44px]" />;
}

function CloseRoundedIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CloseRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CloseRoundedIcon">
          <mask height="24" id="mask0_1_9734" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_9734)">
            <path d={svgPaths.p14d01a00} fill="var(--fill-0, #7C7A78)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[70px] shrink-0 size-[44px]">
      <CloseRoundedIcon />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[20px] relative w-full">
          <Frame7 />
          <p className="font-['BIZ_UDPGothic:Bold',sans-serif] leading-[1.25] not-italic relative shrink-0 text-[#0a0604] text-[24px] text-center tracking-[0.96px]">予算設定</p>
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] ml-0 mt-0 not-italic relative row-1 text-[#2a3449] text-[16px]">年月</p>
    </div>
  );
}

function UnitTextLabelM() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="unit_TextLabel_M">
      <Group />
    </div>
  );
}

function UnitTextM() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="unit_text_M">
      <p className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#2a3449] text-[16px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        2026年1月
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#a1b3cd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
          <UnitTextM />
        </div>
      </div>
    </div>
  );
}

function InputTextFieldM() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[358px]" data-name="Input(TextField)_M">
      <Frame />
    </div>
  );
}

function InputUinitM() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" data-name="input_uinit-M">
      <UnitTextLabelM />
      <InputTextFieldM />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] ml-0 mt-0 not-italic relative row-1 text-[#2a3449] text-[16px]">予算額</p>
    </div>
  );
}

function UnitTextLabelM1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="unit_TextLabel_M">
      <Group1 />
    </div>
  );
}

function UnitTextM1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="unit_text_M">
      <p className="font-['Noto_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#2a3449] text-[16px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        10,000
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#a1b3cd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
          <UnitTextM1 />
        </div>
      </div>
    </div>
  );
}

function InputTextFieldM1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Input(TextField)_M">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <InputTextFieldM1 />
      <p className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#151a23] text-[16px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        円
      </p>
    </div>
  );
}

function InputUinitM1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" data-name="input_uinit-M">
      <UnitTextLabelM1 />
      <Frame3 />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[48px] relative rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] shrink-0 w-full" data-name="button" style={{ backgroundImage: "linear-gradient(173.21deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center px-[24px] py-[10px] relative size-full">
          <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">保存する</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[16px] relative w-full">
          <Button />
        </div>
      </div>
    </div>
  );
}

function LogbookDisplayEdit() {
  return (
    <div className="-translate-x-1/2 absolute bg-white bottom-0 content-stretch flex flex-col gap-[20px] h-[811px] items-center left-1/2 pb-[40px] rounded-tl-[24px] rounded-tr-[24px] w-[390px]" data-name="logbook_display_edit">
      <Frame17 />
      <InputUinitM />
      <InputUinitM1 />
      <Frame2 />
    </div>
  );
}

export default function SzkNativeSplash() {
  return (
    <div className="bg-white relative size-full" data-name="SZK-Native-splash">
      <HomeIndicator />
      <Header />
      <Frame4 />
      <Frame13 />
      <Header2 />
      <Modal />
      <LogbookDisplayEdit />
    </div>
  );
}