# app/routes/expenses.py
from fastapi import Request, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from datetime import datetime, timezone, date
from typing import Dict, Any
import os

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db import engine
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from app.schemas.expense import ExpenseCreateRequest 

# =========================
# 認証：ユーザー検証
# =========================
def validate_user(request: Request) -> int:
    """
    Authorization: Bearer <Google ID Token> を検証し、
    user_id（Googleのsubからusersテーブルで策引きして取得）を返す。
    """
    # 26-02-10 TODO:
    # 現作成環境ではusersテーブルが存在しないため、暫定的に常に1番を返す。
    # リリースまでには、コメントアウトしたコードを有効化し、ユーザー特定すること。
    return 1

    # try:
    #     # ① Authorization ヘッダー取得
    #     auth_header = request.headers.get("Authorization")
    #     if not auth_header or not auth_header.startswith("Bearer "):
    #         raise HTTPException(status_code=401, detail="Authorization header missing")

    #     # ② Bearer トークン部分だけ取り出す
    #     token = auth_header.replace("Bearer ", "")

    #     # ③ Google ID Token を検証
    #     idinfo = id_token.verify_oauth2_token(
    #         token,
    #         google_requests.Request(),
    #         os.environ.get("GOOGLE_CLIENT_ID"),
    #     )

    #     google_sub = idinfo["sub"]

    #     sql = text("SELECT id FROM users WHERE google_sub = :sub")
    #     with engine.begin() as conn:
    #         row = conn.execute(sql, {"sub": google_sub}).fetchone()

    #     if not row:
    #         raise HTTPException(status_code=401, detail="User not registered")

    #     return int(row[0])

    # except HTTPException:
    #     print("エラー: ユーザーが特定できませんでした。")
    #     return 0

# =========================
# DB処理：支出登録
# =========================
def insert_expense_record(
    *,
    user_id: int,
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

    sql = text(
        """
        INSERT INTO expenses (
            user_id,
            item,
            category_id,
            price,
            expense_date,
            created_at,
            updated_at
        )
        VALUES (
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
                    "created_at": now,
                    "updated_at": now,
                },
            )
        id = result.lastrowid
        # TODO: Azure SQL の場合、lastrowid が使えない可能性あり。
        # uuid や別の方法で一意IDを取得する必要があるかも。(他のテーブルも同様)

    except SQLAlchemyError:
        # SQL詳細や入力値は外に出さない
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="database error",
        )

    # 正常時の返却データ
    return {
        "id": id,
        "item": item,
        "category_id": category_id,
        "price": price,
        "expense_date": expense_date,
        "created_at": now,
        "updated_at": now,
    }


router = APIRouter()

@router.post("/expense", status_code=status.HTTP_201_CREATED)
def register_expense(payload: ExpenseCreateRequest, request: Request):

    # レスポンス定義
    def err(http_status: int, code: str, message: str, details: list[dict] | None = None):
        body = {
            "success": False,
            "error": {
                "code": code,
                "message": message,
                "request_id": request.headers.get("X-Request-ID", "unknown"),
            },
        }
        if details is not None:
            body["error"]["details"] = details
        return JSONResponse(status_code=http_status, content=body)

    try:
        # -------------------------
        # 1) validate_user で user_id を取得（Google ID Token 検証）
        # -------------------------
        user_id = validate_user(request)  
        # 失敗時は HTTPException(401/403) を投げる想定
        # TODO: 現在、失敗時も user_id="anonymous" を返す仕様になっている
        # 本番デプロイでは、認証必須に変更することが望ましい。


        # -------------------------
        # 2) insert_expense_record で Azure SQL にデータ挿入
        # -------------------------
        saved = insert_expense_record(
            user_id=user_id,
            item=payload.item,
            category_id=payload.category_id,
            price=payload.price,
            expense_date=payload.expense_date,
        )
        # saved は DB保存後のレコード情報（expense_id / created_at / updated_at など）を返す想定

        # -------------------------
        # 3) 実行結果を return
        # -------------------------
        return {
            "success": True,
            "data": saved,
        }

    except HTTPException as e:
        if e.status_code == status.HTTP_401_UNAUTHORIZED:
            return err(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", "認証に失敗しました")
        if e.status_code == status.HTTP_400_BAD_REQUEST:
            return err(status.HTTP_400_BAD_REQUEST, "VALIDATION_ERROR", "入力内容に誤りがあります")
        if e.status_code == status.HTTP_403_FORBIDDEN:
            return err(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "この操作を行う権限がありません")
        return err(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "サーバ内部でエラーが発生しました")

    except Exception:
        # ここで例外内容（payload含む可能性）をレスポンスに出さない
        return err(status.HTTP_500_INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "サーバ内部でエラーが発生しました")
