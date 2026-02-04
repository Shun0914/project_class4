import { X, Camera, Upload, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReceiptMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMethodSelect: (method: 'camera' | 'upload' | 'file') => void;
}

export function ReceiptMethodModal({ isOpen, onClose, onMethodSelect }: ReceiptMethodModalProps) {
  const methods = [
    {
      id: 'camera' as const,
      icon: Camera,
      label: 'カメラで撮影',
      description: 'レシートを撮影する',
    },
    {
      id: 'upload' as const,
      icon: Upload,
      label: 'ファイルアップロード',
      description: '写真をアップロードする',
    },
    {
      id: 'file' as const,
      icon: FolderOpen,
      label: 'ファイル選択',
      description: 'デバイスから選択する',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal content - Slide up from bottom */}
          <motion.div
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2]">
              <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.25] text-[#2a3449] text-[20px]">
                レシート読込方法
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Methods */}
            <div className="px-[16px] py-[24px] flex flex-col gap-[12px]">
              {methods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      onMethodSelect(method.id);
                      onClose();
                    }}
                    className="flex items-center gap-[16px] p-[16px] bg-white border border-[#e2e9f2] rounded-[12px] hover:border-[#eb6b15] hover:bg-[#fff8f3] transition-colors"
                  >
                    <div className="flex items-center justify-center size-[48px] bg-[#fff3e1] rounded-[12px]">
                      <Icon className="size-[24px] text-[#eb6b15]" />
                    </div>
                    <div className="flex flex-col items-start gap-[2px]">
                      <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] text-[#2a3449]">
                        {method.label}
                      </p>
                      <p className="font-['Noto_Sans_JP',sans-serif] text-[12px] text-[#7c7a78]">
                        {method.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}