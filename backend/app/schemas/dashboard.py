from pydantic import BaseModel
from typing import List, Optional

class CategorySummary(BaseModel):
    """
    カテゴリ別の集計情報を表すスキーマ
    """
    id: Optional[int]  # カテゴリID（「未分類」の場合は None になるため Optional）
    name: str          # カテゴリ名（例: 食費、日用品など）
    amount: int        # そのカテゴリに分類された支出の合計金額

class DashboardSummary(BaseModel):
    """
    ダッシュボード画面に表示するための月次集計データスキーマ
    """
    total_budget: int      # 設定された月間予算額
    total_spent: int       # その月の支出合計額
    
    # 予算に対する現在の状況
    # "achieved": 予算内に収まって月を終了
    # "in_progress": 予算内で現在進行中
    # "over": 予算超過
    # "unconfigured": 予算未設定
    status: str
    
    remaining_amount: int  # 予算残高（予算 - 支出。マイナスの場合は 0 を保持）
    categories: List[CategorySummary]  # カテゴリごとの集計リスト