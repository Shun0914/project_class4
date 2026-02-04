import svgPaths from "./svg-zacgvjcnaw";
import { imgGroup } from "./svg-a454t";

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

function Button() {
  return (
    <div className="flex-[1_0_0] h-[39.955px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[24px] left-[calc(50%+0.5px)] not-italic text-[#4a5565] text-[16px] text-center top-[calc(50%-11.96px)] tracking-[-0.3125px]">ログイン</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[39.955px] min-h-px min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[24px] left-[calc(50%+0.48px)] not-italic text-[#101828] text-[16px] text-center top-[calc(50%-11.96px)] tracking-[-0.3125px]">新規作成</p>
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="bg-[#f3f4f6] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="LoginScreen">
      <div className="content-stretch flex gap-[7.987px] items-start pl-[3.983px] pr-[3.963px] pt-[3.983px] relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9943 15.9943">
        <g clipPath="url(#clip0_1_6213)" id="Icon">
          <path d={svgPaths.p14a42000} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          <path d={svgPaths.p236ac500} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
        </g>
        <defs>
          <clipPath id="clip0_1_6213">
            <rect fill="white" height="15.9943" width="15.9943" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#f3f3f5] content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative rounded-[4px] shrink-0 w-[326px]">
      <Icon />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] tracking-[-0.3125px]">example@email.com</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">メールアドレス</p>
      <Frame2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9943 15.9943">
        <g clipPath="url(#clip0_1_6217)" id="Icon">
          <path d={svgPaths.p299e9b00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          <path d={svgPaths.p1ea69b00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
        </g>
        <defs>
          <clipPath id="clip0_1_6217">
            <rect fill="white" height="15.9943" width="15.9943" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Icon1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] tracking-[-0.3125px]">••••••••</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[15.994px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6621 10.662">
            <path d={svgPaths.p1d71c100} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33143 5.33143">
            <path d={svgPaths.p1d272400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[15.994px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f3f3f5] content-stretch flex items-center justify-between px-[12px] py-[8px] relative rounded-[4px] shrink-0 w-[326px]">
      <Frame4 />
      <Button2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">パスワード</p>
      <Frame3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9943 15.9943">
        <g clipPath="url(#clip0_1_6217)" id="Icon">
          <path d={svgPaths.p299e9b00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          <path d={svgPaths.p1ea69b00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
        </g>
        <defs>
          <clipPath id="clip0_1_6217">
            <rect fill="white" height="15.9943" width="15.9943" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Icon3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] tracking-[-0.3125px]">••••••••</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[15.994px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6669 10.662">
            <path d={svgPaths.p2aa89f80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-16.66%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33286 5.33143">
            <path d={svgPaths.p1617da00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f3f3f5] content-stretch flex items-center justify-between px-[12px] py-[8px] relative rounded-[4px] shrink-0 w-[326px]">
      <Frame8 />
      <Button3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[326px]" data-name="Container">
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">パスワード（確認）</p>
      <Frame5 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] shrink-0 w-full" data-name="button" style={{ backgroundImage: "linear-gradient(173.781deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center px-[24px] py-[10px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">新規登録</p>
        </div>
      </div>
    </div>
  );
}

function LoginScreen1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end relative shrink-0 w-full" data-name="LoginScreen">
      <Frame7 />
      <Button4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[1.301px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.301px] inset-0 pointer-events-none" />
    </div>
  );
}

function Text() {
  return (
    <div className="bg-white h-[19.998px] relative shrink-0 w-[73.976px]" data-name="Text">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] left-[15.99px] not-italic text-[#6a7282] text-[14px] top-[0.3px] tracking-[-0.1504px]">または</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] h-[1.301px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.301px] inset-0 pointer-events-none" />
    </div>
  );
}

function LoginScreen2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[326px]" data-name="LoginScreen">
      <Container5 />
      <Text />
      <Container6 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[0.05%_2%_0_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.008px] mask-size-[20px_20px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6 19.99">
        <g id="Group">
          <path d={svgPaths.p1b266200} fill="var(--fill-0, #4285F4)" id="Vector" />
          <path d={svgPaths.p23d34580} fill="var(--fill-0, #34A853)" id="Vector_2" />
          <path d={svgPaths.p29003300} fill="var(--fill-0, #FBBC04)" id="Vector_3" />
          <path d={svgPaths.p2951b000} fill="var(--fill-0, #E94235)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0.05%_2%_0_0]" data-name="Group">
      <Group1 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Component() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="_レイヤー_1">
      <ClipPathGroup />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Component />
      <p className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center tracking-[-0.1504px]">Googleで新規登録</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center px-[24px] py-[10px] relative w-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-center relative shrink-0 w-full">
      <LoginScreen1 />
      <LoginScreen2 />
      <Button5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[48px] items-start pb-[48px] pt-[32px] px-[16px] relative rounded-[14px] shrink-0 w-[358px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.05),0px_8px_10px_0px_rgba(0,0,0,0.05)]" />
      <LoginScreen />
      <Frame1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[16px] top-[102px] w-[358px]" data-name="Container">
      <Container1 />
      <Frame6 />
      <p className="font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal h-[16px] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center w-[358px] whitespace-pre-wrap">すべての情報は暗号化されて安全に保管されます</p>
    </div>
  );
}

export default function MepNativeBackup() {
  return (
    <div className="relative size-full" data-name="MEP-Native-backup. バックアップ確認画面" style={{ backgroundImage: "linear-gradient(154.633deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)" }}>
      <Frame />
      <Container />
    </div>
  );
}