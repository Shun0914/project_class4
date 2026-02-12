'use client';

import { useEffect, useState  } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';
import { ExpenseInputModal } from "./_components/ExpenseInputModal";


export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isInputOpen, setIsInputOpen] = useState(false);


  // 未認証ならログインページへ、初期設定未完了なら設定ページへリダイレクト
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && !user.nickname) {
      router.push('/setup');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
      <div className="flex-1 px-4 pt-12">
        <h1 className="text-xl font-bold text-[#423f3e]">ホーム</h1>
        <p className="mt-4 text-sm text-[#5a6b8b]">
          ようこそ、{user.nickname ?? user.username} さん
        </p>
      </div>
            <button
        type="button"
        aria-label="支出を入力"
        className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white text-3xl shadow-lg"
        onClick={() => setIsInputOpen(true)}
      >
        +
      </button>

      <BottomNav />
    </div>
  );
}
