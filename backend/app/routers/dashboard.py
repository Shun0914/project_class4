from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.dashboard import DashboardSummary
from app.routers.dashboard_logic import get_summary_data 
from app.core.security import get_current_user
from app.models.user import User

# ダッシュボード関連のAPIを管理するルーター
router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary", response_model=DashboardSummary)
def read_dashboard_summary(
    # クエリパラメータから取得する年月（バリデーション用Queryを使用）
    year: int = Query(..., description="集計年"),
    month: int = Query(..., description="集計月"),
    # 認証済みユーザー情報を取得
    current_user: User = Depends(get_current_user),
    # データベースセッションを取得
    db: Session = Depends(get_db)
):
    """
    指定された年月のダッシュボード統計（予算、支出合計、カテゴリ別内訳）を返します。
    """
    # 実際の計算・データ取得ロジックは別ファイル(dashboard_logic)へ委譲
    return get_summary_data(db, current_user.id, year, month)