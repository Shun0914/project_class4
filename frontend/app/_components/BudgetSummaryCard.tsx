//frontend/app/_components/BudgetSummaryCard.tsx
import Image from 'next/image';
import { CATEGORY_CONFIG } from "@/lib/constants/categories";

// モックのデザインに合わせた色とラベルの定義
const STATUS_MAP: any = {
  unconfigured: { label: " ", color: "text-[#423f3e]" }, // 予算未設定時は空白または目立たない色
  over: { label: "予算オーバー", color: "text-[#f35555]" },
  achieved: { label: "目標達成！", color: "text-[#01b7a5]" },
  in_progress: { label: "予算内", color: "text-[#2a3449]" },
};


/**
 * ダッシュボードのメインとなる予算概要カード
 * 円グラフによるカテゴリ別支出可視化と、AI分析への導線を提供します。
 */
/**
 * @param coachMode 'angel' | 'demon' を追加
 */
export function BudgetSummaryCard({ 
  year, month, budget, spent, remaining, categories, status, 
  onSettingsClick, onAnalyzeClick,
  coachMode = 'demon' // ★追加：デフォルトは'demon'（鬼）に設定
}: any) {
  //今日の日付から現在の年月を取得 ---
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && (today.getMonth() + 1) === month;
  // 表示用タイトルの動的な切り替え
  const displayTitle = isCurrentMonth 
    ? "今月の予算" 
    : `${year}年${String(month).padStart(2, '0')}月予算`;

  // 現在のステータス設定を取得（見つからない場合は未設定をデフォルトに）
  const currentStatus = STATUS_MAP[status] || STATUS_MAP.unconfigured;
  // 予算オーバー判定
  const isOverBudget = remaining < 0 || (budget > 0 && spent > budget);
  // 残金のパーセンテージ（中央の数値表示用）
  const remainingPercent = budget > 0 ? Math.max(0, Math.round((remaining / budget) * 100)) : 0;
  
  // 円グラフ（SVG）の描画計算用
  const radius = 45; // 半径
  // 背景のグレー円（外側）の太さ
  const bgStrokeWidth = 14; 
  // 支出の円（内側）の太さ
  const fgStrokeWidth = 8;
  const circumference = 2 * Math.PI * radius; // 円周の長さ（2πr）
  
  let currentOffset = 0; // 次のカテゴリを描画し始める開始点

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
      {/* カードヘッダー：タイトルと設定ボタン */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#c5d3e6]">
        <h2 className="text-[16px] font-bold text-[#2a3449]">{displayTitle}</h2>
        <button onClick={onSettingsClick} className="text-[12px] text-gray-400 underline">設定</button>
      </div>

      <div className="flex items-center gap-6">
      {/* 左側：円グラフエリア */}
        <div className="flex flex-col items-center gap-[7px]">
          {/* --- ステータスの表示--- */}
          <div className={`text-[14px] font-bold text-center whitespace-nowrap ${currentStatus.color}`}>
            {currentStatus.label}
          </div>
          {/* 左側：マルチカラー・ドーナツチャートエリア */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVGの起点を真上にするため -90度回転させる */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* ベースとなる背景円（予算全体をグレーで表示） */}
              <circle cx="60" cy="60" r={radius} stroke="#f3f3f3" strokeWidth={bgStrokeWidth} fill="none" />
              
              {/* 各カテゴリの支出額に応じて円弧（stroke-dasharray）を重ねる */}
              {isOverBudget ? (
                // 【追加】予算オーバー時：全体を一つの赤い円にする
                <circle
                  cx="60" cy="60" r={radius}
                  stroke="#f13434"
                  strokeWidth={fgStrokeWidth}
                  fill="none"
                  strokeDasharray={`${circumference} ${circumference}`}
                />
              ) : (
              categories?.map((cat: any) => {
                const catRatio = budget > 0 ? cat.amount / budget : 0; // 予算に対するカテゴリ支出の割合
                
                // 描画する円弧の長さ（実線部 空白部）
                const strokeDasharray = `${circumference * catRatio} ${circumference}`;
                
                // 開始位置（オフセット）を指定。積み上げグラフにするため描画ごとにオフセットを更新する。
                const strokeDashoffset = -currentOffset;
                
                // 次のカテゴリの開始位置を今回の終了位置に更新
                currentOffset += circumference * catRatio;
                
                return (
                  <circle
                    key={cat.name}
                    cx="60"
                    cy="60"
                    r={radius}
                    // カテゴリ設定から色を取得（未登録カテゴリはグレー）
                    stroke={CATEGORY_CONFIG[cat.name]?.color || "#adb5bd"}
                    strokeWidth={fgStrokeWidth}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="butt" // 繋ぎ目をフラットにして隙間を無くす
                  />
                );
              })
              )}
            </svg>
            
            {/* チャート中央の「残り %」テキスト。オーバー時は赤 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-[11px] font-normal ${isOverBudget ? 'text-[#f13434]' : 'text-[#5a6b8b]'}`}>
                  残り
              </p>
              <p className={`text-[26px] font-bold leading-none ${isOverBudget ? 'text-[#f13434]' : 'text-[#2a3449]'}`}>
                {remainingPercent}<span className="text-[14px] ml-0.5">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* 右側：詳細な数値情報リスト */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-[16px] text-[#2a3449]">予算</span>
            <span className="font-bold text-[20px] text-[#2a3449]">
              {budget?.toLocaleString()}<span className="text-[14px] ml-0.5">円</span>
            </span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[16px] text-[#f13434]">消費</span>
            <span className="font-bold text-[20px] text-[#f13434]">
              {spent?.toLocaleString()}<span className="text-[14px] ml-0.5">円</span>
            </span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className={`text-[16px] ${remaining < 0 ? 'text-[#f13434]' : 'text-[#478dff]'}`}>残金</span>
            <span className={`font-bold text-[20px] ${remaining < 0 ? 'text-[#f13434]' : 'text-[#478dff]'}`}>
              {remaining?.toLocaleString()}<span className="text-[14px] ml-0.5">円</span>
            </span>
          </div>
        </div>
      </div>

      {/* AIコーチのアドバイスエリア（Figmaデザインの再現） */}
      <div className="mt-6 p-4 bg-[#fffdf2] rounded-2xl border border-orange-100">
        <p className="text-[12px] leading-relaxed text-[#423f3e]">
          AIコーチがあなたの支出を分析し、節約のアドバイスを伝授します。
        </p>
        <button 
          onClick={onAnalyzeClick} 
          className="w-full mt-3 py-2 bg-white border border-orange-200 rounded-full text-[14px] text-[#eb6b15] font-bold shadow-sm active:scale-95 transition-transform hover:bg-orange-50 flex items-center justify-center gap-2"
        >
          {/* 設定モードによってアイコンを出し分け */}
          <Image
            src={coachMode === 'angel' ? '/angel.svg' : '/demon.svg'}
            alt={coachMode === 'angel' ? '天使' : '鬼'}
            width={20}
            height={20}
          />
          分析する
        </button>
      </div>
    </div>
  );
}