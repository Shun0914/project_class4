import { useState } from "react";
import { BottomNavigation } from "@/app/components/BottomNavigation";
import { Home } from "@/app/pages/Home";
import { Dashboard } from "@/app/pages/Dashboard";
import { Settings } from "@/app/pages/Settings";
import { Login } from "@/app/pages/Login";
import { Signup } from "@/app/pages/Signup";
import { Onboarding } from "@/app/pages/Onboarding";
import { ManualEntryModal } from "@/app/components/ManualEntryModal";
import { ReceiptMethodModal } from "@/app/components/ReceiptMethodModal";
import { ReceiptLoadingModal } from "@/app/components/ReceiptLoadingModal";
import { ReceiptResultModal } from "@/app/components/ReceiptResultModal";
import { AICoachModal } from "@/app/components/AICoachModal";
import { ExpenseBreakdownModal } from "@/app/components/ExpenseBreakdownModal";
import { Toaster } from "sonner";
import { showSuccessToast } from "@/app/utils/toast";

type AuthScreen = "login" | "signup" | "onboarding";

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'settings'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showReceiptMethod, setShowReceiptMethod] = useState(false);
  const [showReceiptLoading, setShowReceiptLoading] = useState(false);
  const [showReceiptResult, setShowReceiptResult] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [showExpenseBreakdown, setShowExpenseBreakdown] = useState(false);

  const handleLogin = () => {
    // ログイン処理（実際にはAPIコールなど）
    // ログインの場合は直接ホーム画面へ
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    // 新規登録処理（実際にはAPIコールなど）
    // 新規登録の場合は直接ホーム画面へ
    setIsAuthenticated(true);
    // 少し遅れてトーストを表示
    setTimeout(() => {
      showSuccessToast("登録が完了しました！");
    }, 500);
  };

  const handleGoogleAuth = () => {
    // Google認証処理
    // Googleログインの場合は直接ホーム画面へ
    setIsAuthenticated(true);
  };

  const handleGoogleSignup = () => {
    // Google新規登録処理
    // Google新規登録の場合はオンボーディングへ
    setAuthScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    // オンボーディング完了
    setIsAuthenticated(true);
    // 少し遅れてトーストを表示
    setTimeout(() => {
      showSuccessToast("登録が完了しました！");
    }, 500);
  };

  const handleOnboardingBack = () => {
    setAuthScreen("signup");
  };

  const handleLogout = () => {
    // ログアウト処理
    setIsAuthenticated(false);
    setAuthScreen("login");
  };

  const handleReceiptMethodSelect = (method: 'camera' | 'upload' | 'file') => {
    // レシート読込方法が選択されたらローディングを開始
    setShowReceiptMethod(false);
    setShowManualEntry(false); // 手入力モーダルも閉じる
    setShowReceiptLoading(true);

    // 模擬的に2秒後に結果画面を表示
    setTimeout(() => {
      setShowReceiptLoading(false);
      setShowReceiptResult(true);
    }, 2000);
  };

  const handleSaveExpense = () => {
    // 保存後、内訳モーダルを開く
    setShowExpenseBreakdown(true);
    // トーストを表示
    showSuccessToast("登録が完了しました！");
  };

  // 未ログインの場合は認証画面を表示
  if (!isAuthenticated) {
    if (authScreen === "login") {
      return (
        <Login
          onSwitchToSignup={() => setAuthScreen("signup")}
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleAuth}
        />
      );
    }
    
    if (authScreen === "signup") {
      return (
        <Signup
          onSwitchToLogin={() => setAuthScreen("login")}
          onSignup={handleSignup}
          onGoogleSignup={handleGoogleSignup}
        />
      );
    }
    
    if (authScreen === "onboarding") {
      return (
        <Onboarding
          onComplete={handleOnboardingComplete}
          onBack={handleOnboardingBack}
        />
      );
    }
  }

  return (
    <div
      className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(154.633deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)",
      }}
    >
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && (
          <Home 
            onManualEntryClick={() => setShowManualEntry(true)}
            onReceiptScanClick={() => setShowReceiptMethod(true)}
            onAICoachClick={() => setShowAICoach(true)}
          />
        )}
        {activeTab === 'dashboard' && <Dashboard onManualEntryClick={() => setShowManualEntry(true)} />}
        {activeTab === 'settings' && <Settings onLogout={handleLogout} />}
      </div>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 w-[calc(100%-26px)] max-w-[364px]">
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      </div>

      {/* Manual Entry Modal */}
      <ManualEntryModal
        isOpen={showManualEntry}
        onClose={() => setShowManualEntry(false)}
        onReceiptScanClick={() => setShowReceiptMethod(true)}
        onSave={handleSaveExpense}
      />

      {/* Receipt Method Modal */}
      <ReceiptMethodModal
        isOpen={showReceiptMethod}
        onClose={() => setShowReceiptMethod(false)}
        onMethodSelect={handleReceiptMethodSelect}
      />

      {/* Receipt Loading Modal */}
      <ReceiptLoadingModal
        isOpen={showReceiptLoading}
      />

      {/* Receipt Result Modal */}
      <ReceiptResultModal
        isOpen={showReceiptResult}
        onClose={() => setShowReceiptResult(false)}
        initialData={{
          date: "2026年1月31日 (土)",
          items: [
            { id: "1", name: "メロンパン", amount: "100", category: "食費" },
          ],
        }}
        onSave={handleSaveExpense}
      />

      {/* AI Coach Modal */}
      <AICoachModal
        isOpen={showAICoach}
        onClose={() => setShowAICoach(false)}
      />

      {/* Expense Breakdown Modal */}
      <ExpenseBreakdownModal
        isOpen={showExpenseBreakdown}
        onClose={() => setShowExpenseBreakdown(false)}
        year={2026}
        month={1}
        onManualEntryClick={() => setShowManualEntry(true)}
      />

      {/* Toaster */}
      <Toaster position="bottom-center" />
    </div>
  );
}