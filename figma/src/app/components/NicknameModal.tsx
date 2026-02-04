import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface NicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  onSave: (nickname: string) => void;
}

export function NicknameModal({
  isOpen,
  onClose,
  currentNickname,
  onSave,
}: NicknameModalProps) {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNickname(currentNickname);
    }
  }, [isOpen, currentNickname]);

  const handleSave = () => {
    if (nickname.trim()) {
      onSave(nickname.trim());
      onClose();
    }
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
                ニックネーム編集
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
              {/* Nickname Field */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[16px]">
                  ニックネーム
                </label>
                <div className="bg-white border border-[#a1b3cd] rounded-[4px]">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="ニックネームを入力"
                    className="w-full px-[16px] py-[12px] font-['Noto_Sans_JP',sans-serif] font-normal leading-[1.5] text-[#2a3449] text-[16px] outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={!nickname.trim()}
                className="h-[48px] w-full rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] disabled:opacity-50 disabled:cursor-not-allowed"
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
