'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import BottomNav from '@/lib/components/BottomNav';

/** モーダルの種類 */
type ModalType = 'nickname' | 'email' | 'report' | 'coach' | 'logout' | null;

export default function SettingsPage() {
  const { user, isLoading, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // 各編集フォームの状態
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [reportEnabled, setReportEnabled] = useState(true);
  const [coachMode, setCoachMode] = useState<'devil' | 'angel'>('angel');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 未認証ならログインへ
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  // モーダルを開くときに現在の値をセット
  const openModal = (type: ModalType) => {
    setError('');
    setIsSubmitting(false);
    if (type === 'nickname') setNickname(user?.nickname ?? '');
    if (type === 'email') setEmail(user?.username ?? '');
    if (type === 'report') setReportEnabled(user?.report_enabled ?? true);
    if (type === 'coach') setCoachMode((user?.coach_mode as 'devil' | 'angel') ?? 'angel');
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setError('');
  };

  // ニックネーム保存
  const handleSaveNickname = async (e: FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('ニックネームを入力してください');
      return;
    }
    setIsSubmitting(true);
    try {
      await updateProfile({ nickname: nickname.trim() });
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // メールアドレス保存
  const handleSaveEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('メールアドレスを入力してください');
      return;
    }
    setIsSubmitting(true);
    try {
      await updateProfile({ username: email.trim() });
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // レポート設定保存
  const handleSaveReport = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile({ report_enabled: reportEnabled });
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 分析設定保存
  const handleSaveCoach = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile({ coach_mode: coachMode });
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
        <p className="text-[#6a7282]">読み込み中...</p>
      </div>
    );
  }

  if (!user) return null;

  const coachLabel = user.coach_mode === 'devil' ? '鬼コーチモード' : '天使コーチモード';
  const reportLabel = user.report_enabled ? '有効' : '無効';

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,rgb(255,253,242)_0%,rgb(255,252,239)_45%,rgb(255,242,234)_100%)]">
      {/* ヘッダー */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-[#423f3e]">設定</h1>
      </div>

      {/* 設定リスト */}
      <div className="flex-1 px-4">
        <div className="overflow-hidden rounded-2xl bg-white/80 shadow-sm">
          {/* ニックネーム */}
          <button
            onClick={() => openModal('nickname')}
            className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <p className="text-sm font-medium text-[#2a3449]">ニックネーム</p>
              <p className="mt-0.5 text-xs text-[#5a6b8b]">{user.nickname ?? '未設定'}</p>
            </div>
            <ChevronRight />
          </button>

          {/* メールアドレス */}
          <button
            onClick={() => openModal('email')}
            className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <p className="text-sm font-medium text-[#2a3449]">メールアドレス</p>
              <p className="mt-0.5 text-xs text-[#5a6b8b]">{user.username}</p>
            </div>
            <ChevronRight />
          </button>

          {/* レポート設定 */}
          <button
            onClick={() => openModal('report')}
            className="flex w-full items-center justify-between border-b border-gray-100 px-5 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <p className="text-sm font-medium text-[#2a3449]">レポート設定</p>
              <p className="mt-0.5 text-xs text-[#5a6b8b]">{reportLabel}</p>
            </div>
            <ChevronRight />
          </button>

          {/* 分析設定 */}
          <button
            onClick={() => openModal('coach')}
            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <p className="text-sm font-medium text-[#2a3449]">分析設定</p>
              <p className="mt-0.5 text-xs text-[#5a6b8b]">{coachLabel}</p>
            </div>
            <ChevronRight />
          </button>
        </div>

        {/* ログアウトボタン */}
        <div className="mt-6">
          <button
            onClick={() => openModal('logout')}
            className="w-full rounded-2xl border border-[#f35555] bg-white py-4 text-sm font-medium text-[#f35555] shadow-sm transition-colors hover:bg-red-50"
          >
            ログアウト
          </button>
        </div>
      </div>

      {/* ===== モーダル群 ===== */}

      {/* ニックネーム編集 */}
      {activeModal === 'nickname' && (
        <Modal title="ニックネーム編集" onClose={closeModal}>
          <form onSubmit={handleSaveNickname} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2a3449]">
                ニックネーム
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full rounded-lg border border-[#e5e7eb] bg-[#f3f3f5] px-4 py-3 text-sm text-gray-900 placeholder-[#717182] outline-none transition-colors focus:border-[#eb6b15] focus:bg-white focus:ring-1 focus:ring-[#eb6b15]"
              />
            </div>
            {error && <ErrorMessage message={error} />}
            <GradientButton disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存する'}
            </GradientButton>
          </form>
        </Modal>
      )}

      {/* メールアドレス編集 */}
      {activeModal === 'email' && (
        <Modal title="メールアドレス編集" onClose={closeModal}>
          <form onSubmit={handleSaveEmail} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2a3449]">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#e5e7eb] bg-[#f3f3f5] px-4 py-3 text-sm text-gray-900 placeholder-[#717182] outline-none transition-colors focus:border-[#eb6b15] focus:bg-white focus:ring-1 focus:ring-[#eb6b15]"
              />
            </div>
            {error && <ErrorMessage message={error} />}
            <GradientButton disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存する'}
            </GradientButton>
          </form>
        </Modal>
      )}

      {/* レポート設定 */}
      {activeModal === 'report' && (
        <Modal title="レポート設定" onClose={closeModal}>
          <div className="space-y-5">
            <div className="space-y-3">
              <SelectionCard
                selected={reportEnabled}
                onClick={() => setReportEnabled(true)}
                title="送信する"
                description="1週間単位でレポートを送信します"
              />
              <SelectionCard
                selected={!reportEnabled}
                onClick={() => setReportEnabled(false)}
                title="送信しない"
                description="レポートを送信しません"
              />
            </div>
            {error && <ErrorMessage message={error} />}
            <GradientButton disabled={isSubmitting} onClick={handleSaveReport}>
              {isSubmitting ? '保存中...' : '保存する'}
            </GradientButton>
          </div>
        </Modal>
      )}

      {/* 分析設定 */}
      {activeModal === 'coach' && (
        <Modal title="分析設定" onClose={closeModal}>
          <div className="space-y-5">
            <div className="space-y-3">
              <SelectionCard
                selected={coachMode === 'devil'}
                onClick={() => setCoachMode('devil')}
                title="鬼コーチモード"
                description="厳しめのアドバイスを提供します"
              />
              <SelectionCard
                selected={coachMode === 'angel'}
                onClick={() => setCoachMode('angel')}
                title="天使コーチモード"
                description="優しくサポートします"
              />
            </div>
            {error && <ErrorMessage message={error} />}
            <GradientButton disabled={isSubmitting} onClick={handleSaveCoach}>
              {isSubmitting ? '保存中...' : '保存する'}
            </GradientButton>
          </div>
        </Modal>
      )}

      {/* ログアウト確認 */}
      {activeModal === 'logout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
          <div className="mx-4 w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-center text-base font-bold text-[#2a3449]">ログアウト確認</h3>
            <p className="mt-2 text-center text-sm text-[#5a6b8b]">本当にログアウトしますか？</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg bg-[#e2e9f2] border border-[#e2e9f2] py-2.5 text-sm font-medium text-[#2a3449] transition-colors hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-[#f35555] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e04444]"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

/* ===== 共通コンポーネント ===== */

/** シェブロンアイコン */
function ChevronRight() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#6f6d6c]">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

/** モーダル（スマホ: フルスクリーン / PC: センター表示） */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 sm:items-center sm:justify-center" onClick={onClose}>
      <div
        className="h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white px-6 pb-8 pt-5 sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="mb-6 flex items-center justify-between">
          <div className="w-8" />
          <h2 className="text-base font-bold text-[#2a3449]">{title}</h2>
          <button onClick={onClose} className="text-[#6f6d6c] hover:text-[#423f3e] transition-colors">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** グラデーションボタン */
function GradientButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={onClick ? 'button' : 'submit'}
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-lg bg-[linear-gradient(90deg,#FFA04C_2%,#FBB441_35%,#F06E23_100%)] py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

/** 選択カード（レポート設定・分析設定用） */
function SelectionCard({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
        selected
          ? 'border-[#eb6b15] bg-[#fff8f3]'
          : 'border-[#e2e9f2] bg-white hover:border-gray-300'
      }`}
    >
      <div>
        <p className={`text-sm font-bold ${selected ? 'text-[#2a3449]' : 'text-[#5a6b8b]'}`}>{title}</p>
        <p className="mt-0.5 text-xs text-[#5a6b8b]">{description}</p>
      </div>
      {selected && (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-[#eb6b15]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      )}
    </button>
  );
}

/** エラーメッセージ */
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
      {message}
    </div>
  );
}
