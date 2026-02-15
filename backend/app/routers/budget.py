"""予算設定API"""
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.user import User
from app.models.budget import Budget
from app.schemas.budget import BudgetSetRequest, BudgetResponse
from app.core.security import get_current_user

router = APIRouter(prefix="/api/budget", tags=["予算"])


@router.get("", response_model=BudgetResponse)
def get_budget(
    year: int = Query(..., ge=2020, le=2100),
    month: int = Query(..., ge=1, le=12),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """指定年月の予算を取得"""
    budget = db.query(Budget).filter(
        Budget.user_id == current_user.id,
        Budget.budget_year == year,
        Budget.budget_month == month,
    ).first()
    if not budget:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="予算が設定されていません",
        )
    return budget


@router.put("", response_model=BudgetResponse)
def set_budget(
    payload: BudgetSetRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """予算を設定（存在しなければ作成、あれば更新）"""
    budget = db.query(Budget).filter(
        Budget.user_id == current_user.id,
        Budget.budget_year == payload.budget_year,
        Budget.budget_month == payload.budget_month,
    ).first()
    if budget:
        budget.monthly_budget = payload.monthly_budget
    else:
        budget = Budget(
            user_id=current_user.id,
            budget_year=payload.budget_year,
            budget_month=payload.budget_month,
            monthly_budget=payload.monthly_budget,
        )
        db.add(budget)
    db.commit()
    db.refresh(budget)
    return budget
