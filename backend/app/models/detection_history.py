"""DetectionHistoryモデル（テーブル定義.md 準拠）"""
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class DetectionHistory(Base):
    """明細書解析履歴"""
    __tablename__ = "detection_histories"

    id = Column(String(36), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    uploaded_files_count = Column(Integer, nullable=False)
    detected_subscriptions_count = Column(Integer, nullable=False, default=0)
    total_monthly_amount = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    # リレーションシップ
    user = relationship("User", back_populates="detection_histories")
    subscriptions = relationship("HistorySubscription", back_populates="detection_history")

    def __repr__(self):
        return f"<DetectionHistory(id='{self.id}', user_id={self.user_id})>"
