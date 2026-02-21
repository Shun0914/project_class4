// frontend/app/_components/ExpenseInputModal.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronDown } from "lucide-react";
import { createExpense } from '@/lib/api/expenses';
import { Snackbar } from './Snackbar';
import { DateCalendarPicker } from '../../components/DateCalendarPicker';
import { CATEGORY_CONFIG, getCategoryById } from '@/lib/constants/categories';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type NearShop = {
  name?: string;
  // 他のフィールドが来てもOK（この画面では使わない）
};

export function ExpenseInputModal({ open, onClose, onSuccess }: Props) {
  // 日付の状態を Date オブジェクトで管理
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);//categoryId の初期値を 0 または空文字にする（未選択状態）
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [priceFocused, setPriceFocused] = useState(false);

  // 近くにある店舗名
  const [nearShopNames, setNearShopNames] = useState<string[]>([]);

  // 表示用の日付フォーマット (Figma再現)
  const formatDateForDisplay = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekDay = weekDays[d.getDay()];
    return `${year}年 ${month}月 ${day}日 (${weekDay})`;
  };

  // 位置情報 → /api/nearShops(POST) → name
  const fetchNearShops = async (isActive: () => boolean) => {
    try {
      // 位置情報（必須）
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) return reject(new Error('geolocation unavailable'));
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0,
        });
      });

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const token = localStorage.getItem('access_token');    // token（バックエンドで検証不要）

      // Next.js Route Handler に投げる（他のAPI呼び出し処理とセンス統一）
      const res = await fetch('/api/nearShops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ lat, lng }),
      });

      if (!res.ok) return;

      const data: NearShop[] = await res.json();

      const names = (Array.isArray(data) ? data : [])
        .map((x) => (x?.name ?? '').trim())
        .filter((name) => name.length > 0)
        .slice(0, 3);

      if (!isActive()) return; // モーダルが閉じた後の反映を防ぐ
      setNearShopNames(names);
    } catch {
      // 取得中/エラー時は「何も出さない」方針なので握りつぶす
      if (!isActive()) return;
      setNearShopNames([]);
    }
  };

  useEffect(() => {
    if (open) {
      setDate(new Date());
      setItem('');
      setPrice('');
      setCategoryId(0);//モーダルを開いた時に 0 (未選択) にリセット
      setSaving(false);
      setSnack(null);
      const active = { current: true };
      fetchNearShops(() => active.current);
      return () => {
        active.current = false;
      };
    } else {
      setNearShopNames([]);
    } 
  }, [open]);

  const handleSave = async () => {
    if (!item || !price) {
      setSnack({ kind: 'error', message: '項目と金額を入力してください' });
      return;
    }
    // カテゴリが未選択（0）の場合にバリデーションを追加
    if (!item || !price || categoryId === 0) {
      setSnack({ kind: 'error', message: 'カテゴリを選択してください' });
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

  //categoryId が 0 の時はグレーなどのデフォルト色を表示
  const currentCategoryColor = categoryId === 0 
    ? "#adb5bd" 
    : getCategoryById(categoryId).color;

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
            className="relative bg-[#fffdf2] rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden flex flex-col h-[calc(100vh-44px)]"
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* ヘッダー (Figma仕様) */}
            <div className="flex items-center justify-between px-[16px] py-[20px] w-full border-b border-[#e2e9f2] shrink-0 bg-white">
              <div className="w-[40px]" /> {/* バランス調整用 */}
              <h2 className="font-bold text-[#2a3449] text-[20px]">支出入力</h2>
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
                  className="w-full px-[16px] py-[10px] bg-white border border-[#e2e9f2] rounded-[8px] text-[16px] text-[#2a3449] flex items-center justify-between text-left"
                >
                  <span>{formatDateForDisplay(date)}</span>
                  <Calendar className="size-[18px] text-[#7c7a78]" />
                </button>
              </div>

              {/* アイテム名 */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-bold text-[16px] text-[#2a3449]">お店／商品名</label>

                <input
                  name="purchase_item"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full px-[16px] py-[10px] border border-[#e2e9f2] rounded-[8px] text-[16px] outline-none bg-white focus:border-[#eb6b15]"
                  placeholder = "例）スタバ"
                />

                {/* 上段：店舗選択ボタン（スーパー・コンビニ・カフェ） */}
                <div className="flex justify-end gap-[8px]">
                  {["スーパー", "コンビニ", "カフェ"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setItem(label)}
                      className="px-[8px] py-[6px] border-none rounded-[8px] text-[14px] text-[#606972] bg-[#fee] hover:bg-[#f8d8d3]"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* 下段：API取得ボタン（最大3・縦並び・右揃え・0件なら表示しない） */}
                {nearShopNames.length > 0 && (
                  <div className="flex flex-wrap justify-end gap-[8px]">
                    {nearShopNames.map((name) => {
                     // 表示用ラベル（5文字超なら省略）
                      const displayName = name.length > 6 ? name.slice(0, 5) + "…" : name;                    
                      return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setItem(name)}
                        className="w-auto max-w-full px-[8px] py-[6px] border-none rounded-[8px] text-[14px] text-[#606972] bg-[#fee] hover:bg-[#f8d8d3]"
                        title={name}
                      >
                        {displayName}
                      </button>
                      );
                    })}
                  </div>
                )}
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
                    className="w-full px-[16px] py-[9px] pr-[40px] border border-[#e2e9f2] rounded-[8px] text-[18px] text-[#2a3449] text-right outline-none bg-white focus:border-[#eb6b15]" 
                    placeholder="0"
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
                    className="w-full pl-[32px] pr-[40px] py-[10px] bg-white border border-[#e2e9f2] rounded-[8px] text-[16px] text-[#2a3449] appearance-none outline-none focus:border-[#eb6b15]"
                  >
                    {/* 初期表示用の未選択オプション */}
                    <option value={0} disabled className="text-gray-400">選択してください</option>
                    {/* ★修正: CATEGORY_CONFIG から動的に option を生成 */}
                    {Object.entries(CATEGORY_CONFIG).map(([name, config]) => (
                      <option key={config.id} value={config.id}>
                        {name}
                      </option>
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
