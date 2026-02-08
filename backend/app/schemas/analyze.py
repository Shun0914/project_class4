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
    user: str
    total: int
    budget: int | None
    remaining: int | None
    remaining_rate: float | None
    pace_rate: float | None
    coach_type: str
    coach_message: str
    has_expenses: bool
    has_budget: bool
    weekly_report: WeeklyReport


class AIAnalyzeResponse(BaseModel):
    """AI分析APIレスポンス"""
    user: str
    total: int
    budget: int
    coach_type: str
    ai_message: str

