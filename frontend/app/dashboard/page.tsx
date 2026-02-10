'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
      <div className="flex-1 px-4 pt-12">
        <h1 className="text-xl font-bold text-[#423f3e]">ダッシュボード</h1>
        <p className="mt-4 text-sm text-[#5a6b8b]">ダッシュボード画面は準備中です</p>
      </div>
      <BottomNav />
    </div>
  );
}
