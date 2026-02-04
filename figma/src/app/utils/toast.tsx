import { toast } from "sonner";
import { CustomToast } from "@/app/components/CustomToast";

export const showSuccessToast = (message: string) => {
  const toastId = toast.custom(
    (t) => <CustomToast message={message} toastId={t} />,
    {
      duration: 4000,
      position: "bottom-center",
    }
  );
  
  return toastId;
};
