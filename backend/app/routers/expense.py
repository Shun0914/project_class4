# app/routes/expense.py
from fastapi import APIRouter, Depends,Request, HTTPException, status,Query
from fastapi.responses import JSONResponse
from datetime import datetime, timezone, date
from typing import Dict, Any
import traceback
import os

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.db import engine,get_db

from google.auth.transport import requests as google_requests

from app.models.user import User
from app.core.security import get_current_user
from app.schemas.expense import ExpenseCreateRequest


router = APIRouter()


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

#    except SQLAlchemyError:
#        # SQL詳細や入力値は外に出さない
#        raise HTTPException(
#            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#            detail="database error",
#        )

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


@router.post("", status_code=status.HTTP_201_CREATED)
def register_expense(
    payload: ExpenseCreateRequest, 
    request: Request,
    db: Session = Depends(get_db),
    # ★修正箇所1: テスト用の username を削除し、current_user を有効化
    current_user: User = Depends(get_current_user) 
):

    # レスポンス定義 (中略)

    try:
        # -------------------------
        # 1) 認証済みユーザーから ID を取得
        # -------------------------
        # ★修正箇所2: DBへのユーザー名問い合わせを全て削除し、トークンから得た current_user を使う
        user_id = current_user.id

        # -------------------------
        # 2) insert_expense_record で Azure SQL にデータ挿入
        # -------------------------
        # DB保存処理の実行
        saved = insert_expense_record(
            user_id=user_id,
            item=payload.item,
            category_id=payload.category_id,
            price=payload.price,
            expense_date=payload.expense_date,
        )

        # 3) 実行結果を return
        return {
            "success": True,
            "data": saved,
        }

    #except Exception as e:
    except HTTPException as e:
        if e.status_code == status.HTTP_401_UNAUTHORIZED:
            return err(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", "認証に失敗しました")
        if e.status_code == status.HTTP_400_BAD_REQUEST:
            return err(status.HTTP_400_BAD_REQUEST, "VALIDATION_ERROR", "入力内容に誤りがあります")
        if e.status_code == status.HTTP_403_FORBIDDEN:
            return err(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "この操作を行う権限がありません")
        return err(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "サーバ内部でエラーが発生しました")

    except Exception as e:
        # レビュー時にYoko追加　ここからこの2行を一時的に追加してエラーをターミナルに出す
        import traceback
        traceback.print_exc()
        return err(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", f"Debug: {str(e)}")
        # レビュー時にYoko追加　ここまで#　

        # ここで例外内容（payload含む可能性）をレスポンスに出さない
        #return err(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "サーバ内部でエラーが発生しました")
