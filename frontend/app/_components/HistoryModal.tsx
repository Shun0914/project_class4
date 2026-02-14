'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { getExpenses, type ExpenseItem } from '@/lib/api/expenses';

const CATEGORY_MAP = [
  { id: 1, name: "未分類", color: "#db3ea4" },
  { id: 2, name: "食費", color: "#fa4848" },
  { id: 3, name: "日用品", color: "#fab948" },
  { id: 4, name: "趣味・娯楽", color: "#48db3e" },
  { id: 5, name: "交通費", color: "#3ec3db" },
  { id: 6, name: "水道・光熱費", color: "#483edb" },
];

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

type Props = {
  open: boolean;
  onClose: () => void;
  onAddExpense?: () => void;
  refreshKey?: number;
};

type GroupedExpenses = {
  dateLabel: string;
  dateKey: string;
  items: ExpenseItem[];
};

function groupByDate(expenses: ExpenseItem[]): GroupedExpenses[] {
  const map = new Map<string, ExpenseItem[]>();
  for (const exp of expenses) {
    const key = exp.expense_date;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(exp);
  }

  const groups: GroupedExpenses[] = [];
  for (const [dateKey, items] of map) {
    const d = new Date(dateKey + "T00:00:00");
    const label = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`;
    groups.push({ dateLabel: label, dateKey, items });
  }
  return groups;
}

function getCategoryColor(categoryId: number | null): string {
  return CATEGORY_MAP.find(c => c.id === categoryId)?.color ?? "#9ca3af";
}

export function HistoryModal({ open, onClose, onAddExpense, refreshKey }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // 絞り込みモーダル
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<'category' | 'day'>('category');
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const [selectedDays, setSelectedDays] = useState<Set<number>>(new Set());

  // 適用済みフィルタ
  const [appliedCategories, setAppliedCategories] = useState<Set<number>>(new Set());
  const [appliedDays, setAppliedDays] = useState<Set<number>>(new Set());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getExpenses(year, month);
      setExpenses(res.expenses);
    } catch (e) {
      console.error(e);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    if (open) {
      const now = new Date();
      setYear(now.getFullYear());
      setMonth(now.getMonth() + 1);
      setSearchText('');
      setAppliedCategories(new Set());
      setAppliedDays(new Set());
    }
  }, [open]);

  useEffect(() => {
    if (open) fetchData();
  }, [open, fetchData]);

  // 支出登録後の自動リフレッシュ
  useEffect(() => {
    if (open && refreshKey) fetchData();
  }, [refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePrevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else { setMonth(m => m - 1); }
  };

  const handleNextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else { setMonth(m => m + 1); }
  };

  // フィルタ適用
  const filteredExpenses = useMemo(() => {
    let result = expenses;

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      result = result.filter(e =>
        e.item.toLowerCase().includes(q) ||
        (e.category_name ?? '').toLowerCase().includes(q)
      );
    }

    if (appliedCategories.size > 0) {
      result = result.filter(e => e.category_id !== null && appliedCategories.has(e.category_id));
    }

    if (appliedDays.size > 0) {
      result = result.filter(e => {
        const day = new Date(e.expense_date + "T00:00:00").getDate();
        return appliedDays.has(day);
      });
    }

    return result;
  }, [expenses, searchText, appliedCategories, appliedDays]);

  const grouped = useMemo(() => groupByDate(filteredExpenses), [filteredExpenses]);

  // 絞り込みモーダルを開くとき、適用済みフィルタを仮選択にコピー
  const openFilter = () => {
    setSelectedCategories(new Set(appliedCategories));
    setSelectedDays(new Set(appliedDays));
    setFilterTab('category');
    setIsFilterOpen(true);
  };

  const applyFilter = () => {
    setAppliedCategories(new Set(selectedCategories));
    setAppliedDays(new Set(selectedDays));
    setIsFilterOpen(false);
  };

  const filterCount = (filterTab === 'category' ? selectedCategories.size : selectedDays.size);

  // カレンダーグリッド用
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  return (
    <AnimatePresence>
      {open && (
        <div key="history-modal-root" className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            key="history-overlay"
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            key="history-content"
            className="relative bg-[#fffdf2] rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden flex flex-col h-[calc(100vh-44px)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2] shrink-0 bg-white">
              <div className="w-[40px]" />
              <h2 className="font-bold text-[#2a3449] text-[20px]">内訳</h2>
              <button onClick={onClose} className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-100 transition-colors">
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* 検索バー */}
            <div className="px-[16px] pt-[16px] pb-[8px] flex gap-[8px] shrink-0">
              <div className="flex-1 relative">
                <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[18px] text-[#9ca3af]" />
                <input
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder="検索"
                  className="w-full pl-[40px] pr-[12px] py-[10px] bg-white border border-[#e2e9f2] rounded-[8px] text-[14px] outline-none focus:border-[#eb6b15]"
                />
              </div>
              <button
                onClick={openFilter}
                className="flex items-center justify-center size-[42px] bg-white border border-[#e2e9f2] rounded-[8px] hover:bg-gray-50 transition-colors relative"
              >
                <SlidersHorizontal className="size-[18px] text-[#7C7A78]" />
                {(appliedCategories.size > 0 || appliedDays.size > 0) && (
                  <span className="absolute -top-1 -right-1 size-[16px] bg-[#eb6b15] rounded-full text-white text-[10px] flex items-center justify-center">
                    {appliedCategories.size + appliedDays.size}
                  </span>
                )}
              </button>
            </div>

            {/* 月ナビ */}
            <div className="flex items-center justify-center gap-[24px] px-[16px] py-[12px] shrink-0">
              <button onClick={handlePrevMonth} className="flex items-center justify-center size-[32px] rounded-full hover:bg-gray-100 transition-colors">
                <ChevronLeft className="size-[20px] text-[#2a3449]" />
              </button>
              <span className="font-bold text-[#2a3449] text-[16px] min-w-[120px] text-center">
                {year}年{String(month).padStart(2, '0')}月
              </span>
              <button onClick={handleNextMonth} className="flex items-center justify-center size-[32px] rounded-full hover:bg-gray-100 transition-colors">
                <ChevronRight className="size-[20px] text-[#2a3449]" />
              </button>
            </div>

            {/* 支出リスト */}
            <div className="flex-1 overflow-y-auto px-[16px] pb-[24px]">
              {loading ? (
                <div className="flex items-center justify-center py-[60px]">
                  <div className="animate-spin size-[32px] border-4 border-[#eb6b15] border-t-transparent rounded-full" />
                </div>
              ) : grouped.length === 0 ? (
                <div className="flex items-center justify-center py-[60px]">
                  <p className="text-[#9ca3af] text-[14px]">支出データがありません</p>
                </div>
              ) : (
                <div className="flex flex-col gap-[16px]">
                  {grouped.map(group => (
                    <div key={group.dateKey}>
                      <p className="text-[#6a7282] text-[12px] font-bold mb-[8px]">{group.dateLabel}</p>
                      <div className="flex flex-col bg-white rounded-[12px] overflow-hidden">
                        {group.items.map((exp, idx) => (
                          <div
                            key={exp.id}
                            className={`flex items-center px-[16px] py-[14px] ${idx > 0 ? 'border-t border-[#f3f3f3]' : ''}`}
                          >
                            <span
                              className="size-[10px] rounded-full shrink-0 mr-[12px]"
                              style={{ backgroundColor: getCategoryColor(exp.category_id) }}
                            />
                            <span className="flex-1 text-[14px] text-[#2a3449] truncate">{exp.item}</span>
                            <span className="text-[14px] font-bold text-[#2a3449] ml-[8px] whitespace-nowrap">
                              {exp.price.toLocaleString()}円
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* FABボタン */}
            {onAddExpense && (
              <button
                type="button"
                aria-label="支出を入力"
                onClick={onAddExpense}
                className="absolute bottom-6 right-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#eb6b15] text-white text-3xl shadow-lg hover:bg-[#d15a0a] transition-colors"
              >
                +
              </button>
            )}
          </motion.div>

          {/* 絞り込みモーダル */}
          <AnimatePresence>
            {isFilterOpen && (
              <div className="fixed inset-0 z-[60] flex items-end justify-center">
                <motion.div
                  key="filter-overlay"
                  className="absolute inset-0 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                />
                <motion.div
                  key="filter-content"
                  className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden flex flex-col"
                  style={{ maxHeight: '70vh' }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  {/* 絞り込みヘッダー */}
                  <div className="flex items-center justify-between px-[16px] py-[16px] border-b border-[#e2e9f2] shrink-0">
                    <div className="w-[40px]" />
                    <h3 className="font-bold text-[#2a3449] text-[18px]">絞り込み</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-100 transition-colors">
                      <X className="size-[20px] text-[#7C7A78]" />
                    </button>
                  </div>

                  {/* タブ */}
                  <div className="flex border-b border-[#e2e9f2] shrink-0">
                    <button
                      onClick={() => setFilterTab('category')}
                      className={`flex-1 py-[12px] text-[14px] font-bold text-center transition-colors ${
                        filterTab === 'category' ? 'text-[#eb6b15] border-b-2 border-[#eb6b15]' : 'text-[#9ca3af]'
                      }`}
                    >
                      カテゴリー別
                    </button>
                    <button
                      onClick={() => setFilterTab('day')}
                      className={`flex-1 py-[12px] text-[14px] font-bold text-center transition-colors ${
                        filterTab === 'day' ? 'text-[#eb6b15] border-b-2 border-[#eb6b15]' : 'text-[#9ca3af]'
                      }`}
                    >
                      日
                    </button>
                  </div>

                  {/* タブコンテンツ */}
                  <div className="flex-1 overflow-y-auto px-[16px] py-[16px]">
                    {filterTab === 'category' ? (
                      <div className="flex flex-col gap-[4px]">
                        {CATEGORY_MAP.map(cat => {
                          const checked = selectedCategories.has(cat.id);
                          return (
                            <button
                              key={cat.id}
                              onClick={() => {
                                const next = new Set(selectedCategories);
                                if (checked) next.delete(cat.id);
                                else next.add(cat.id);
                                setSelectedCategories(next);
                              }}
                              className="flex items-center gap-[12px] px-[12px] py-[12px] rounded-[8px] hover:bg-gray-50 transition-colors"
                            >
                              <span className="size-[10px] rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                              <span className="flex-1 text-[14px] text-[#2a3449] text-left">{cat.name}</span>
                              <div className={`size-[22px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                                checked ? 'bg-[#eb6b15] border-[#eb6b15]' : 'border-[#d1d5db]'
                              }`}>
                                {checked && <Check className="size-[14px] text-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        {/* 曜日ヘッダー */}
                        <div className="grid grid-cols-7 gap-[4px] mb-[8px]">
                          {WEEKDAYS.map(w => (
                            <div key={w} className="text-center text-[12px] text-[#9ca3af] font-bold py-[4px]">{w}</div>
                          ))}
                        </div>
                        {/* 日付グリッド */}
                        <div className="grid grid-cols-7 gap-[4px]">
                          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const checked = selectedDays.has(day);
                            return (
                              <button
                                key={day}
                                onClick={() => {
                                  const next = new Set(selectedDays);
                                  if (checked) next.delete(day);
                                  else next.add(day);
                                  setSelectedDays(next);
                                }}
                                className={`aspect-square rounded-full flex items-center justify-center text-[13px] transition-colors ${
                                  checked ? 'bg-[#eb6b15] text-white font-bold' : 'text-[#2a3449] hover:bg-gray-100'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 適用ボタン */}
                  <div className="px-[16px] py-[16px] border-t border-[#e2e9f2] shrink-0">
                    <button
                      onClick={applyFilter}
                      className="w-full bg-[#eb6b15] text-white font-bold py-[14px] rounded-[8px] hover:bg-[#d15a0a] transition-colors text-[16px]"
                    >
                      適用する{filterCount > 0 ? `(${filterCount})` : ''}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
