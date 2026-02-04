import { toast } from "sonner";
import { CheckCircleIcon, CloseRoundedIcon } from "@/app/components/ToastIcons";

interface CustomToastProps {
  message: string;
  toastId: string | number;
}

export function CustomToast({ message, toastId }: CustomToastProps) {
  return (
    <div className="bg-[#f2fffe] rounded-[6px] w-[343px] relative">
      <div className="flex gap-[4px] items-center px-[16px] py-[12px] relative">
        <CheckCircleIcon />
        <p className="flex-[1_0_0] font-['Noto_Sans_JP:Regular',sans-serif] leading-[1.5] text-[#01b7a5] text-[14px] whitespace-pre-wrap">
          {message}
        </p>
        <CloseRoundedIcon onClick={() => toast.dismiss(toastId)} />
      </div>
      <div 
        aria-hidden="true" 
        className="absolute border border-[#01b7a5] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_0.8px_1.5px_0px_rgba(0,0,0,0.1),0px_6px_12px_0px_rgba(0,0,0,0.2)]" 
      />
    </div>
  );
}
