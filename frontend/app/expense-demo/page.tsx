'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { ExpenseInputModal } from '../_components/ExpenseInputModal';

export default function ExpenseDemoPage() {
  if (process.env.NODE_ENV !== 'development') notFound();

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)] px-4 pt-12">
      <h1 className="text-xl font-bold text-[#423f3e]">支出入力（開発デモ）</h1>
      <p className="mt-2 text-sm text-[#5a6b8b]">
        ※ログインが不安定でも #21 を進めるための確認ページ（本番では404になります）
      </p>

      <button
        type="button"
        aria-label="支出を入力"
        className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white text-3xl shadow-lg"
        onClick={() => setOpen(true)}
      >
        +
      </button>

      {/* ★重要：openのときだけ描画→閉じたらアンマウント→状態が必ずリセット */}
      {open && <ExpenseInputModal open={true} onClose={() => setOpen(false)} />}
    </div>
  );
}
