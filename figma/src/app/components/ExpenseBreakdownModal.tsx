import { X, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ExpenseFilterModal } from "./ExpenseFilterModal";

interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
  color: string;
  categoryName: string;
}

interface DailyExpenses {
  date: string;
  dayOfWeek: string;
  day: number;
  items: ExpenseItem[];
}

interface ExpenseBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  onManualEntryClick?: () => void;
}

interface FilterState {
  categories: string[];
  days: number[];
}

// 利用可能なカテゴリー
const AVAILABLE_CATEGORIES = [
  { name: "食費", color: "#fa4848" },
  { name: "日用品", color: "#fab948" },
  { name: "趣味・娯楽", color: "#48db3e" },
  { name: "交通費", color: "#3ec3db" },
  { name: "水道・光熱費", color: "#483edb" },
  { name: "未分類", color: "#db3ea4" },
];

// モックデータ
const getMockExpenses = (year: number, month: number): DailyExpenses[] => {
  if (year === 2026 && month === 1) {
    return [
      {
        date: "2026年1月30日",
        dayOfWeek: "金",
        day: 30,
        items: [
          { id: 1, name: "菓子パン", amount: 100, color: "#fa4848", categoryName: "食費" },
          { id: 2, name: "コーヒー", amount: 100, color: "#fa4848", categoryName: "食費" },
          { id: 3, name: "洗剤", amount: 2100, color: "#fab948", categoryName: "日用品" },
        ],
      },
      {
        date: "2026年1月26日",
        dayOfWeek: "月",
        day: 26,
        items: [
          { id: 4, name: "水道代", amount: 500, color: "#483edb", categoryName: "水道・光熱費" },
        ],
      },
      {
        date: "2026年1月25日",
        dayOfWeek: "日",
        day: 25,
        items: [
          { id: 5, name: "ランチ", amount: 800, color: "#fa4848", categoryName: "食費" },
          { id: 6, name: "電車代", amount: 500, color: "#3ec3db", categoryName: "交通費" },
        ],
      },
    ];
  }
  return [];
};

export function ExpenseBreakdownModal({
  isOpen,
  onClose,
  year,
  month,
  onManualEntryClick,
}: ExpenseBreakdownModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [expenses, setExpenses] = useState<DailyExpenses[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [],
    days: [],
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentYear(year);
      setCurrentMonth(month);
      setSearchQuery("");
      setFilterState({ categories: [], days: [] });
    }
  }, [isOpen, year, month]);

  useEffect(() => {
    setExpenses(getMockExpenses(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // フィルタリング
  const filteredExpenses = expenses
    .map((day) => {
      const dayItems = day.items.filter((item) => {
        // 検索クエリでフィルタ
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        // カテゴリーフィルタ
        const matchesCategory =
          filterState.categories.length === 0 ||
          filterState.categories.includes(item.categoryName);
        return matchesSearch && matchesCategory;
      });
      return { ...day, items: dayItems };
    })
    .filter((day) => day.items.length > 0)
    .filter((day) => filterState.days.length === 0 || filterState.days.includes(day.day));

  // その月の日数を取得
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handleApplyFilter = (filter: FilterState) => {
    setFilterState(filter);
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
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden h-[calc(100vh-44px)] flex flex-col"
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
              <div className="size-[44px]" /> {/* Spacer */}
              <h2 className="font-['BIZ_UDPGothic',sans-serif] font-bold leading-[1.25] text-[#0a0604] text-[24px] text-center tracking-[0.96px]">
                内訳
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[44px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Search Bar and Filter */}
            <div className="flex gap-[8px] items-center px-[16px] pt-[16px] shrink-0">
              <div className="flex-1 relative">
                <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[20px] text-[#9ca3af]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="検索"
                  className="w-full pl-[40px] pr-[12px] py-[10px] bg-[#f3f4f6] rounded-[8px] font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#2a3449] outline-none border border-transparent focus:border-[#eb6b15] transition-colors"
                />
              </div>
              <button
                className="flex items-center justify-center size-[40px] rounded-[8px] bg-[#f3f4f6]"
                onClick={() => setShowFilterModal(true)}
              >
                <SlidersHorizontal className="size-[20px] text-[#5a6b8b]" />
              </button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-[16px] px-[16px] py-[16px] shrink-0">
              <button
                onClick={handlePrevMonth}
                className="flex items-center justify-center size-[32px] hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="size-[24px] text-[#eb6b15]" />
              </button>
              <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[18px] min-w-[140px] text-center">
                {currentYear}年{String(currentMonth).padStart(2, "0")}月
              </p>
              <button
                onClick={handleNextMonth}
                className="flex items-center justify-center size-[32px] hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="size-[24px] text-[#eb6b15]" />
              </button>
            </div>

            {/* Expenses List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-[16px] pb-[24px]">
              {filteredExpenses.length > 0 ? (
                <div className="flex flex-col gap-[16px]">
                  {filteredExpenses.map((day, index) => (
                    <div key={index} className="flex flex-col gap-[8px]">
                      {/* Date Header */}
                      <div className="bg-[#f3f4f6] px-[12px] py-[6px] rounded-[6px]">
                        <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[14px]">
                          {day.date}（{day.dayOfWeek}）
                        </p>
                      </div>

                      {/* Items */}
                      <div className="flex flex-col gap-[8px]">
                        {day.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-[8px]"
                          >
                            <div className="flex gap-[8px] items-center">
                              <div
                                className="rounded-full shrink-0 size-[8px]"
                                style={{ backgroundColor: item.color }}
                              />
                              <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#2a3449] text-[16px]">
                                {item.name}
                              </p>
                            </div>
                            <div className="flex items-end text-[#2a3449] text-center font-['Noto_Sans_JP',sans-serif] font-bold leading-none">
                              <p className="text-[16px]">
                                {item.amount.toLocaleString()}
                              </p>
                              <p className="text-[12px]">円</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px]">
                  <p className="font-['Noto_Sans_JP',sans-serif] text-[#9ca3af] text-[14px]">
                    {searchQuery ? "該当する支出がありません" : "支出データがありません"}
                  </p>
                </div>
              )}
            </div>

            {/* Add Button - Floating */}
            {onManualEntryClick && (
              <button
                onClick={onManualEntryClick}
                className="absolute bottom-[20px] left-1/2 -translate-x-1/2 size-[66px] rounded-full shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{
                  backgroundImage: "linear-gradient(138.394deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)"
                }}
                aria-label="手入力"
              >
                <Plus className="size-[32px] text-white" strokeWidth={3} />
              </button>
            )}
          </motion.div>

          {/* Filter Modal */}
          <ExpenseFilterModal
            isOpen={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            currentFilter={filterState}
            onApplyFilter={handleApplyFilter}
            availableCategories={AVAILABLE_CATEGORIES}
            daysInMonth={daysInMonth}
          />
        </div>
      )}
    </AnimatePresence>
  );
}