"""Expenseモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base
from datetime import date
from pydantic import BaseModel


class Expense(Base):
    """支出"""
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    item = Column(String(255), nullable=False)
    price = Column(Integer, nullable=False)
    expense_date = Column(Date, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    helpful_count = Column(Integer, nullable=False, default=0)
    helpfulness_score = Column(Float, nullable=False, default=0.0)
    raw_merchant = Column(String(500), nullable=True)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    # リレーションシップ
    user = relationship("User", back_populates="expenses")
    category = relationship("Category", back_populates="expenses")
    expense_evaluations = relationship("ExpenseEvaluation", back_populates="expense")
    keywords = relationship("Keyword", secondary="expense_keywords", back_populates="expenses")
    receipt_images = relationship("ReceiptImage", back_populates="expense")

    def __repr__(self):
        return f"<Expense(id={self.id}, item='{self.item}', price={self.price})>"


