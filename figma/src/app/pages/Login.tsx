import { useState } from "react";
import { StatusBar } from "@/app/components/StatusBar";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import svgPaths from "@/imports/svg-wmv9k";

interface LoginProps {
  onSwitchToSignup: () => void;
  onLogin: () => void;
  onGoogleLogin: () => void;
}

export function Login({ onSwitchToSignup, onLogin, onGoogleLogin }: LoginProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // バリデーションを実行
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div
      className="flex flex-col h-screen w-full max-w-[390px] mx-auto relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(154.633deg, rgb(255, 253, 242) 0%, rgb(255, 252, 239) 45.29%, rgb(255, 242, 234) 100%)",
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
        <div className="bg-[rgba(255,255,255,0.7)] rounded-[14px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.05),0px_8px_10px_0px_rgba(0,0,0,0.05)] w-full max-w-[358px] pt-[32px] pb-[48px] px-[16px]">
          {/* Tab Switch */}
          <div className="bg-[#f3f4f6] h-[48px] rounded-[10px] p-[4px] mb-[48px]">
            <div className="flex gap-[8px] h-full">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 rounded-[8px] font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-[16px] ${
                  activeTab === "login"
                    ? "bg-white text-[#101828] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]"
                    : "text-[#4a5565]"
                }`}
              >
                ログイン
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  onSwitchToSignup();
                }}
                className={`flex-1 rounded-[8px] font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-[16px] ${
                  activeTab === "signup"
                    ? "bg-white text-[#101828] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]"
                    : "text-[#4a5565]"
                }`}
              >
                新規登録
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-[8px] mb-[16px]">
            <label className="font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-[#0a0a0a] text-[14px] leading-[20px]">
              メールアドレス
            </label>
            <div className="bg-[#f3f3f5] flex items-center gap-[12px] px-[12px] py-[8px] rounded-[4px]">
              <Mail className="size-[16px] text-[#99a1af]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="flex-1 bg-transparent font-['Inter',sans-serif] font-normal text-[16px] text-[#717182] outline-none placeholder:text-[#717182]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-[8px] mb-[24px]">
            <label className="font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-[#0a0a0a] text-[14px] leading-[20px]">
              パスワード
            </label>
            <div className="bg-[#f3f3f5] flex items-center justify-between px-[12px] py-[8px] rounded-[4px]">
              <div className="flex items-center gap-[12px] flex-1">
                <Lock className="size-[16px] text-[#99a1af]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent font-['Inter',sans-serif] font-normal text-[16px] text-[#717182] outline-none placeholder:text-[#717182]"
                />
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 size-[16px] flex items-center justify-center"
              >
                {showPassword ? (
                  <EyeOff className="size-full text-[#99a1af]" />
                ) : (
                  <Eye className="size-full text-[#99a1af]" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full rounded-[8px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] px-[24px] py-[10px] mb-[36px]"
            style={{
              backgroundImage:
                "linear-gradient(173.781deg, rgb(255, 160, 76) 2.1423%, rgb(251, 180, 65) 34.595%, rgb(240, 110, 35) 99.971%)",
            }}
          >
            <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-white text-[14px] leading-[20px] text-center">
              ログイン
            </p>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center mb-[36px]">
            <div className="flex-1 h-[1px] bg-[#e5e7eb]" />
            <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-normal text-[#6a7282] text-[14px] px-[16px]">
              または
            </p>
            <div className="flex-1 h-[1px] bg-[#e5e7eb]" />
          </div>

          {/* Google Login Button */}
          <button
            onClick={onGoogleLogin}
            className="bg-white w-full rounded-[8px] border border-[#e5e7eb] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.11)] px-[24px] py-[10px]"
          >
            <div className="flex items-center justify-center gap-[8px]">
              <div className="size-[20px] relative">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6 19.99">
                  <path
                    d="M19.6 10.227C19.6 9.51798 19.5364 8.83656 19.4182 8.18182H10V12.0491H15.3818C15.15 13.2991 14.4455 14.3582 13.3864 15.0673V17.5764H16.6182C18.5091 15.8345 19.6 13.2727 19.6 10.227Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5764L13.3864 15.0673C12.4909 15.6691 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.40455 11.9C4.20455 11.2982 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20455 8.70182 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z"
                    fill="#E94235"
                  />
                </svg>
              </div>
              <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-medium text-[#0a0a0a] text-[14px] leading-[20px]">
                Googleでログイン
              </p>
            </div>
          </button>
        </div>

        {/* Security Note */}
        <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-normal text-[#6a7282] text-[12px] leading-[16px] text-center mt-[16px]">
          すべての情報は暗号化されて安全に保管されます
        </p>
      </div>
    </div>
  );
}
