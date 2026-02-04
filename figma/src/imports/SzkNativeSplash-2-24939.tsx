import svgPaths from "./svg-d9078iq2o3";

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
          <mask height="24" id="mask0_2_22080" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_22080)">
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
          <mask height="24" id="mask0_2_22145" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_22145)">
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

function Group4() {
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

function Frame10() {
  return (
    <div className="relative shrink-0 size-[28px]">
      <Group4 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['BIZ_UDPGothic:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[1.28px] whitespace-nowrap">
        <p className="leading-none">脳トレアプリ</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame10 />
      <Frame9 />
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

function Frame8() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#eb6b15] content-stretch flex items-center justify-between left-1/2 overflow-clip p-[16px] rounded-[20px] top-[109px] w-[358px]">
      <Frame13 />
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

function Frame16() {
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
          <Frame16 />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
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
      <Frame22 />
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
          <mask height="22" id="mask0_2_22111" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="22" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="22" id="Bounding box" width="22" />
          </mask>
          <g mask="url(#mask0_2_22111)">
            <path d={svgPaths.p1a8b1b00} fill="var(--fill-0, #EB6B15)" id="location_on" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
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
          <Frame18 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
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
      <Frame23 />
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
          <mask height="22" id="mask0_2_22084" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="22" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="22" id="Bounding box" width="22" />
          </mask>
          <g mask="url(#mask0_2_22084)">
            <path d={svgPaths.p2f39600} fill="var(--fill-0, #EB6B15)" id="directions_car" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
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
          <mask height="22" id="mask0_2_22119" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="22" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="22" id="Bounding box" width="22" />
          </mask>
          <g mask="url(#mask0_2_22119)">
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
          <Frame19 />
          <Container6 />
          <ChevronUpRoundedIcon />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
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
      <Frame24 />
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

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['BIZ_UDPGothic:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2c2a28] text-[14px] tracking-[1.12px] w-full">
        <p className="leading-[1.5] whitespace-pre-wrap">12月18日</p>
      </div>
      <Frame14 />
    </div>
  );
}

function Frame20() {
  return <div className="h-[197.997px] shrink-0 w-full" />;
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[16px] top-[204px] w-[358.003px]">
      <Frame15 />
      <Frame20 />
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
          <mask height="24" id="mask0_2_22080" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_22080)">
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
          <mask height="24" id="mask0_2_22145" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_22145)">
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

function Frame12() {
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

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[70px] shrink-0 size-[44px]">
      <CloseRoundedIcon />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[20px] relative w-full">
          <Frame12 />
          <p className="font-['BIZ_UDPGothic:Bold',sans-serif] leading-[1.25] not-italic relative shrink-0 text-[#0a0604] text-[24px] text-center tracking-[0.96px]">レシート読込</p>
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] ml-0 mt-0 not-italic relative row-1 text-[#2a3449] text-[16px]">日付</p>
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
        2026年1月31日（土）
      </p>
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CalendarIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CalendarIcon">
          <mask height="24" id="mask0_2_22097" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_22097)">
            <path d={svgPaths.p3823abb0} fill="var(--fill-0, #A1B3CD)" id="calendar_today" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#a1b3cd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[12px] py-[12px] relative w-full">
          <UnitTextM />
          <CalendarIcon />
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

function Frame26() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 358 1">
          <g id="Frame 26087522">
            <line id="Line 162" stroke="var(--stroke-0, #D8D8D8)" x2="358" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] ml-0 mt-0 not-italic relative row-1 text-[#2a3449] text-[16px]">商品名</p>
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
      <p className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#2a3449] text-[16px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        メロンパン
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
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[358px]" data-name="Input(TextField)_M">
      <Frame1 />
    </div>
  );
}

function InputUinitM1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" data-name="input_uinit-M">
      <UnitTextLabelM1 />
      <InputTextFieldM1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] ml-0 mt-0 not-italic relative row-1 text-[#2a3449] text-[16px]">金額</p>
    </div>
  );
}

function UnitTextLabelM2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="unit_TextLabel_M">
      <Group2 />
    </div>
  );
}

function UnitTextM2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="unit_text_M">
      <p className="font-['Noto_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#2a3449] text-[16px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        100
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#a1b3cd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
          <UnitTextM2 />
        </div>
      </div>
    </div>
  );
}

