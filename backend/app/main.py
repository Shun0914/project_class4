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

from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget
from app.models.category import Category
from app.models.expense_evaluation import ExpenseEvaluation
from app.models.detection_history import DetectionHistory
from app.models.receipt_image import ReceiptImage
from app.models.keyword import Keyword


app = FastAPI(
    title="おかねのコーチ API",
    description="AIコーチ付き家計簿アプリ おかねのコーチ のAPI",
    version="0.1.0"
)

# CORS設定（フロントエンドからのリクエストを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://tech0-gen-11-step3-2-node-67.azurewebsites.net",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# ルーターの登録
app.include_router(auth.router)
app.include_router(analyze.router)
app.include_router(budget.router)
app.include_router(expense_router, prefix="/expenses")

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



    
