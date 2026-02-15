'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { setBudget } from '@/lib/api/budget';
import { Snackbar } from './Snackbar';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  currentBudget?: number | null;
  defaultYear?: number;
  defaultMonth?: number;
};

/* ------------------------------------------------------------------ */
/*  WheelColumn – ドラムロール1列分                                     */
/* ------------------------------------------------------------------ */

const ITEM_H = 44;
const VISIBLE = 5;

function WheelColumn({
  items,
  value,
  onChange,
}: {
  items: { label: string; value: number }[];
  value: number;
  onChange: (v: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isUserScroll = useRef(true);

  const idx = items.findIndex((i) => i.value === value);

  /* 初期位置 & value 変化時にスクロール */
  useEffect(() => {
    if (ref.current && idx >= 0) {
      isUserScroll.current = false;
      ref.current.scrollTo({ top: idx * ITEM_H, behavior: 'auto' });
      /* フラグを戻す */
      setTimeout(() => { isUserScroll.current = true; }, 50);
    }
  }, [idx]);

  const handleScroll = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!ref.current || !isUserScroll.current) return;
      const i = Math.round(ref.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      onChange(items[clamped].value);
      ref.current.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' });
    }, 80);
  }, [items, onChange]);

  const pad = ((VISIBLE - 1) / 2) * ITEM_H;

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: ITEM_H * VISIBLE }}>
      {/* 上下フェード */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[88px] bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[88px] bg-gradient-to-t from-white to-transparent" />
      {/* 中央ハイライト */}
      <div
        className="pointer-events-none absolute inset-x-0 z-10 border-t border-b border-[#d1d5db]"
        style={{ top: pad, height: ITEM_H }}
      />

      <div
        ref={ref}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
        onScroll={handleScroll}
      >
        <div style={{ height: pad }} />
        {items.map((item) => (
          <div
            key={item.value}
            className="flex items-center justify-center text-[18px] text-[#2a3449]"
            style={{ height: ITEM_H, scrollSnapAlign: 'center' }}
          >
            {item.label}
          </div>
        ))}
        <div style={{ height: pad }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  年・月の選択肢                                                      */
/* ------------------------------------------------------------------ */

const YEARS = Array.from({ length: 7 }, (_, i) => {
  const y = new Date().getFullYear() - 2 + i;
  return { label: `${y}年`, value: y };
});

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}月`,
  value: i + 1,
}));

/* ------------------------------------------------------------------ */
/*  BudgetSettingModal                                                 */
/* ------------------------------------------------------------------ */

export function BudgetSettingModal({
  open,
  onClose,
  onSuccess,
  currentBudget,
  defaultYear,
  defaultMonth,
}: Props) {
  const now = new Date();
  const [year, setYear] = useState(defaultYear ?? now.getFullYear());
  const [month, setMonth] = useState(defaultMonth ?? now.getMonth() + 1);
  const [budgetValue, setBudgetValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [snack, setSnack] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);

  /* ピッカー用の仮値（完了を押すまで確定しない） */
  const [tmpYear, setTmpYear] = useState(year);
  const [tmpMonth, setTmpMonth] = useState(month);

  useEffect(() => {
    if (open) {
      const y = defaultYear ?? now.getFullYear();
      const m = defaultMonth ?? now.getMonth() + 1;
      setYear(y);
      setMonth(m);
      setTmpYear(y);
      setTmpMonth(m);
      setBudgetValue(currentBudget ? String(currentBudget) : '');
      setSaving(false);
      setSnack(null);
      setPickerOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentBudget, defaultYear, defaultMonth]);

  const handleSave = async () => {
    const amount = Number(budgetValue);
    if (!budgetValue || isNaN(amount) || amount <= 0) {
      setSnack({ kind: 'error', message: '有効な金額を入力してください' });
      return;
    }

    setSaving(true);
    try {
      await setBudget({ budget_year: year, budget_month: month, monthly_budget: amount });
      setSnack({ kind: 'success', message: '予算を設定しました' });
      onSuccess?.();
      setTimeout(onClose, 1200);
    } catch {
      setSnack({ kind: 'error', message: '予算の設定に失敗しました' });
    } finally {
      setSaving(false);
    }
  };

  const openPicker = () => {
    setTmpYear(year);
    setTmpMonth(month);
    setPickerOpen(true);
  };

  const confirmPicker = () => {
    setYear(tmpYear);
    setMonth(tmpMonth);
    setPickerOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div key="budget-modal-root" className="fixed inset-0 z-[70] flex items-end justify-center">
          <motion.div
            key="budget-overlay"
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            key="budget-content"
            className="relative bg-[#fffdf2] rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden flex flex-col h-[calc(100vh-44px)]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2] bg-white shrink-0">
              <div className="w-[40px]" />
              <h2 className="font-bold text-[#2a3449] text-[20px]">予算設定</h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[40px] rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="size-[24px] text-[#7C7A78]" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-[16px] py-[24px] space-y-5">
              {/* 年月 */}
              <div className="flex flex-col gap-[6px]">
                <label className="font-bold text-[14px] text-[#2a3449]">年月</label>
                <button
                  onClick={openPicker}
                  className="w-full text-left px-[16px] py-[12px] border border-[#e2e9f2] rounded-[8px] bg-white text-[14px] text-[#2a3449]"
                >
                  {year}年{month}月
                </button>
              </div>

              {/* 予算額 */}
              <div className="flex flex-col gap-[6px]">
                <label className="font-bold text-[14px] text-[#2a3449]">予算額</label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                    placeholder="10,000"
                    className="no-spinner w-full px-[16px] py-[12px] pr-[40px] border border-[#e2e9f2] rounded-[8px] bg-white text-[14px] outline-none focus:border-[#eb6b15]"
                  />
                  <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[14px] text-[#7c7a78]">
                    円
                  </span>
                </div>
              </div>

              {/* 保存ボタン */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#f5a047] to-[#f7b563] text-white font-bold py-[14px] rounded-[8px] hover:from-[#e08f36] hover:to-[#e6a552] disabled:opacity-50 transition-colors text-[16px]"
              >
                {saving ? '保存中...' : '保存する'}
              </button>
            </div>

            {/* ── 年月ピッカー（ドラムロール） ── */}
            <AnimatePresence>
              {pickerOpen && (
                <motion.div
                  key="picker"
                  className="absolute inset-x-0 bottom-0 bg-white rounded-t-[16px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                >
                  {/* ピッカーヘッダー */}
                  <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#e2e9f2]">
                    <button
                      onClick={() => setPickerOpen(false)}
                      className="text-[15px] text-[#6a7282]"
                    >
                      キャンセル
                    </button>
                    <span className="font-bold text-[15px] text-[#2a3449]">年月選択</span>
                    <button
                      onClick={confirmPicker}
                      className="text-[15px] font-bold text-[#eb6b15]"
                    >
                      完了
                    </button>
                  </div>

                  {/* ドラムロール */}
                  <div className="flex px-[24px] py-[8px]">
                    <WheelColumn items={YEARS} value={tmpYear} onChange={setTmpYear} />
                    <WheelColumn items={MONTHS} value={tmpMonth} onChange={setTmpMonth} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      <Snackbar
        key="budget-snack"
        message={snack?.message ?? null}
        kind={snack?.kind ?? 'success'}
        onClose={() => setSnack(null)}
      />
    </AnimatePresence>
  );
}
