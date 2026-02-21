# app/routes/expense.py
from fastapi import APIRouter, Depends, Request, HTTPException, status, Query
from fastapi.responses import JSONResponse
from datetime import datetime, timezone, date
from typing import Dict, Any, Optional
import traceback
import os

from sqlalchemy import text, extract
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.db import engine, get_db

from google.auth.transport import requests as google_requests

from app.models.user import User
from app.models.expense import Expense
from app.models.category import Category
from app.core.security import get_current_user
from app.schemas.expense import ExpenseCreateRequest, ExpenseUpdateRequest


router = APIRouter(tags=["支出"])


def _error_response(status_code: int, code: str, message: str) -> JSONResponse:
    """エラーレスポンスを生成するヘルパー関数"""
    return JSONResponse(
        status_code=status_code,
        content={"code": code, "message": message},
    )


# =========================
# DB処理：支出登録
# =========================
def insert_expense_record(
    *,
    user_id: int,
    item: str,
    category_id: int,
    price: int,
    expense_date: date,
) -> Dict[str, Any]:
    """
    expenses テーブルへ INSERT し、
    保存結果を dict で返す

    例外時：
      - DB系は HTTPException(500) に変換
    """

    sql = text(
        """
        INSERT INTO expenses (
            user_id,
            item,
            category_id,
            price,
            expense_date
        )
        VALUES (
            :user_id,
            :item,
            :category_id,
            :price,
            :expense_date
        )
        """
    )

    try:
        now = datetime.now(timezone.utc)

        with engine.begin() as conn:
            result = conn.execute(
                sql,
                {
                    "user_id": user_id,
                    "item": item,
                    "category_id": category_id,
                    "price": price,
                    "expense_date": expense_date,
                },
            )
            new_id = result.lastrowid
        # TODO: Azure SQL の場合、lastrowid が使えない可能性あり。
        # uuid や別の方法で一意IDを取得する必要があるかも。(他のテーブルも同様)

        # 正常時の返却データ
        return {
            "id": new_id,
            "item": item,
            "category_id": category_id,
            "price": price,
            "expense_date": expense_date,
            "created_at": now,
            "updated_at": now,
        }

## レビュー時にYoko追加 ここから ##
    except SQLAlchemyError as e:  # as e を追加
        print("--- DB ERROR TRACEBACK ---")
        import traceback
        traceback.print_exc()     # これでDBエラーの正体が表示されます
        print(f"Error Detail: {e}")
        print("--------------------------")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"database error: {str(e)}", # 原因をレスポンスにも含める
        )

## レビュー時にYoko追加 ここまで ##


@router.get("")
def list_expenses(
    year: int = Query(..., description="年"),
    month: int = Query(..., ge=1, le=12, description="月"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """指定年月の支出一覧を取得する"""
    try:
        expenses = (
            db.query(Expense, Category.name.label("category_name"))
            .outerjoin(Category, Expense.category_id == Category.id)
            .filter(
                Expense.user_id == current_user.id,
                extract("year", Expense.expense_date) == year,
                extract("month", Expense.expense_date) == month,
            )
            .order_by(Expense.expense_date.desc(), Expense.id.desc())
            .all()
        )

        result = []
        for expense, category_name in expenses:
            result.append({
                "id": expense.id,
                "item": expense.item,
                "price": expense.price,
                "expense_date": expense.expense_date.isoformat(),
                "category_id": expense.category_id,
                "category_name": category_name,
                "created_at": expense.created_at.isoformat() if expense.created_at else None,
            })

        return {"expenses": result}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"database error: {str(e)}",
        )


@router.post("", status_code=status.HTTP_201_CREATED)
def register_expense(
    payload: ExpenseCreateRequest,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        user_id = current_user.id

        saved = insert_expense_record(
            user_id=user_id,
            item=payload.item,
            category_id=payload.category_id,
            price=payload.price,
            expense_date=payload.expense_date,
        )

        return {
            "success": True,
            "data": saved,
        }

    except HTTPException as e:
        if e.status_code == status.HTTP_401_UNAUTHORIZED:
            return _error_response(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", "認証に失敗しました")
        if e.status_code == status.HTTP_400_BAD_REQUEST:
            return _error_response(status.HTTP_400_BAD_REQUEST, "VALIDATION_ERROR", "入力内容に誤りがあります")
        if e.status_code == status.HTTP_403_FORBIDDEN:
            return _error_response(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "この操作を行う権限がありません")
        return _error_response(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "サーバ内部でエラーが発生しました")

    except Exception as e:
        traceback.print_exc()
        return _error_response(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", f"Debug: {str(e)}")


@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    payload: ExpenseUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """支出を更新する"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="支出が見つかりません",
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="この支出を編集する権限がありません",
        )

    expense.item = payload.item
    expense.category_id = payload.category_id
    expense.price = payload.price
    expense.expense_date = payload.expense_date
    db.commit()
    db.refresh(expense)

    category_name = None
    if expense.category_id:
        cat = db.query(Category).filter(Category.id == expense.category_id).first()
        if cat:
            category_name = cat.name

    return {
        "id": expense.id,
        "item": expense.item,
        "price": expense.price,
        "expense_date": expense.expense_date.isoformat(),
        "category_id": expense.category_id,
        "category_name": category_name,
        "created_at": expense.created_at.isoformat() if expense.created_at else None,
    }


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """支出を削除する"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="支出が見つかりません",
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="この支出を削除する権限がありません",
        )
    db.delete(expense)
    db.commit()