function InputTextFieldM2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Input(TextField)_M">
      <Frame2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <InputTextFieldM2 />
      <p className="font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#151a23] text-[16px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        円
      </p>
    </div>
  );
}

function InputUinitM2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" data-name="input_uinit-M">
      <UnitTextLabelM2 />
      <Frame6 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] ml-0 mt-0 not-italic relative row-1 text-[#2a3449] text-[16px]">カテゴリー</p>
    </div>
  );
}

function UnitTextLabelM3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="unit_TextLabel_M">
      <Group3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[4px] relative shrink-0">
      <div className="bg-[#fa4848] rounded-[18px] shrink-0 size-[8px]" />
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#2a3449] text-[16px]">食費</p>
    </div>
  );
}

function ChevronDownRoundedIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ChevronDownRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ChevronDownRoundedIcon">
          <mask height="24" id="mask0_2_22127" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_22127)">
            <path d={svgPaths.p1781db00} fill="var(--fill-0, #5A6B8B)" id="Vector" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#a1b3cd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[12px] py-[12px] relative w-full">
          <Frame5 />
          <ChevronDownRoundedIcon />
        </div>
      </div>
    </div>
  );
}

function InputTextFieldM3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[358px]" data-name="Input(TextField)_M">
      <Frame3 />
    </div>
  );
}

function InputUinitM3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[358px]" data-name="input_uinit-M">
      <UnitTextLabelM3 />
      <InputTextFieldM3 />
    </div>
  );
}

function EdgeLeft() {
  return <div className="overflow-clip shrink-0 size-[16px]" data-name="edge_left" />;
}

function AddIcon() {
  return (
    <div className="absolute left-0 size-[16px] top-[0.5px]" data-name="AddIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="AddIcon">
          <mask height="16" id="mask0_2_22061" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_2_22061)">
            <path d={svgPaths.p3f3a9400} fill="url(#paint0_linear_2_22061)" id="add" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_22061" x1="3.68366" x2="12.2428" y1="3.39974" y2="13.038">
            <stop stopColor="#F68C44" />
            <stop offset="0.331731" stopColor="#FD9650" />
            <stop offset="1" stopColor="#EB6B15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function InlineLeft() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="inline_left">
      <AddIcon />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="title">
      <p className="[text-decoration-skip-ink:none] bg-clip-text decoration-solid font-['Noto_Sans_JP:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px] underline" style={{ backgroundImage: "linear-gradient(169.226deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)", WebkitTextFillColor: "transparent" }}>
        商品を追加する
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <InlineLeft />
      <Title2 />
    </div>
  );
}

function EdgeRight() {
  return <div className="overflow-clip shrink-0 size-[16px]" data-name="edge_right" />;
}

function ButtonMasterSp() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Button_Master_SP">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[7px] relative w-full">
          <EdgeLeft />
          <Frame7 />
          <EdgeRight />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 358 1">
          <g id="Frame 26087522">
            <line id="Line 162" stroke="var(--stroke-0, #D8D8D8)" x2="358" y1="0.5" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-center px-[16px] relative shrink-0 w-[390px]">
      <InputUinitM />
      <Frame26 />
      <InputUinitM1 />
      <InputUinitM2 />
      <InputUinitM3 />
      <ButtonMasterSp />
      <Frame27 />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center justify-center px-[24px] py-[10px] relative rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] shrink-0 w-[358px]" data-name="button" style={{ backgroundImage: "linear-gradient(173.21deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)" }}>
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">保存する</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[687px] items-center relative shrink-0">
      <Frame4 />
      <Button />
    </div>
  );
}

function LogbookDisplayEdit() {
  return (
    <div className="-translate-x-1/2 absolute bg-white bottom-0 content-stretch flex flex-col h-[811px] items-center left-1/2 pb-[40px] rounded-tl-[24px] rounded-tr-[24px] w-[390px]" data-name="logbook_display_edit">
      <Frame21 />
      <Frame25 />
    </div>
  );
}

export default function SzkNativeSplash() {
  return (
    <div className="bg-white relative size-full" data-name="SZK-Native-splash">
      <HomeIndicator />
      <Header />
      <Frame8 />
      <Frame17 />
      <Header2 />
      <Modal />
      <LogbookDisplayEdit />
    </div>
  );
}