import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

type CoachMode = "demon" | "angel";

interface CoachModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: CoachMode;
  onSave: (mode: CoachMode) => void;
}

export function CoachModeModal({
  isOpen,
  onClose,
  currentMode,
  onSave,
}: CoachModeModalProps) {
  const [selectedMode, setSelectedMode] = useState<CoachMode>(currentMode);

  useEffect(() => {
    if (isOpen) {
      setSelectedMode(currentMode);
    }
  }, [isOpen, currentMode]);

  const handleSelect = (mode: CoachMode) => {
    setSelectedMode(mode);
  };

  const handleSave = () => {
    onSave(selectedMode);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
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
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-y-auto h-[calc(100vh-44px)]"
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
              <div className="size-[44px]" /> {/* Spacer */}
              <h2 className="font-['BIZ_UDPGothic',sans-serif] font-bold leading-[1.25] text-[#0a0604] text-[24px] text-center tracking-[0.96px]">
                分析設定
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[44px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex flex-col gap-[20px] px-[16px] pt-[20px] pb-[40px]">
              {/* Options */}
              <div className="flex flex-col gap-[12px]">
                {/* Demon Mode Option */}
                <button
                  onClick={() => handleSelect("demon")}
                  className={`flex items-center justify-between p-[16px] rounded-[8px] border transition-colors ${
                    selectedMode === "demon"
                      ? "border-[#eb6b15] bg-[#fff8f3]"
                      : "border-[#e2e9f2] bg-white hover:border-[#a1b3cd]"
                  }`}
                >
                  <div className="flex flex-col items-start gap-[4px]">
                    <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[1.5]">
                      鬼コーチモード
                    </p>
                    <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                      厳しめのアドバイスを提供します
                    </p>
                  </div>
                  {selectedMode === "demon" && (
                    <div className="size-[24px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path
                          d="M13.3332 4L5.99984 11.3333L2.6665 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Angel Mode Option */}
                <button
                  onClick={() => handleSelect("angel")}
                  className={`flex items-center justify-between p-[16px] rounded-[8px] border transition-colors ${
                    selectedMode === "angel"
                      ? "border-[#eb6b15] bg-[#fff8f3]"
                      : "border-[#e2e9f2] bg-white hover:border-[#a1b3cd]"
                  }`}
                >
                  <div className="flex flex-col items-start gap-[4px]">
                    <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[1.5]">
                      天使コーチモード
                    </p>
                    <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                      優しくサポートします
                    </p>
                  </div>
                  {selectedMode === "angel" && (
                    <div className="size-[24px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path
                          d="M13.3332 4L5.99984 11.3333L2.6665 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="h-[48px] w-full rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)]"
                style={{
                  backgroundImage:
                    "linear-gradient(173.21deg, rgb(246, 140, 68) 2.1423%, rgb(253, 150, 80) 34.595%, rgb(235, 107, 21) 99.971%)",
                }}
              >
                <p className="font-['Inter',sans-serif] font-medium leading-[20px] text-[14px] text-center text-white tracking-[-0.1504px]">
                  保存する
                </p>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
