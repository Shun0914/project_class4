"""ExpenseEvaluationモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class ExpenseEvaluation(Base):
    """支出評価（役立ったか）"""
    __tablename__ = "expense_evaluations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    expense_id = Column(Integer, ForeignKey("expenses.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_helpful = Column(Boolean, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    __table_args__ = (
        UniqueConstraint("expense_id", "user_id", name="uk_expense_user_evaluation"),
    )

    # リレーションシップ
    expense = relationship("Expense", back_populates="expense_evaluations")
    user = relationship("User", back_populates="expense_evaluations")

    def __repr__(self):
        return f"<ExpenseEvaluation(expense_id={self.expense_id}, user_id={self.user_id}, is_helpful={self.is_helpful})>"
