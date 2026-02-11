"""Userモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class User(Base):
    """ユーザー情報"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=True)
    google_id = Column(String(255), unique=True, nullable=True)
    nickname = Column(String(255), nullable=True)
    report_enabled = Column(Boolean, nullable=False, server_default="1")
    coach_mode = Column(String(50), nullable=False, server_default="angel")
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    # リレーションシップ
    expenses = relationship("Expense", back_populates="user")
    budget = relationship("Budget", back_populates="user", uselist=False)
    expense_evaluations = relationship("ExpenseEvaluation", back_populates="user")
    detection_histories = relationship("DetectionHistory", back_populates="user")
    # weekly_reports = relationship("WeeklyReport", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', coach_mode='{self.coach_mode}')>"
