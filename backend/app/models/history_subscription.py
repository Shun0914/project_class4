"""HistorySubscriptionモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, String, Integer, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base


class HistorySubscription(Base):
    """検出履歴内のサブスクリプション"""
    __tablename__ = "history_subscriptions"

    id = Column(String(36), primary_key=True)
    detection_history_id = Column(String(36), ForeignKey("detection_histories.id"), nullable=False)
    name = Column(String(255), nullable=False)
    monthly_price = Column(Integer, nullable=True)
    yearly_price = Column(Integer, nullable=True)
    category = Column(String(100), nullable=True)
    canceled = Column(Boolean, nullable=False, default=False)
    confidence = Column(Float, nullable=True)
    official_url = Column(String(500), nullable=True)
    cancel_url = Column(String(500), nullable=True)
    raw_merchant = Column(String(500), nullable=True)
    is_yearly_detected = Column(Boolean, nullable=False, default=False)

    # リレーションシップ
    detection_history = relationship("DetectionHistory", back_populates="subscriptions")

    def __repr__(self):
        return f"<HistorySubscription(id='{self.id}', name='{self.name}')>"
