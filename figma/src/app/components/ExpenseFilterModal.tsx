import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface FilterState {
  categories: string[];
  days: number[];
}

interface ExpenseFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilter: FilterState;
  onApplyFilter: (filter: FilterState) => void;
  availableCategories: { name: string; color: string }[];
  daysInMonth: number;
}

export function ExpenseFilterModal({
  isOpen,
  onClose,
  currentFilter,
  onApplyFilter,
  availableCategories,
  daysInMonth,
}: ExpenseFilterModalProps) {
  const [tempFilter, setTempFilter] = useState<FilterState>(currentFilter);
  const [activeTab, setActiveTab] = useState<"category" | "day">("category");

  useEffect(() => {
    if (isOpen) {
      setTempFilter(currentFilter);
      setActiveTab("category");
    }
  }, [isOpen, currentFilter]);

  const handleCategoryToggle = (categoryName: string) => {
    setTempFilter((prev) => {
      const categories = prev.categories.includes(categoryName)
        ? prev.categories.filter((c) => c !== categoryName)
        : [...prev.categories, categoryName];
      return { ...prev, categories };
    });
  };

  const handleDayToggle = (day: number) => {
    setTempFilter((prev) => {
      const days = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days };
    });
  };

  const handleReset = () => {
    setTempFilter({ categories: [], days: [] });
  };

  const handleApply = () => {
    onApplyFilter(tempFilter);
    onClose();
  };

  const hasActiveFilters = tempFilter.categories.length > 0 || tempFilter.days.length > 0;

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
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden max-h-[80vh] flex flex-col"
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
            <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2] shrink-0">
              <button
                onClick={handleReset}
                className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#eb6b15] text-[16px] hover:underline"
              >
                リセット
              </button>
              <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.25] text-[#2a3449] text-[20px] text-center">
                絞り込み
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#e2e9f2] shrink-0">
              <button
                onClick={() => setActiveTab("category")}
                className={`flex-1 py-[12px] font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] transition-colors relative ${
                  activeTab === "category"
                    ? "text-[#eb6b15]"
                    : "text-[#9ca3af]"
                }`}
              >
                カテゴリー別
                {activeTab === "category" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#eb6b15]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("day")}
                className={`flex-1 py-[12px] font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] transition-colors relative ${
                  activeTab === "day"
                    ? "text-[#eb6b15]"
                    : "text-[#9ca3af]"
                }`}
              >
                日
                {activeTab === "day" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#eb6b15]" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-[16px] py-[16px]">
              {activeTab === "category" && (
                <div className="flex flex-col gap-[8px]">
                  {availableCategories.map((category) => {
                    const isSelected = tempFilter.categories.includes(category.name);
                    return (
                      <button
                        key={category.name}
                        onClick={() => handleCategoryToggle(category.name)}
                        className={`flex items-center gap-[12px] p-[12px] rounded-[8px] border transition-colors ${
                          isSelected
                            ? "border-[#eb6b15] bg-[#fff8f3]"
                            : "border-[#e2e9f2] bg-white hover:border-[#a1b3cd]"
                        }`}
                      >
                        <div
                          className="rounded-full shrink-0 size-[12px]"
                          style={{ backgroundColor: category.color }}
                        />
                        <p className="flex-1 font-['Noto_Sans_JP',sans-serif] font-normal text-[#2a3449] text-[16px] text-left">
                          {category.name}
                        </p>
                        {isSelected && (
                          <div className="size-[20px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                            <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTab === "day" && (
                <div className="grid grid-cols-7 gap-[8px]">
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const isSelected = tempFilter.days.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`aspect-square flex items-center justify-center rounded-[8px] font-['Noto_Sans_JP',sans-serif] font-bold text-[14px] transition-colors ${
                          isSelected
                            ? "bg-[#eb6b15] text-white"
                            : "bg-[#f3f4f6] text-[#2a3449] hover:bg-[#e2e9f2]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="px-[16px] py-[16px] border-t border-[#e2e9f2] shrink-0">
              <button
                onClick={handleApply}
                className="w-full bg-[#eb6b15] text-white font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] py-[12px] rounded-[8px] hover:bg-[#d15a0a] transition-colors"
              >
                適用する
                {hasActiveFilters && (
                  <span className="ml-[4px]">
                    ({tempFilter.categories.length + tempFilter.days.length})
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
