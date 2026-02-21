// frontend/app/_components/MonthSelector.tsx
import React from 'react';

/**
 * 年月を選択・表示するためのナビゲーションコンポーネント
 */
interface MonthSelectorProps {
  year: number;          // 表示中の年
  month: number;         // 表示中の月
  onPrevMonth: () => void; // 前の月へ移動するボタンのハンドラー
  onNextMonth: () => void; // 次の月へ移動するボタンのハンドラー
}

export function MonthSelector({ year, month, onPrevMonth, onNextMonth }: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-[16px]">
      {/* 前の月へ戻るボタン */}
      <button onClick={onPrevMonth} className="text-[#eb6b15] text-2xl font-bold">
        &lt;
      </button>

      {/* 現在の年月表示：月は常に2桁（01月など）で表示されるようパディング処理 */}
      <span className="text-[18px] font-bold text-[#423f3e]">
        {year}年{String(month).padStart(2, '0')}月
      </span>

      {/* 次の月へ進むボタン */}
      <button onClick={onNextMonth} className="text-[#eb6b15] text-2xl font-bold">
        &gt;
      </button>
    </div>
  );
}