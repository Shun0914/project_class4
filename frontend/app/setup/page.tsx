'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function SetupPage() {
  const [nickname, setNickname] = useState('');
  const [reportEnabled, setReportEnabled] = useState(true);
  const [coachMode, setCoachMode] = useState<'angel' | 'devil'>('angel');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoading, setupProfile, logout } = useAuth();
  const router = useRouter();

  // 未認証ならログインへ
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nickname.trim()) {
      setError('ニックネームを入力してください');
      return;
    }

    setIsSubmitting(true);

    try {
      await setupProfile({
        nickname: nickname.trim(),
        report_enabled: reportEnabled,
        coach_mode: coachMode,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '設定の保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)] px-4">
      {/* タイトル */}
      <h1 className="mb-2 text-2xl font-bold text-[#0a0a0a]">おかねのコーチ</h1>
      <p className="mb-8 text-sm text-[#5a6b8b]">
        基本情報を入力して、アプリを始めましょう！
      </p>

      {/* カード */}
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ニックネーム */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2a3449]">
              ニックネーム
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="アプリ内で表示される名前"
                required
                className="w-full rounded-lg border border-[#a1b3cd] bg-[#f3f3f5] py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-[#a2a3a4] outline-none transition-colors focus:border-[#eb6b15] focus:bg-white focus:ring-1 focus:ring-[#eb6b15]"
              />
            </div>
          </div>

          {/* 1週間レポート */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#2a3449]">
              1週間レポート
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReportEnabled(true)}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                  reportEnabled
                    ? 'border-[#eb6b15] bg-[#fff8f3] text-[#2a3449]'
                    : 'border-[#e2e9f2] bg-white text-[#5a6b8b] hover:border-[#a1b3cd]'
                }`}
              >
                {reportEnabled && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-[#eb6b15]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
                送信する
              </button>
              <button
                type="button"
                onClick={() => setReportEnabled(false)}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                  !reportEnabled
                    ? 'border-[#eb6b15] bg-[#fff8f3] text-[#2a3449]'
                    : 'border-[#e2e9f2] bg-white text-[#5a6b8b] hover:border-[#a1b3cd]'
                }`}
              >
                {!reportEnabled && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-[#eb6b15]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
                送信しない
              </button>
            </div>
          </div>

          {/* 分析設定 */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#2a3449]">
              分析設定
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCoachMode('devil')}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${
                  coachMode === 'devil'
                    ? 'border-[#eb6b15] bg-[#fff8f3] text-[#2a3449]'
                    : 'border-[#e2e9f2] bg-white text-[#5a6b8b] hover:border-[#a1b3cd]'
                }`}
              >
                <span className="text-xl">👹</span>
                <span>鬼コーチモード</span>
                {coachMode === 'devil' && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-[#eb6b15]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={() => setCoachMode('angel')}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${
                  coachMode === 'angel'
                    ? 'border-[#eb6b15] bg-[#fff8f3] text-[#2a3449]'
                    : 'border-[#e2e9f2] bg-white text-[#5a6b8b] hover:border-[#a1b3cd]'
                }`}
              >
                <span className="text-xl">😇</span>
                <span>天使コーチモード</span>
                {coachMode === 'angel' && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-[#eb6b15]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 登録するボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[linear-gradient(90deg,#FFA04C_2%,#FBB441_35%,#F06E23_100%)] py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? '保存中...' : '登録する'}
          </button>
        </form>

        {/* ログアウトリンク */}
        <button
          type="button"
          onClick={logout}
          className="mt-4 w-full text-center text-xs text-[#6a7282] hover:text-[#2a3449] transition-colors"
        >
          別のアカウントでログイン
        </button>
      </div>
    </div>
  );
}
