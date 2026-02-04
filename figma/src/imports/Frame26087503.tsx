import svgPaths from "./svg-grveukychq";

function CheckCircleIcon() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="CheckCircleIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="CheckCircleIcon">
          <mask height="21" id="mask0_2_36430" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="21" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="21" id="Bounding box" width="21" />
          </mask>
          <g mask="url(#mask0_2_36430)">
            <path d={svgPaths.p9b93d00} fill="var(--fill-0, #01B7A5)" id="check_circle" />
            <g id="info">
              <mask height="22" id="mask1_2_36430" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="21" x="0" y="61">
                <rect fill="var(--fill-0, #D9D9D9)" height="21" id="Bounding box_2" width="21" y="61.25" />
              </mask>
              <g mask="url(#mask1_2_36430)">
                <path d={svgPaths.p37b61fc0} fill="var(--fill-0, #F2FFFE)" id="info_2" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function CloseRoundedIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="CloseRoundedIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="CloseRoundedIcon">
          <mask height="20" id="mask0_2_36426" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #6D7B8D)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_2_36426)">
            <path d={svgPaths.p2eaef280} fill="var(--fill-0, #01B7A5)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SnackbarV() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f2fffe] bottom-0 left-1/2 rounded-[6px] w-[343px]" data-name="Snackbar_v2">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] w-full">
        <CheckCircleIcon />
        <p className="flex-[1_0_0] font-['Noto_Sans_JP:Regular',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[#01b7a5] text-[14px] whitespace-pre-wrap">登録が完了しました！</p>
        <CloseRoundedIcon />
      </div>
      <div aria-hidden="true" className="absolute border border-[#01b7a5] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0.8px_1.5px_0px_rgba(0,0,0,0.1),0px_6px_12px_0px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <SnackbarV />
    </div>
  );
}