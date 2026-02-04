import { Plus } from "lucide-react";

export function FloatingAddButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex flex-col gap-[4px] items-center">
      <button
        onClick={onClick}
        className="flex items-center justify-center size-[66px] rounded-full shadow-[0px_1.375px_4.125px_0px_rgba(0,0,0,0.1),0px_1.375px_2.75px_0px_rgba(0,0,0,0.06)]"
        style={{
          backgroundImage:
            "linear-gradient(138.394deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)",
        }}
      >
        <Plus className="size-[44.786px] text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}