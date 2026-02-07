"""分析API用スキーマ"""
from pydantic import BaseModel
from datetime import date
from typing import Optional


class WeeklyReport(BaseModel):
    """一週間レポート"""
    start_date: date
    end_date: date
    total: int
    count: int
    average: float


class AnalyzeResponse(BaseModel):
    """分析APIレスポンス"""
    user: str
    total: int
    budget: Optional[int]
    remaining: Optional[int]
    remaining_rate: Optional[float]
    pace_rate: Optional[float]
    coach_type: str
    coach_message: str
    weekly_report: WeeklyReport

class AIAnalyzeResponse(BaseModel):
    """AI分析APIレスポンス"""
    user: str
    total: int
    budget: int
    coach_type: str
    ai_message: str

