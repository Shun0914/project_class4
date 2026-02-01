"""Budgetモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class Budget(Base):
    """予算"""
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    monthly_budget = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    # リレーションシップ
    user = relationship("User", back_populates="budget")

    def __repr__(self):
        return f"<Budget(id={self.id}, user_id={self.user_id}, monthly_budget={self.monthly_budget})>"
