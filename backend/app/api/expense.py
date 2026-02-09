# app/api/expenses.py
from fastapi import Request, HTTPException, status
from datetime import datetime, timezone, date
from uuid import uuid4
from typing import Dict, Any

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.auth import get_google_sub_from_bearer
from app.db import engine


# =========================
# 認証：ユーザー検証
# =========================
def validate_user(request: Request) -> str:
    """
    Authorization: Bearer <Google ID Token> を検証し、
    user_id を返す

    - 失敗時は HTTPException を投げる
    """
    try:
        google_sub = get_google_sub_from_bearer(request)
    except HTTPException:
        # auth.py 側の HTTPException をそのまま投げる
        raise

    # 最小構成：google_sub を user_id として使う
    user_id = google_sub

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="user not allowed",
        )

    return user_id


# =========================
# DB処理：支出登録
# =========================
def insert_expense_record(
    *,
    user_id: str,
    item: str,
    category_id: str,
    price: int,
    expense_date: date,
) -> Dict[str, Any]:
    """
    expenses テーブルへ INSERT し、
    保存結果を dict で返す

    例外時：
      - DB系は HTTPException(500) に変換
    """

    expense_id = str(uuid4())
    now = datetime.now(timezone.utc)

    sql = text(
        """
        INSERT INTO expenses (
            expense_id,
            user_id,
            item,
            category_id,
            price,
            expense_date,
            created_at,
            updated_at
        )
        VALUES (
            :expense_id,
            :user_id,
            :item,
            :category_id,
            :price,
            :expense_date,
            :created_at,
            :updated_at
        )
        """
    )

    try:
        with engine.begin() as conn:
            conn.execute(
                sql,
                {
                    "expense_id": expense_id,
                    "user_id": user_id,
                    "item": item,
                    "category_id": category_id,
                    "price": price,
                    "expense_date": expense_date,
                    "created_at": now,
                    "updated_at": now,
                },
            )

    except SQLAlchemyError:
        # SQL詳細や入力値は外に出さない
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="database error",
        )

    # 正常時の返却データ
    return {
        "expense_id": expense_id,
        "item": item,
        "category_id": category_id,
        "price": price,
        "expense_date": expense_date,
        "created_at": now,
        "updated_at": now,
    }
