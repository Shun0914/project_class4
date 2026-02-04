import { useState } from "react";
import { StatusBar } from "@/app/components/StatusBar";
import { ChevronRight } from "lucide-react";
import { NicknameModal } from "@/app/components/NicknameModal";
import { EmailModal } from "@/app/components/EmailModal";
import { PasswordModal } from "@/app/components/PasswordModal";
import { ReportSettingModal } from "@/app/components/ReportSettingModal";
import { CoachModeModal } from "@/app/components/CoachModeModal";
import { showSuccessToast } from "@/app/utils/toast";

type CoachMode = "demon" | "angel";

interface SettingsProps {
  onLogout: () => void;
}

export function Settings({ onLogout }: SettingsProps) {
  const [nickname, setNickname] = useState("タロウ");
  const [email, setEmail] = useState("example@email.com");
  const [reportEnabled, setReportEnabled] = useState<boolean>(true);
  const [coachMode, setCoachMode] = useState<CoachMode>("demon");
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCoachModal, setShowCoachModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = () => {
    // ログアウト処理
    console.log("ログアウトしました");
    setShowLogoutModal(false);
    onLogout();
  };

  const handleNicknameSave = (newNickname: string) => {
    setNickname(newNickname);
    showSuccessToast("ニックネームを更新しました");
  };

  const handleEmailSave = (newEmail: string) => {
    setEmail(newEmail);
    showSuccessToast("メールアドレスを更新しました");
  };

  const handlePasswordSave = (currentPassword: string, newPassword: string) => {
    // パスワード変更処理
    console.log("パスワードを変更しました");
    showSuccessToast("パスワードを更新しました");
  };

  const handleReportFrequencySave = (frequency: boolean) => {
    setReportEnabled(frequency);
    showSuccessToast("レポート設定を更新しました");
  };

  const handleCoachModeSave = (mode: CoachMode) => {
    setCoachMode(mode);
    showSuccessToast("分析設定を更新しました");
  };

  return (
    <div
      className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(155.199deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)",
      }}
    >
      {/* Header */}
      <div className="shrink-0 w-full">
        <StatusBar />
        <div className="flex items-center pb-[8px] pl-[20px] pr-[16px] pt-[7px]">
          <h1 className="font-['Noto_Sans',sans-serif] font-bold leading-[1.5] text-[#423f3e] text-[21px]">
            設定
          </h1>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-[16px] pt-[24px] pb-[120px]">
        <div className="flex flex-col gap-[16px] w-full">
          {/* Nickname Settings Card */}
          <div className="bg-[rgba(255,255,255,0.8)] rounded-[16px] w-full">
            <div className="flex flex-col p-[16px]">
              <button
                onClick={() => setShowNicknameModal(true)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[18px] leading-[1.5]">
                    ニックネーム
                  </h2>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                    {nickname}
                  </p>
                </div>
                <ChevronRight className="size-[24px] text-[#6f6d6c]" />
              </button>
            </div>
          </div>

          {/* Email Settings Card */}
          <div className="bg-[rgba(255,255,255,0.8)] rounded-[16px] w-full">
            <div className="flex flex-col p-[16px]">
              <button
                onClick={() => setShowEmailModal(true)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[18px] leading-[1.5]">
                    メールアドレス
                  </h2>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                    {email}
                  </p>
                </div>
                <ChevronRight className="size-[24px] text-[#6f6d6c]" />
              </button>
            </div>
          </div>

          {/* Password Settings Card */}
          <div className="bg-[rgba(255,255,255,0.8)] rounded-[16px] w-full">
            <div className="flex flex-col p-[16px]">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[18px] leading-[1.5]">
                    パスワード
                  </h2>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                    変更する
                  </p>
                </div>
                <ChevronRight className="size-[24px] text-[#6f6d6c]" />
              </button>
            </div>
          </div>

          {/* Report Settings Card */}
          <div className="bg-[rgba(255,255,255,0.8)] rounded-[16px] w-full">
            <div className="flex flex-col p-[16px]">
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[18px] leading-[1.5]">
                    レポート設定
                  </h2>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                    {reportEnabled ? "有効" : "無効"}
                  </p>
                </div>
                <ChevronRight className="size-[24px] text-[#6f6d6c]" />
              </button>
            </div>
          </div>

          {/* Coach Mode Settings Card */}
          <div className="bg-[rgba(255,255,255,0.8)] rounded-[16px] w-full">
            <div className="flex flex-col p-[16px]">
              <button
                onClick={() => setShowCoachModal(true)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <h2 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[18px] leading-[1.5]">
                    分析設定
                  </h2>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[1.5]">
                    {coachMode === "demon" ? "鬼コーチモード" : "天使コーチモード"}
                  </p>
                </div>
                <ChevronRight className="size-[24px] text-[#6f6d6c]" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-[24px]">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-white flex items-center justify-center w-full px-[24px] py-[16px] rounded-[16px] border border-[#f35555] border-solid shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
            >
              <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#f35555] text-[16px] leading-[1.5]">
                ログアウト
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Report Frequency Modal */}
      <ReportSettingModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        currentEnabled={reportEnabled}
        onSave={handleReportFrequencySave}
      />

      {/* Coach Mode Modal */}
      <CoachModeModal
        isOpen={showCoachModal}
        onClose={() => setShowCoachModal(false)}
        currentMode={coachMode}
        onSave={handleCoachModeSave}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 px-[16px]">
          <div className="bg-white rounded-[24px] w-full max-w-[358px] p-[24px]">
            <h3 className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[20px] text-center mb-[16px]">
              ログアウト確認
            </h3>
            
            <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[16px] text-center mb-[24px]">
              本当にログアウトしますか？
            </p>

            <div className="flex gap-[12px]">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-[#e2e9f2] rounded-[12px] py-[12px]"
              >
                <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px]">
                  キャンセル
                </p>
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 bg-[#f35555] rounded-[12px] py-[12px]"
              >
                <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-white text-[16px]">
                  ログアウト
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nickname Edit Modal */}
      <NicknameModal
        isOpen={showNicknameModal}
        onClose={() => setShowNicknameModal(false)}
        currentNickname={nickname}
        onSave={handleNicknameSave}
      />

      {/* Email Edit Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        currentEmail={email}
        onSave={handleEmailSave}
      />

      {/* Password Edit Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={handlePasswordSave}
      />
    </div>
  );
}