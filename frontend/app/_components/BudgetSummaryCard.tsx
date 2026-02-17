//frontend/app/_components/BudgetSummaryCard.tsx

import { CATEGORY_CONFIG } from "@/lib/constants/categories";

/**
 * ダッシュボードのメインとなる予算概要カード
 * 円グラフによるカテゴリ別支出可視化と、AI分析への導線を提供します。
 */
export function BudgetSummaryCard({ budget, spent, remaining, categories, onSettingsClick, onAnalyzeClick }: any) {
  // 残金のパーセンテージ（中央の数値表示用）
  const remainingPercent = budget > 0 ? Math.max(0, Math.round((remaining / budget) * 100)) : 0;
  
  // 円グラフ（SVG）の描画計算用
  const radius = 48; // 半径
  const circumference = 2 * Math.PI * radius; // 円周の長さ（2πr）
  let currentOffset = 0; // 次のカテゴリを描画し始める開始点

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
      {/* カードヘッダー：タイトルと設定ボタン */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[14px] font-bold text-[#423f3e]">今月の予算</h2>
        <button onClick={onSettingsClick} className="text-[12px] text-gray-400 underline">設定</button>
      </div>

      <div className="flex items-center gap-6">
        {/* 左側：マルチカラー・ドーナツチャートエリア */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* SVGの起点を真上にするため -90度回転させる */}
          <svg className="w-full h-full -rotate-90">
            {/* ベースとなる背景円（予算全体をグレーで表示） */}
            <circle cx="56" cy="56" r={radius} stroke="#f1f3f5" strokeWidth="8" fill="none" />
            
            {/* 各カテゴリの支出額に応じて円弧（stroke-dasharray）を重ねる */}
            {categories?.map((cat: any) => {
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
                  cx="56"
                  cy="56"
                  r={radius}
                  // カテゴリ設定から色を取得（未登録カテゴリはグレー）
                  stroke={CATEGORY_CONFIG[cat.name]?.color || "#adb5bd"}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="butt" // 繋ぎ目をフラットにして隙間を無くす
                />
              );
            })}
          </svg>
          
          {/* チャート中央の「残り %」テキスト */}
          <div className="absolute text-center">
            <p className="text-[10px] text-gray-400">残り</p>
            <p className="text-xl font-bold">{remainingPercent}%</p>
          </div>
        </div>

        {/* 右側：詳細な数値情報リスト */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500 font-bold">予算</span>
            <span className="font-bold text-[#423f3e]">{budget?.toLocaleString()} 円</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#fa4848] font-bold">消費</span>
            <span className="font-bold text-[#fa4848]">{spent?.toLocaleString()} 円</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#3ec3db] font-bold">残金</span>
            <span className="font-bold text-[#3ec3db]">{remaining?.toLocaleString()} 円</span>
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
          className="w-full mt-3 py-2 bg-white border border-orange-200 rounded-full text-[12px] text-[#eb6b15] font-bold shadow-sm active:scale-95 transition-transform hover:bg-orange-50"
        >
          📊 再分析する
        </button>
      </div>
    </div>
  );
}