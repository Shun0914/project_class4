# backend/app/models/__init__.py
from app.db import Base  # 必要に応じてBaseもここから呼べるようにする

from .user import User
from .category import Category
from .expense import Expense
from .budget import Budget
from .expense_evaluation import ExpenseEvaluation
from .keyword import Keyword
from .expense_keyword import ExpenseKeyword
from .receipt_image import ReceiptImage
from .detection_history import DetectionHistory
from .history_subscription import HistorySubscription

# Alembicや他のモジュールで「from app.models import *」をした時に
# 読み込まれる対象を明示的に指定
__all__ = [
    "Base",
    "User",
    "Category",
    "Expense",
    "Budget",
    "ExpenseEvaluation",
    "Keyword",
    "ExpenseKeyword",
    "ReceiptImage",
    "DetectionHistory",
    "HistorySubscription",
]
