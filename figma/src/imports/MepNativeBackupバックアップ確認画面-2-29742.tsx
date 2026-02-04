import svgPaths from "./svg-phrqdk07k5";

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

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[36px] not-italic relative shrink-0 text-[#0a0a0a] text-[24px] text-center tracking-[0.0703px]">4C Wallet</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[#0a0a0a] text-[18px] tracking-[-0.4395px] w-full whitespace-pre-wrap">
        <p className="mb-0">基本情報を入力して、</p>
        <p>アプリを始めましょう！</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#f3f3f5] content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative rounded-[4px] shrink-0 w-[326px]">
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] tracking-[-0.3125px]">タロウ</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">ニックネーム</p>
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">1週間レポート</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[23.988px] relative shrink-0 w-[63.967px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[24px] left-[32px] not-italic text-[#2a3449] text-[16px] text-center top-[-2.27px]">送信する</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21.004px] relative shrink-0 w-[217.618px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5a6b8b] text-[14px] text-center">1週間単位でレポートを送信します</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[48.989px] relative shrink-0 w-[217.618px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.998px] items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9917 15.9917">
        <g id="Icon">
          <path d={svgPaths.p1f47afc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99896" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#eb6b15] relative rounded-[42713800px] shrink-0 size-[23.988px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fff8f3] h-[84px] relative rounded-[8px] shrink-0 w-[326px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#eb6b15] border-[1.273px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[17.265px] py-[1.273px] relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[23.988px] relative shrink-0 w-[79.958px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[24px] left-[40px] not-italic text-[#2a3449] text-[16px] text-center top-[-2.27px]">送信しない</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21.004px] relative shrink-0 w-[153.472px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5a6b8b] text-[14px] text-center">レポートを送信しません</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48.989px] relative shrink-0 w-[153.472px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.998px] items-start relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-[326px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e2e9f2] border-[1.273px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[17.265px] pr-[186.808px] py-[1.273px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[11.994px] h-[179px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">分析設定</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[23.988px] left-0 top-0 w-[111.922px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[24px] left-[56px] not-italic text-[#2a3449] text-[16px] text-center top-[-2.27px]">鬼コーチモード</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[21.004px] items-start left-0 top-[23.99px] w-[209.443px]" data-name="Paragraph">
      <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5a6b8b] text-[14px] text-center">厳しめのアドバイスを提供します</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[44.992px] relative shrink-0 w-[209.443px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9917 15.9917">
        <g id="Icon">
          <path d={svgPaths.p1f47afc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99896" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#eb6b15] relative rounded-[42713800px] shrink-0 size-[23.988px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#fff8f3] h-[80px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#eb6b15] border-[1.273px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[17.265px] py-[1.273px] relative size-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[127.914px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[24px] left-[64px] not-italic text-[#2a3449] text-[16px] text-center top-[-2.27px]">天使コーチモード</p>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[21.004px] relative shrink-0 w-[139.907px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Noto_Sans_JP:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#5a6b8b] text-[14px] text-center">優しくサポートします</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[44.992px] relative shrink-0 w-[139.907px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[79px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e2e9f2] border-[1.273px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[17.265px] pr-[152.398px] py-[1.273px] relative size-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[11.994px] h-[171.035px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] shrink-0 w-full" data-name="button" style={{ backgroundImage: "linear-gradient(173.781deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center px-[24px] py-[10px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">登録する</p>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center px-[24px] py-[10px] relative w-full">
          <p className="decoration-solid font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center tracking-[-0.1504px] underline">戻る</p>
        </div>
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end relative shrink-0 w-full" data-name="LoginScreen">
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[32px] items-start pb-[48px] pt-[32px] px-[16px] relative rounded-[14px] shrink-0 w-[358px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.05),0px_8px_10px_0px_rgba(0,0,0,0.05)]" />
      <Frame6 />
      <LoginScreen />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[16px] top-[102px] w-[358px]" data-name="Container">
      <Container1 />
      <Frame2 />
    </div>
  );
}

export default function MepNativeBackup() {
  return (
    <div className="relative size-full" data-name="MEP-Native-backup. バックアップ確認画面" style={{ backgroundImage: "linear-gradient(148.919deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)" }}>
      <Frame />
      <Container />
    </div>
  );
}