import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  initialYear: number;
  initialMonth: number;
  onConfirm: (year: number, month: number) => void;
}

export function DatePicker({
  isOpen,
  onClose,
  initialYear,
  initialMonth,
  onConfirm,
}: DatePickerProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);

  // Generate years array (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    if (isOpen) {
      setSelectedYear(initialYear);
      setSelectedMonth(initialMonth);
    }
  }, [isOpen, initialYear, initialMonth]);

  const handleConfirm = () => {
    onConfirm(selectedYear, selectedMonth);
    onClose();
  };

  const handleYearScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const itemHeight = 44;
    const scrollTop = element.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const year = years[index];
    if (year) {
      setSelectedYear(year);
    }
  };

  const handleMonthScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const itemHeight = 44;
    const scrollTop = element.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const month = months[index];
    if (month) {
      setSelectedMonth(month);
    }
  };

  // Scroll to initial position
  useEffect(() => {
    if (isOpen && yearRef.current && monthRef.current) {
      const itemHeight = 44;
      const yearIndex = years.indexOf(selectedYear);
      const monthIndex = months.indexOf(selectedMonth);

      if (yearIndex >= 0) {
        yearRef.current.scrollTop = yearIndex * itemHeight;
      }
      if (monthIndex >= 0) {
        monthRef.current.scrollTop = monthIndex * itemHeight;
      }
    }
  }, [isOpen]);

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

          {/* Picker content */}
          <motion.div
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg"
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
            <div className="flex items-center justify-between px-[16px] py-[16px] border-b border-[#e2e9f2]">
              <button
                onClick={onClose}
                className="font-['Noto_Sans_JP',sans-serif] font-normal text-[16px] text-[#5a6b8b]"
              >
                キャンセル
              </button>
              <h3 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] text-[#2a3449]">
                年月選択
              </h3>
              <button
                onClick={handleConfirm}
                className="font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] text-[#eb6b15]"
              >
                完了
              </button>
            </div>

            {/* Drum roll pickers */}
            <div className="relative h-[264px] flex items-center justify-center gap-[20px] px-[40px]">
              {/* Selection highlight */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[44px] border-y border-[#e2e9f2] pointer-events-none" />

              {/* Gradient overlays */}
              <div className="absolute left-0 right-0 top-0 h-[110px] bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
              <div className="absolute left-0 right-0 bottom-0 h-[110px] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

              {/* Year picker */}
              <div className="flex-1 relative">
                <div
                  ref={yearRef}
                  onScroll={handleYearScroll}
                  className="h-[264px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                  style={{
                    scrollSnapType: "y mandatory",
                  }}
                >
                  {/* Top padding */}
                  <div className="h-[110px]" />

                  {years.map((year) => (
                    <div
                      key={year}
                      className="h-[44px] flex items-center justify-center snap-center"
                      onClick={() => {
                        setSelectedYear(year);
                        const index = years.indexOf(year);
                        if (yearRef.current) {
                          yearRef.current.scrollTo({
                            top: index * 44,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      <p
                        className={`font-['Noto_Sans_JP',sans-serif] text-[20px] transition-all ${
                          year === selectedYear
                            ? "font-bold text-[#2a3449] scale-110"
                            : "font-normal text-[#a1b3cd]"
                        }`}
                      >
                        {year}年
                      </p>
                    </div>
                  ))}

                  {/* Bottom padding */}
                  <div className="h-[110px]" />
                </div>
              </div>

              {/* Month picker */}
              <div className="flex-1 relative">
                <div
                  ref={monthRef}
                  onScroll={handleMonthScroll}
                  className="h-[264px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                  style={{
                    scrollSnapType: "y mandatory",
                  }}
                >
                  {/* Top padding */}
                  <div className="h-[110px]" />

                  {months.map((month) => (
                    <div
                      key={month}
                      className="h-[44px] flex items-center justify-center snap-center"
                      onClick={() => {
                        setSelectedMonth(month);
                        const index = months.indexOf(month);
                        if (monthRef.current) {
                          monthRef.current.scrollTo({
                            top: index * 44,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      <p
                        className={`font-['Noto_Sans_JP',sans-serif] text-[20px] transition-all ${
                          month === selectedMonth
                            ? "font-bold text-[#2a3449] scale-110"
                            : "font-normal text-[#a1b3cd]"
                        }`}
                      >
                        {month}月
                      </p>
                    </div>
                  ))}

                  {/* Bottom padding */}
                  <div className="h-[110px]" />
                </div>
              </div>
            </div>

            {/* Bottom safe area */}
            <div className="h-[40px]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
