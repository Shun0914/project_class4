"""Expenseモデル（最新のテーブル定義 + category_id 維持）"""
from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base

class Expense(Base):
    """支出"""
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    # 外部キー制約：親テーブルにデータがあることが前提
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    item = Column(String(255), nullable=False)
    price = Column(Integer, nullable=False)
    # ユーザー指定の日付が入る（NULL不可）
    expense_date = Column(Date, nullable=False)
    # カテゴリID（数値型で維持）
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    helpfulness_score = Column(Integer, nullable=True, default=0)
    helpful_count = Column(Integer, nullable=True, default=0)
    confidence = Column(Float, nullable=True) # 数値精度
    raw_merchant = Column(String(255), nullable=True) # 加盟店名など

    # DB側で自動生成させる設定
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    # リレーションシップ：User, Category などのモデルが別途定義されている必要があります
    user = relationship("User", back_populates="expenses")
    category = relationship("Category", back_populates="expenses")
    receipt_images = relationship("ReceiptImage", back_populates="expense")
    expense_evaluations = relationship("ExpenseEvaluation", back_populates="expense")
    keywords = relationship("Keyword", secondary="expense_keywords", back_populates="expenses")

    def __repr__(self):
        return f"<Expense(id={self.id}, item='{self.item}', price={self.price})>"