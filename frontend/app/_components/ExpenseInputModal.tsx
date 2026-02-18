'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronDown } from "lucide-react";
import { createExpense } from '@/lib/api/expenses';
import { Snackbar } from './Snackbar';
import { DateCalendarPicker } from '../../components/DateCalendarPicker';

const CATEGORY_MAP = [
  { id: 1, name: "未分類", color: "#db3ea4" },
  { id: 2, name: "食費", color: "#fa4848" },
  { id: 3, name: "日用品", color: "#fab948" },
  { id: 4, name: "趣味・娯楽", color: "#48db3e" },
  { id: 5, name: "交通費", color: "#3ec3db" },
  { id: 6, name: "水道・光熱費", color: "#483edb" },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function ExpenseInputModal({ open, onClose, onSuccess }: Props) {
  // 日付の状態を Date オブジェクトで管理
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);

  // 表示用の日付フォーマット (Figma再現)
  const formatDateForDisplay = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekDay = weekDays[d.getDay()];
    return `${year}年${month}月${day}日 (${weekDay})`;
  };

  useEffect(() => {
    if (open) {
      setDate(new Date());
      setItem('');
      setPrice('');
      setCategoryId(1);
      setSaving(false);
      setSnack(null);
    }
  }, [open]);

  const handleSave = async () => {
    if (!item || !price) {
      setSnack({ kind: 'error', message: '項目と金額を入力してください' });
      return;
    }

    setSaving(true);
    try {
      // API送信時は YYYY-MM-DD 形式に変換
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');

      await createExpense({
        item,
        price: Number(price),
        expense_date: `${y}-${m}-${d}`,
        category_id: categoryId,
      });
      setSnack({ kind: 'success', message: '登録完了' });
      onSuccess?.();
      setTimeout(onClose, 1500);
    } catch (e) {
      setSnack({ kind: 'error', message: '保存に失敗しました' });
    } finally {
      setSaving(false);
    }
  };

  const currentCategoryColor = CATEGORY_MAP.find(c => c.id === categoryId)?.color;

  return (
    <AnimatePresence>
      {open && (
        <div key="expense-modal-root" className="fixed inset-0 z-[70] flex items-end justify-center">
          <motion.div 
            key="modal-overlay"
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div 
            key="modal-content"
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden flex flex-col h-[calc(100vh-44px)]"
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* ヘッダー (Figma仕様) */}
            <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2] shrink-0">
              <div className="w-[40px]" /> {/* バランス調整用 */}
              <h2 className="font-bold text-[#2a3449] text-[20px]">入力</h2>
              <button onClick={onClose} className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-100 transition-colors">
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* フォーム内容 */}
            <div className="flex-1 overflow-y-auto px-[16px] py-[24px] space-y-6">
              {/* 日付選択ボタン */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-bold text-[16px] text-[#2a3449]">日付</label>
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="w-full px-[16px] py-[12px] bg-white border border-[#e2e9f2] rounded-[8px] text-[16px] text-[#2a3449] flex items-center justify-between text-left"
                >
                  <span>{formatDateForDisplay(date)}</span>
                  <Calendar className="size-[18px] text-[#7c7a78]" />
                </button>
              </div>

              {/* 商品名 */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-bold text-[16px] text-[#2a3449]">商品名</label>
                <input 
                  name="purchase_item"
                  value={item} 
                  onChange={e => setItem(e.target.value)}
                  className="w-full px-[16px] py-[12px] border border-[#e2e9f2] rounded-[8px] text-[16px] outline-none focus:border-[#eb6b15]" 
                  placeholder="例）コーヒー"
                />
              </div>

              {/* 金額 */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-bold text-[16px] text-[#2a3449]">金額</label>
                <div className="relative">
                  <input 
                    name="price"
                    type="text"
                    inputMode = "numeric" 
                    pattern="[0-9]*"
                    autoComplete="off"
                    autoCorrect="off"
                    value={
                      price
                      ? Number(String(price).replace(/,/g, "")).toLocaleString("ja-JP")
                      : ""
                    }
                    onChange={(e) => {
                      const numeric = e.target.value.replace(/[^\d]/g, "");
                      setPrice(numeric)
                    }}
                    className="w-full px-[16px] py-[12px] pr-[40px] border border-[#e2e9f2] rounded-[8px] text-[16px] outline-none focus:border-[#eb6b15]" 
                  />
                  <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[16px] text-[#7c7a78]">円</span>
                </div>
              </div>

              {/* カテゴリー */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-bold text-[16px] text-[#2a3449]">カテゴリー</label>
                <div className="relative">
                  <div className="absolute left-[16px] top-1/2 -translate-y-1/2 size-[8px] rounded-full" style={{ backgroundColor: currentCategoryColor }} />
                  <select 
                    value={categoryId} 
                    onChange={e => setCategoryId(Number(e.target.value))}
                    className="w-full pl-[32px] pr-[40px] py-[12px] bg-white border border-[#e2e9f2] rounded-[8px] text-[16px] appearance-none outline-none focus:border-[#eb6b15]"
                  >
                    {CATEGORY_MAP.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[20px] text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="px-[16px] py-[16px] border-t border-[#e2e9f2] shrink-0">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="w-full bg-[#eb6b15] text-white font-bold py-[16px] rounded-[8px] hover:bg-[#d15a0a] disabled:opacity-50 transition-colors text-[16px]"
              >
                {saving ? '保存中...' : '保存する'}
              </button>
            </div>
          </motion.div>

          {/* カレンダー本体の呼び出し */}
          <DateCalendarPicker
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            initialDate={date}
            onConfirm={(newDate) => setDate(newDate)}
          />
        </div>
      )}

      <Snackbar 
        key="modal-snack"
        message={snack?.message ?? null} 
        kind={snack?.kind ?? 'success'} 
        onClose={() => setSnack(null)} 
      />
    </AnimatePresence>
  );
}