from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy import text
from app.db import engine
from uuid import uuid5

app = FastAPI(
    title="まっちゃんウォレット(仮) API",
    description="家計簿アプリ まっちゃんウォレット(仮) のAPI",
    version="0.1.0"
)
# TODO: CORS対応

@app.get("/")
def read_root():
    """APIの稼働状況を確認するエンドポイント"""
    return {"message": "API is running", "status": "ok"}


@app.get("/health")
def health_check():
    """ヘルスチェック用エンドポイント"""
    return {"status": "healthy"}


@app.get("/health/db")
def health_check_db():
    """データベース接続確認用エンドポイント"""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            result.fetchone()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}


import app.api.register_expense
from app.models.expense import ExpenseCreateRequest 
@app.post("/api/register_expense", status_code=status.HTTP_201_CREATED)
def register_expense(payload: ExpenseCreateRequest, request: Request):

    # 生成データ内容をハッシュ化して支出IDを作成
    request_id = f"req-{uuid5().hex[:8]}"

    # レスポンス定義
    def err(http_status: int, code: str, message: str, details: list[dict] | None = None):
        body = {
            "success": False,
            "error": {
                "code": code,
                "message": message,
                "request_id": request_id,
            },
        }
        if details is not None:
            body["error"]["details"] = details
        return JSONResponse(status_code=http_status, content=body)

    try:
        # -------------------------
        # 1) validate_user で user_id を取得（Google ID Token 検証）
        # -------------------------
        user_id = app.expenses.validate_user(request)  
        # 失敗時は HTTPException(401/403) を投げる想定

        # -------------------------
        # 2) insert_expense_record で Azure SQL にデータ挿入
        # -------------------------
        saved = app.expenses.insert_expense_record(
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
    
