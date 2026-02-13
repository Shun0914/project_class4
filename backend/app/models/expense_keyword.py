"""ExpenseKeywordモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class ExpenseKeyword(Base):
    """支出-キーワード中間テーブル"""
    __tablename__ = "expense_keywords"

    expense_id = Column(Integer, ForeignKey("expenses.id"), primary_key=True)
    keyword_id = Column(Integer, ForeignKey("keywords.id"), primary_key=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    # リレーションシップ
    expense = relationship(
        "Expense", 
        back_populates="expense_keyword_relations",
        overlaps="expenses,keywords"
    )

    keyword = relationship(
        "Keyword", 
        back_populates="expense_keyword_relations",
        overlaps="expenses,keywords"
    )

    def __repr__(self):
        return f"<ExpenseKeyword(expense_id={self.expense_id}, keyword_id={self.keyword_id})>"
