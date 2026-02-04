import { useState } from "react";
import { StatusBar } from "@/app/components/StatusBar";
import { Check } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

type ReportSetting = "send" | "noSend";
type CoachMode = "demon" | "angel";

export function Onboarding({ onComplete, onBack }: OnboardingProps) {
  const [nickname, setNickname] = useState("");
  const [reportSetting, setReportSetting] = useState<ReportSetting>("send");
  const [coachMode, setCoachMode] = useState<CoachMode>("demon");

  const handleSubmit = () => {
    if (nickname) {
      // 設定を保存
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("reportSetting", reportSetting);
      localStorage.setItem("coachMode", coachMode);
      onComplete();
    }
  };

  return (
    <div
      className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(148.919deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)",
      }}
    >
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-[16px] pt-[58px]">
        {/* Title */}
        <h1 className="font-['Inter',sans-serif] font-medium text-[#0a0a0a] text-[24px] leading-[36px] text-center mb-[16px]">
          4C Wallet
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.05),0px_8px_10px_0px_rgba(0,0,0,0.05)] w-full max-w-[358px] pt-[32px] pb-[48px] px-[16px]">
          {/* Description */}
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <div className="font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium text-[#0a0a0a] text-[18px] leading-[27px] tracking-[-0.4395px] whitespace-pre-wrap">
              <p className="mb-0">基本情報を入力して、</p>
              <p>アプリを始めましょう！</p>
            </div>
          </div>

          {/* Nickname Field */}
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <label className="font-['Noto_Sans_JP:Bold',sans-serif] text-[#2a3449] text-[16px] leading-[1.5]">
              ニックネーム
            </label>
            <div className="bg-white border border-[#a1b3cd] rounded-[4px] flex items-center px-[16px] py-[12px]">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="ここにテキストが入ります"
                className="flex-1 bg-transparent font-['Noto_Sans:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[16px] text-[#2a3449] outline-none placeholder:text-[#a2a3a4]"
                style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
              />
            </div>
          </div>

          {/* Report Setting */}
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <label className="font-['Noto_Sans_JP:Bold',sans-serif] text-[#2a3449] text-[16px] leading-[1.5]">
              1週間レポート
            </label>

            <div className="flex flex-col gap-[12px]">
              {/* Send Option */}
              <button
                onClick={() => setReportSetting("send")}
                className={`flex items-center justify-between px-[17px] py-[1px] h-[84px] rounded-[8px] border ${
                  reportSetting === "send"
                    ? "border-[#eb6b15] bg-[#fff8f3]"
                    : "border-[#e2e9f2] bg-white"
                }`}
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[24px]">
                    送信する
                  </p>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[21px]">
                    1週間単位でレポートを送信します
                  </p>
                </div>
                {reportSetting === "send" && (
                  <div className="size-[24px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                    <Check className="size-[16px] text-white" strokeWidth={2} />
                  </div>
                )}
              </button>

              {/* No Send Option */}
              <button
                onClick={() => setReportSetting("noSend")}
                className={`flex items-center justify-between px-[17px] py-[1px] h-[84px] rounded-[8px] border ${
                  reportSetting === "noSend"
                    ? "border-[#eb6b15] bg-[#fff8f3]"
                    : "border-[#e2e9f2] bg-white"
                }`}
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[24px]">
                    送信しない
                  </p>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[21px]">
                    レポートを送信しません
                  </p>
                </div>
                {reportSetting === "noSend" && (
                  <div className="size-[24px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                    <Check className="size-[16px] text-white" strokeWidth={2} />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Coach Mode */}
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <label className="font-['Noto_Sans_JP:Bold',sans-serif] text-[#2a3449] text-[16px] leading-[1.5]">
              分析設定
            </label>

            <div className="flex flex-col gap-[12px]">
              {/* Demon Coach Option */}
              <button
                onClick={() => setCoachMode("demon")}
                className={`flex items-center justify-between px-[17px] py-[1px] h-[80px] rounded-[12px] border ${
                  coachMode === "demon"
                    ? "border-[#eb6b15] bg-[#fff8f3]"
                    : "border-[#e2e9f2] bg-white"
                }`}
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[24px]">
                    鬼コーチモード
                  </p>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[21px]">
                    厳しめのアドバイスを提供します
                  </p>
                </div>
                {coachMode === "demon" && (
                  <div className="size-[24px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                    <Check className="size-[16px] text-white" strokeWidth={2} />
                  </div>
                )}
              </button>

              {/* Angel Coach Option */}
              <button
                onClick={() => setCoachMode("angel")}
                className={`flex items-center justify-between px-[17px] py-[1px] h-[79px] rounded-[12px] border ${
                  coachMode === "angel"
                    ? "border-[#eb6b15] bg-[#fff8f3]"
                    : "border-[#e2e9f2] bg-white"
                }`}
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="font-['Noto_Sans_JP',sans-serif] font-bold text-[#2a3449] text-[16px] leading-[24px]">
                    天使コーチモード
                  </p>
                  <p className="font-['Noto_Sans_JP',sans-serif] font-normal text-[#5a6b8b] text-[14px] leading-[21px]">
                    優しくサポートします
                  </p>
                </div>
                {coachMode === "angel" && (
                  <div className="size-[24px] rounded-full bg-[#eb6b15] flex items-center justify-center shrink-0">
                    <Check className="size-[16px] text-white" strokeWidth={2} />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] px-[24px] py-[10px] mb-[24px]"
            style={{
              backgroundImage:
                "linear-gradient(173.781deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)",
            }}
          >
            <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-white text-[14px] leading-[20px] text-center">
              登録する
            </p>
          </button>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full rounded-[8px] px-[24px] py-[10px]"
          >
            <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-[#0a0a0a] text-[14px] leading-[20px] text-center underline">
              戻る
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}