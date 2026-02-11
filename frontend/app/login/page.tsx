'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleLogin, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('');
      setIsSubmitting(true);
      try {
        await googleLogin(tokenResponse.access_token);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Googleログインに失敗しました');
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: () => {
      setError('Googleログインに失敗しました');
    },
  });

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)] px-4">
      {/* タイトル */}
      <h1 className="mb-8 text-2xl font-bold text-[#0a0a0a]">4C Wallet</h1>

      {/* カード */}
      <div className="w-full max-w-sm rounded-2xl bg-white/70 p-6 shadow-lg">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Googleでログインボタン */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(90deg,#FFA04C_2%,#FBB441_35%,#F06E23_100%)] py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" fillOpacity=".8" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity=".8" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" fillOpacity=".8" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity=".8" />
          </svg>
          {isSubmitting ? 'ログイン中...' : 'Googleでログイン'}
        </button>

        {/* 区切り */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e5e7eb]" />
          <span className="text-xs text-[#6a7282]">または</span>
          <div className="h-px flex-1 bg-[#e5e7eb]" />
        </div>

        {/* Googleで新規登録ボタン */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {isSubmitting ? '登録中...' : 'Googleで新規登録'}
        </button>
      </div>

      {/* フッター */}
      <p className="mt-6 text-xs text-[#6a7282]">
        すべての情報は暗号化されて安全に保管されます
      </p>
    </div>
  );
}
