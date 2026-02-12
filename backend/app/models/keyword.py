"""Keywordモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class Keyword(Base):
    """キーワードマスター"""
    __tablename__ = "keywords"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    normalized_name = Column(String(255), nullable=False, index=True)
    usage_count = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    # リレーションシップ
    expenses = relationship("Expense", secondary="expense_keywords", back_populates="keywords")
    expense_keyword_relations = relationship(
    "ExpenseKeyword", 
    back_populates="keyword",
    overlaps="expenses,keywords"
)

    def __repr__(self):
        return f"<Keyword(id={self.id}, name='{self.name}', normalized_name='{self.normalized_name}')>"
