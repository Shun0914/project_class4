from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy import text
from app.db import engine
from uuid import uuid5
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze
from app.routers import auth
from app.routers import budget
from app.routers.expense import router as expense_router
from app.routers import nearShops
from app.routers import dashboard

from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget
from app.models.category import Category
from app.models.expense_evaluation import ExpenseEvaluation
from app.models.detection_history import DetectionHistory
from app.models.receipt_image import ReceiptImage
from app.models.keyword import Keyword
from app.routers import receipt

# Google map 問合せ用
from app.core.client import HttpClientHolder, cms
from contextlib import asynccontextmanager
import httpx

@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- （たも）ここから追加：サーバー起動時に自動でカテゴリーを用意する ---
    try:
        sql = text("""
            INSERT IGNORE INTO categories (id, name) 
            VALUES 
            (1, '未分類'),
            (2, '食費'), 
            (3, '日用品'), 
            (4, '交通費'), 
            (5, 'その他')
        """)
        with engine.begin() as conn:
            conn.execute(sql)
        print("✅ 起動チェック: カテゴリーデータの準備OK！")
    except Exception as e:
        print(f"⚠️ カテゴリーデータの準備をスキップしました (詳細: {e})")
    # --- （たも）ここまで追加 ---
    
    # アプリ起動時の処理: クライアントを作成（コネクションプール開始）
    cms.client = httpx.AsyncClient(
        timeout=10.0,
        limits=httpx.Limits(),
    )
    yield
    # アプリ終了時の処理: クライアントを閉じる
    if cms.client:
        await cms.client.aclose()



app = FastAPI(
    title="おかねのコーチ API",
    description="AIコーチ付き家計簿アプリ おかねのコーチ のAPI",
    version="0.1.0",
    lifespan=lifespan)

# CORS設定（フロントエンドからのリクエストを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://host.docker.internal:3000/",
        "https://tech0-gen-11-step3-2-node-67.azurewebsites.net",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# ルーターの登録
app.include_router(auth.router)
app.include_router(analyze.router)
app.include_router(budget.router)
app.include_router(expense_router, prefix="/expenses")
app.include_router(nearShops.router)
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(receipt.router)


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



    
