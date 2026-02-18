"""Budgetモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class Budget(Base):
    """予算（年月別）"""
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    budget_year = Column(Integer, nullable=False)
    budget_month = Column(Integer, nullable=False)
    monthly_budget = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint('user_id', 'budget_year', 'budget_month', name='uq_user_budget_yearmonth'),
    )

    # リレーションシップ
    user = relationship("User", back_populates="budgets")

    def __repr__(self):
        return f"<Budget(id={self.id}, user_id={self.user_id}, {self.budget_year}/{self.budget_month}, monthly_budget={self.monthly_budget})>"
