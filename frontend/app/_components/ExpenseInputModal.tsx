'use client';

import { useEffect, useMemo, useState } from 'react';
import { createExpense } from '@/lib/api/expenses';
import { Snackbar } from './Snackbar';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ExpenseInputModal({ open, onClose }: Props) {
  const today = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}/${m}/${day}`;
  }, []);

  const [date, setDate] = useState(today);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const [snack, setSnack] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // ★重要：openのたびに初期化（残り続ける問題を根絶）
  useEffect(() => {
    if (open) {
      setDate(today);
      setItem('');
      setPrice('');
      setSnack(null);
      setSaving(false);
    }
  }, [open, today]);

  if (!open) return null;

  const validate = (): string | null => {
    if (!date.trim()) return '日付を入力してください';
    if (!item.trim()) return '項目を入力してください';
    if (!price.trim()) return '金額を入力してください';

    const n = Number(price);
    if (Number.isNaN(n)) return '金額は数字で入力してください';
    if (n <= 0) return '金額は1以上で入力してください';

    // dateは本当はYYYY-MM-DDが理想だが、今はUI優先で通す（変換だけする）
    return null;
  };

  const toISODate = (d: string) => {
    // "YYYY/MM/DD" or "YYYY-MM-DD" を "YYYY-MM-DD" に寄せる
    const s = d.trim().replaceAll('/', '-');
    return s;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) {
      setSnack({ kind: 'error', message: err });
      return;
    }

    if (saving) return;
    setSaving(true);

    try {
      await createExpense({
        item,
        price: Number(price),
        expense_date: toISODate(date),
        category_id: null,
      });

      setSnack({ kind: 'success', message: '登録完了' });

      // Snackbar見せてから閉じる
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSnack({ kind: 'error', message: `保存に失敗しました：${msg}` });
      setSaving(false);
    }
  };

  return (
    <>
      {/* 背景 */}
      <div className="fixed inset-0 z-50 bg-white">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <button type="button" onClick={onClose} aria-label="閉じる" className="text-xl">
            ×
          </button>
          <h2 className="font-semibold">入力</h2>
          <div className="w-6" />
        </div>

        {/* フォーム */}
        <div className="space-y-4 px-4 py-4">
          <label className="block">
            <div className="mb-1 text-xs text-gray-500">日付</div>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="2026/02/12"
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-gray-500">項目</div>
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              placeholder="例）コーヒー"
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-gray-500">金額</div>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="numeric"
              className="w-full rounded-md border px-3 py-2"
              placeholder="例）500"
            />
          </label>
        </div>

        {/* フッター */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-md bg-orange-500 py-3 font-semibold text-white disabled:opacity-60"
          >
            {saving ? '保存中…' : '保存'}
          </button>
        </div>
      </div>

      <Snackbar
        message={snack?.message ?? null}
        kind={snack?.kind ?? 'success'}
        onClose={() => setSnack(null)}
      />
    </>
  );
}
