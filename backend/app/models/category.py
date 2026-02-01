"""Categoryモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class Category(Base):
    """カテゴリ（階層構造）"""
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    path = Column(String(500), nullable=True)
    level = Column(Integer, nullable=False, default=0)
    display_order = Column(Integer, nullable=False, default=0)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    # リレーションシップ
    parent = relationship("Category", remote_side=[id], backref="children")
    expenses = relationship("Expense", back_populates="category")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}', level={self.level})>"
