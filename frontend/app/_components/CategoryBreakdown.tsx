// frontend/app/_components/CategoryBreakdown.tsx
import { CATEGORY_CONFIG } from "@/lib/constants/categories";

/**
 * カテゴリ別の支出内訳をリスト表示するコンポーネント
 * 予算に対する各カテゴリの支出割合（%）を計算して表示します。
 */
export function CategoryBreakdown({ categories, budget, onHeaderClick }: any) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      {/* ヘッダー部分：
          onClickが渡されている場合、クリックで履歴モーダル等を開くトリガーとなります。
      */}
      <div 
        className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2 cursor-pointer active:opacity-60 transition-opacity"
        onClick={onHeaderClick} 
      >
        <h2 className="text-[15px] font-bold text-[#423f3e]">内訳</h2>
        <div className="flex items-center gap-1">
          <span className="text-gray-400">＞</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* 支出データのループ処理：
            categories が null や undefined の場合でもエラーにならないよう、空配列 [] をフォールバックとして使用。
        */}
        {(categories || []).map((cat: any) => {
          // 予算に対するこのカテゴリ支出の割合を計算（0除算防止）
          const percent = budget > 0 ? Math.round((cat.amount / budget) * 100) : 0;
          
          return (
            <div key={cat.name} className="flex items-center justify-between">
              {/* 左側：カテゴリ色ドットと名前 */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: CATEGORY_CONFIG[cat.name]?.color || '#adb5bd' }} 
                />
                <span className="text-[14px] font-medium text-[#423f3e]">{cat.name}</span>
              </div>

              {/* 右側：支出額と構成比率 */}
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-bold text-[#423f3e]">
                  {cat.amount.toLocaleString()}円
                </span>
                <span className="text-[11px] text-gray-400 w-8 text-right">
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}