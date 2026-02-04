import { X, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import svgPaths from "@/imports/svg-1f3i968b6w";
import { showSuccessToast } from "@/app/utils/toast";

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisText?: string;
  hasAnalysis?: boolean;
}

export function AICoachModal({ isOpen, onClose, analysisText, hasAnalysis = true }: AICoachModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysisText, setCurrentAnalysisText] = useState(analysisText);
  const [hasCurrentAnalysis, setHasCurrentAnalysis] = useState(hasAnalysis);

  const defaultAnalysisText =
    "ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。ここに今月の鬼コーチによる分析結果のテキストが入ります。";

  // Reset state when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setCurrentAnalysisText(analysisText);
      setHasCurrentAnalysis(hasAnalysis);
      setIsAnalyzing(false);
    }
  }, [isOpen, analysisText, hasAnalysis]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // 模擬的に2秒後にローディングを終了し、分析結果を表示
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasCurrentAnalysis(true);
      setCurrentAnalysisText(defaultAnalysisText);
      showSuccessToast("分析が完了しました");
    }, 2000);
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
            <div className="flex items-center justify-center px-[16px] py-[20px] w-full border-b border-[#e2e9f2] relative">
              <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.25] text-[#2a3449] text-[20px]">
                AIコーチ分析
              </h2>
              <button
                onClick={onClose}
                className="absolute right-[16px] flex items-center justify-center size-[40px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Content */}
            <div className="px-[16px] py-[24px] flex flex-col gap-[20px]">
              {/* Section Title */}
              <div className="flex flex-col gap-[8px]">
                <h3 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] text-[#2a3449]">
                  今月の分析
                </h3>
              </div>

              {/* Analysis Text Area */}
              {hasCurrentAnalysis ? (
                <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] min-h-[200px]">
                  <p className="font-['Noto_Sans_JP',sans-serif] text-[16px] text-[#0a0604] leading-[1.5]">
                    {currentAnalysisText || defaultAnalysisText}
                  </p>
                </div>
              ) : (
                <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] min-h-[120px] flex items-center justify-center">
                  <p className="font-['Noto_Sans_JP',sans-serif] text-[16px] text-[#0a0604] leading-[1.5] text-center">
                    今月の分析結果はありません
                  </p>
                </div>
              )}

              {/* Analyze/Re-analyze Button */}
              {hasCurrentAnalysis ? (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full flex items-center justify-center gap-[8px] py-[14px] rounded-[8px] font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] transition-colors border border-[#eb6b15] ${
                    isAnalyzing
                      ? "bg-[#9ca3af] text-white cursor-not-allowed border-[#9ca3af]"
                      : "bg-white text-[#eb6b15] hover:bg-[#fff5f0]"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        className="size-[20px] border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      再分析する
                    </>
                  ) : (
                    <>
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <g clipPath="url(#clip0_reanalyze)">
                          <path d={svgPaths.p1aa6baf0} fill="#EB6B15" />
                        </g>
                        <defs>
                          <clipPath id="clip0_reanalyze">
                            <rect fill="white" height="16" width="16" />
                          </clipPath>
                        </defs>
                      </svg>
                      再分析する
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full flex items-center justify-center gap-[8px] py-[14px] rounded-[8px] font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] transition-colors ${
                    isAnalyzing
                      ? "bg-[#9ca3af] text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-[#f5a047] to-[#f7b563] text-white hover:from-[#e08f36] hover:to-[#e6a552]"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        className="size-[20px] border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      分析する
                    </>
                  ) : (
                    <>
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <g clipPath="url(#clip0_analyze)">
                          <path d={svgPaths.p1aa6baf0} fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_analyze">
                            <rect fill="white" height="16" width="16" />
                          </clipPath>
                        </defs>
                      </svg>
                      分析する
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}