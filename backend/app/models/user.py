"""Userモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class User(Base):
    """ユーザー情報"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    coach_mode = Column(String(10), nullable=False, default="tenshi") 
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    # リレーションシップ
    expenses = relationship("Expense", back_populates="user")
    budget = relationship("Budget", back_populates="user", uselist=False)
    expense_evaluations = relationship("ExpenseEvaluation", back_populates="user")
    detection_histories = relationship("DetectionHistory", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', coach_mode='{self.coach_mode}')>"
