import { X, Calendar, ChevronDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import svgPaths from "@/imports/svg-phu49jyac3";
import { DateCalendarPicker } from "@/app/components/DateCalendarPicker";

interface ExpenseItem {
  id: string;
  name: string;
  amount: string;
  category: string;
}

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiptScanClick?: () => void;
  onSave?: () => void;
}

const CATEGORIES = [
  { name: "未分類", color: "#db3ea4" },
  { name: "食費", color: "#fa4848" },
  { name: "日用品", color: "#fab948" },
  { name: "趣味・娯楽", color: "#48db3e" },
  { name: "交通費", color: "#3ec3db" },
  { name: "水道・光熱費", color: "#483edb" },
];

export function ManualEntryModal({ isOpen, onClose, onReceiptScanClick, onSave }: ManualEntryModalProps) {
  const [date, setDate] = useState(new Date(2026, 0, 31)); // January 31, 2026
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [items, setItems] = useState<ExpenseItem[]>([
    { id: "1", name: "", amount: "", category: "未分類" },
  ]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setDate(new Date(2026, 0, 31));
      setItems([{ id: "1", name: "", amount: "", category: "未分類" }]);
    }
  }, [isOpen]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekDay = weekDays[date.getDay()];
    return `${year}年${month}月${day}日 (${weekDay})`;
  };

  const handleDateConfirm = (newDate: Date) => {
    setDate(newDate);
  };

  const handleAddItem = () => {
    const newId = (items.length + 1).toString();
    setItems([
      ...items,
      { id: newId, name: "", amount: "", category: "未分類" },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (
    id: string,
    field: keyof ExpenseItem,
    value: string
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    // TODO: 保存処理を実装
    console.log("保存:", { date, items });
    onSave?.();
    onClose();
  };

  const getCategoryColor = (categoryName: string) => {
    const category = CATEGORIES.find((c) => c.name === categoryName);
    return category?.color || "#db3ea4";
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
              <button
                onClick={() => {
                  onReceiptScanClick?.();
                }}
                className="flex flex-col items-center gap-[4px] hover:opacity-70 transition-opacity"
              >
                <div className="size-[24px] flex items-center justify-center">
                  <svg
                    className="size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <mask
                        height="24"
                        id="mask0_modal_receipt"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "alpha" }}
                        width="24"
                        x="0"
                        y="0"
                      >
                        <rect fill="#D9D9D9" height="24" width="24" />
                      </mask>
                      <g mask="url(#mask0_modal_receipt)">
                        <path d={svgPaths.p280a9380} fill="#EB6B15" />
                      </g>
                    </g>
                  </svg>
                </div>
                <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[10px] text-[#7c7a78]">
                  レシート
                </p>
              </button>
              <h2 className="absolute left-1/2 -translate-x-1/2 font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.25] text-[#2a3449] text-[20px]">
                入力
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-200/50 transition-colors"
                aria-label="閉じる"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-[16px] py-[24px]">
              <div className="flex flex-col gap-[20px]">
                {/* 日付 */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-['Noto_Sans_JP',sans-serif] font-bold text-[14px] text-[#2a3449]">
                    日付
                  </label>
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="w-full px-[16px] py-[12px] bg-white border border-[#e2e9f2] rounded-[8px] font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#2a3449] outline-none focus:border-[#eb6b15] transition-colors text-left flex items-center justify-between"
                  >
                    <span>{formatDate(date)}</span>
                    <Calendar className="size-[18px] text-[#7c7a78]" />
                  </button>
                </div>

                {/* 商品リスト */}
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-[20px] relative"
                  >
                    {/* 削除ボタン（2つ目以降のみ） */}
                    {index > 0 && (
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="absolute -top-[10px] right-0 flex items-center justify-center size-[24px] rounded-full bg-[#f3f4f6] hover:bg-[#e2e9f2] transition-colors z-10"
                        aria-label="削除"
                      >
                        <X className="size-[14px] text-[#7C7A78]" />
                      </button>
                    )}

                    {/* 商品名 */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Noto_Sans_JP',sans-serif] font-bold text-[14px] text-[#2a3449]">
                        商品名
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(item.id, "name", e.target.value)
                        }
                        className="w-full px-[16px] py-[12px] bg-white border border-[#e2e9f2] rounded-[8px] font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#2a3449] outline-none focus:border-[#eb6b15] transition-colors"
                        placeholder=""
                      />
                    </div>

                    {/* 金額 */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Noto_Sans_JP',sans-serif] font-bold text-[14px] text-[#2a3449]">
                        金額
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) =>
                            handleItemChange(item.id, "amount", e.target.value)
                          }
                          className="w-full px-[16px] py-[12px] pr-[40px] bg-white border border-[#e2e9f2] rounded-[8px] font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#2a3449] outline-none focus:border-[#eb6b15] transition-colors"
                          placeholder=""
                        />
                        <span className="absolute right-[16px] top-1/2 -translate-y-1/2 font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#7c7a78]">
                          円
                        </span>
                      </div>
                    </div>

                    {/* カテゴリー */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Noto_Sans_JP',sans-serif] font-bold text-[14px] text-[#2a3449]">
                        カテゴリー
                      </label>
                      <div className="relative">
                        <div
                          className="absolute left-[16px] top-1/2 -translate-y-1/2 size-[8px] rounded-full pointer-events-none z-10"
                          style={{
                            backgroundColor: getCategoryColor(item.category),
                          }}
                        />
                        <select
                          value={item.category}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "category",
                              e.target.value
                            )
                          }
                          className="w-full pl-[32px] pr-[40px] py-[12px] bg-white border border-[#e2e9f2] rounded-[8px] font-['Noto_Sans_JP',sans-serif] text-[14px] text-[#2a3449] outline-none focus:border-[#eb6b15] transition-colors appearance-none cursor-pointer"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat.name} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[20px] text-[#9ca3af] pointer-events-none" />
                      </div>
                    </div>

                    {/* セパレーター（最後以外） */}
                    {index < items.length - 1 && (
                      <div className="h-[1px] bg-[#e2e9f2] -mx-[16px]" />
                    )}
                  </div>
                ))}

                {/* 商品を追加するボタン */}
                <button
                  onClick={handleAddItem}
                  className="flex items-center justify-center gap-[8px] py-[12px] font-['Noto_Sans_JP',sans-serif] font-bold text-[14px] text-[#eb6b15] hover:bg-[#fff8f3] rounded-[8px] transition-colors"
                >
                  <Plus className="size-[16px]" />
                  商品を追加する
                </button>
              </div>
            </div>

            {/* 保存するボタン */}
            <div className="px-[16px] py-[16px] border-t border-[#e2e9f2] shrink-0">
              <button
                onClick={handleSave}
                className="w-full bg-[#eb6b15] text-white font-['Noto_Sans_JP',sans-serif] font-bold text-[16px] py-[14px] rounded-[8px] hover:bg-[#d15a0a] transition-colors"
              >
                保存する
              </button>
            </div>
          </motion.div>

          {/* Date Picker Modal */}
          <DateCalendarPicker
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            initialDate={date}
            onConfirm={handleDateConfirm}
          />
        </div>
      )}
    </AnimatePresence>
  );
}