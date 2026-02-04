import { motion, AnimatePresence } from "motion/react";
import svgPaths from "@/imports/svg-phu49jyac3";

interface ReceiptLoadingModalProps {
  isOpen: boolean;
}

export function ReceiptLoadingModal({ isOpen }: ReceiptLoadingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            className="relative bg-white rounded-[24px] w-[300px] shadow-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            <div className="flex flex-col items-center gap-[24px] px-[32px] py-[40px]">
              {/* Receipt Icon with Animation */}
              <motion.div
                className="relative size-[80px]"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="size-full flex items-center justify-center">
                  <svg
                    className="size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <mask
                        height="24"
                        id="mask0_loading_receipt"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "alpha" }}
                        width="24"
                        x="0"
                        y="0"
                      >
                        <rect fill="#D9D9D9" height="24" width="24" />
                      </mask>
                      <g mask="url(#mask0_loading_receipt)">
                        <path d={svgPaths.p280a9380} fill="#EB6B15" />
                      </g>
                    </g>
                  </svg>
                </div>

                {/* Scanning Line Effect */}
                <motion.div
                  className="absolute inset-x-0 h-[2px] bg-[#eb6b15] opacity-60"
                  animate={{
                    top: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Loading Text */}
              <div className="flex flex-col items-center gap-[8px]">
                <h3 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[18px] text-[#2a3449]">
                  レシートを読み取り中
                </h3>
                <p className="font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#7c7a78] text-center">
                  しばらくお待ちください
                </p>
              </div>

              {/* Loading Dots Animation */}
              <div className="flex gap-[8px]">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="size-[8px] rounded-full bg-[#eb6b15]"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
