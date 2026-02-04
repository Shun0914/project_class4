import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function ReportModal({ isOpen, onClose, title, content }: ReportModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={onClose}
        >
          {/* Background overlay with fade in */}
          <motion.div 
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />
          
          {/* Modal content with slide up from bottom - approximately 1/3 of screen */}
          <motion.div 
            className="relative bg-[#f7f6f5] rounded-t-[24px] w-full h-[390px] max-h-[50vh] shadow-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 300
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - positioned in top right corner */}
            <div className="flex items-center justify-between pt-[8px] px-[8px] w-full">
              <div className="size-[44px]" /> {/* Spacer */}
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[44px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col px-[20px] pb-[40px] overflow-y-auto" style={{ maxHeight: 'calc(100% - 60px)' }}>
              {/* Title - only if provided */}
              {title && (
                <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[18px] text-[#2a3449] mb-[16px]">
                  {title}
                </h2>
              )}

              {/* Message */}
              <div className="overflow-y-auto">
                <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[16px] text-[#0a0604] leading-[1.5] whitespace-pre-wrap">
                  {content}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}