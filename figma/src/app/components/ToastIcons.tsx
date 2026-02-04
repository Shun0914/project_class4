import svgPaths from "@/imports/svg-grveukychq";

export function CheckCircleIcon() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="CheckCircleIcon">
      <svg className="block size-full" fill="none" viewBox="0 0 21 21">
        <path d={svgPaths.p9b93d00} fill="#01B7A5" />
      </svg>
    </div>
  );
}

export function CloseRoundedIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative shrink-0 size-[20px] cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-0 p-0"
      data-name="CloseRoundedIcon"
      aria-label="閉じる"
    >
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2eaef280} fill="#01B7A5" />
      </svg>
    </button>
  );
}