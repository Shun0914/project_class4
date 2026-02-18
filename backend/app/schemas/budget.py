"""予算設定API用スキーマ"""
from datetime import datetime
from pydantic import BaseModel, Field


class BudgetSetRequest(BaseModel):
    """予算設定リクエスト（作成・更新兼用）"""
    budget_year: int = Field(..., ge=2020, le=2100, description="年")
    budget_month: int = Field(..., ge=1, le=12, description="月")
    monthly_budget: int = Field(..., gt=0, le=99999999, description="月の予算額（円）")


class BudgetResponse(BaseModel):
    """予算レスポンス"""
    id: int
    user_id: int
    budget_year: int
    budget_month: int
    monthly_budget: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
