"""ReceiptImageモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class ReceiptImage(Base):
    """レシート画像（AI解析結果保存用）"""
    __tablename__ = "receipt_images"

    id = Column(Integer, primary_key=True, autoincrement=True)
    expense_id = Column(Integer, ForeignKey("expenses.id"), nullable=True)
    file_path = Column(String(500), nullable=False)
    storage_url = Column(String(500), nullable=True)
    analyzed_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    # リレーションシップ
    expense = relationship("Expense", back_populates="receipt_images")

    def __repr__(self):
        return f"<ReceiptImage(id={self.id}, expense_id={self.expense_id})>"
