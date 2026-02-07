"""分析API"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta
from calendar import monthrange
from app.db import get_db
from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget
from app.schemas.analyze import AnalyzeResponse, WeeklyReport
from openai import AzureOpenAI
import os
from app.schemas.analyze import AnalyzeResponse, WeeklyReport, AIAnalyzeResponse


# OpenAI クライアント初期化
# クライアントは関数内で初期化
def get_azure_client():
    return AzureOpenAI(
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
    )



router = APIRouter(prefix="/api", tags=["analyze"])

def safe_divide(numerator, denominator):
    """安全な除算（Decimal/int対応）"""
    if denominator == 0:
        return 0.0
    return float(numerator) / float(denominator)



@router.get("/analyze", response_model=AnalyzeResponse)
def analyze(
    user: str = Query(..., description="ユーザー名"),
    coach: str = Query(..., description="コーチタイプ (oni/tenshi)"),
    db: Session = Depends(get_db)
):
    """分析API（コーチング）"""
    
    # ユーザー取得
    user_obj = db.query(User).filter(User.username == user).first()
    if not user_obj:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    
    # 今月の期間を計算
    today = date.today()
    days_in_month = monthrange(today.year, today.month)[1]
    days_remaining = days_in_month - today.day  # 今日を含まない残り日数
    
    # 今月の支出合計
    month_start = today.replace(day=1)
    month_end = today.replace(day=days_in_month)
    
    total = db.query(func.sum(Expense.price)).filter(
        Expense.user_id == user_obj.id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= month_end
    ).scalar() or 0
    
    # 予算取得
    budget_obj = db.query(Budget).filter(Budget.user_id == user_obj.id).first()
    budget = budget_obj.monthly_budget if budget_obj else None
    
    # 残金計算
    remaining = (budget - total) if budget else None
    remaining_rate = round(safe_divide(remaining, budget) * 100, 2) if budget else None


    
    # ペース率計算
    pace_rate = _calculate_pace_rate(remaining, days_remaining, budget, days_in_month)
    if pace_rate is not None and pace_rate != float('inf'):
        pace_rate = round(pace_rate, 3)
    
    # 一週間レポート
    end_date = today
    start_date = end_date - timedelta(days=7)
    
    weekly_expenses = db.query(Expense).filter(
        Expense.user_id == user_obj.id,
        Expense.expense_date >= start_date,
        Expense.expense_date <= end_date
    ).all()
    
    weekly_total = sum(e.price for e in weekly_expenses)
    weekly_count = len(weekly_expenses)
    weekly_average = round(weekly_total / weekly_count, 2) if weekly_count > 0 else 0.0
    
    # AIコーチングメッセージ生成
    coach_message = _generate_coach_message(
        coach=coach,
        budget=budget,
        remaining=remaining,
        days_remaining=days_remaining,
        pace_rate=pace_rate
    )
    
    return AnalyzeResponse(
        user=user,
        total=total,
        budget=budget,
        remaining=remaining,
        remaining_rate=remaining_rate,
        pace_rate=pace_rate,
        coach_type=coach,
        coach_message=coach_message,
        weekly_report=WeeklyReport(
            start_date=start_date,
            end_date=end_date,
            total=weekly_total,
            count=weekly_count,
            average=weekly_average
        )
    )


def _calculate_pace_rate(
    remaining: int | None,
    days_remaining: int,
    budget: int | None,
    days_in_month: int
) -> float | None:
    """
    ペース率を計算
    
    ペース率 = (残金 / 残り日数) / (月予算 / 月の総日数)
    
    1.0 = ちょうど予算通りのペース
    1.0超 = 余裕がある
    1.0未満 = 使いすぎペース
    """
    if budget is None or budget <= 0:
        return None
    if remaining is None:
        return None
    if remaining <= 0:
        return 0.0
    
    daily_budget = safe_divide(budget, days_in_month)
    
    # 残り0日の場合は特別処理（残金があれば成功）
    if days_remaining <= 0:
        return float('inf') if remaining > 0 else 0.0
    
    daily_remaining = safe_divide(remaining, days_remaining)

    return safe_divide(daily_remaining, daily_budget)


def _generate_coach_message(
    coach: str,
    budget: int | None,
    remaining: int | None,
    days_remaining: int,
    pace_rate: float | None
) -> str:
    """
    コーチングメッセージ生成（ペース率と残り日数を考慮）
    
    ペース率の目安:
    - 1.5以上: かなり余裕
    - 1.0〜1.5: 順調
    - 0.5〜1.0: やや使いすぎ
    - 0.5未満: 危険
    """
    emoji = "👹" if coach == "oni" else "👼"
    is_oni = coach == "oni"
    
    # 予算未設定
    if budget is None:
        if is_oni:
            return f"{emoji} 予算も設定せずに何をしている！まずは予算を決めろ！"
        return f"{emoji} まずは予算を設定してみよう！一緒に頑張ろうね"
    
    # 最終日（残り0日以下）
    if days_remaining <= 0:
        if remaining and remaining >= 0:
            if is_oni:
                return f"{emoji} 見事だ！予算内で乗り切ったな！"
            return f"{emoji} やったね！今月は予算内で過ごせたよ！"
        else:
            if is_oni:
                return f"{emoji} 予算オーバーで月末を迎えたな...来月は気合を入れろ！"
            return f"{emoji} 今月は予算オーバーしちゃったね...来月また頑張ろう！"
    
    # 予算オーバー（残金0以下）
    if remaining is None or remaining <= 0:
        if is_oni:
            return f"{emoji} 予算オーバーだ！残り{days_remaining}日、どうするつもりだ！"
        return f"{emoji} 予算を超えちゃったね...残り{days_remaining}日、節約頑張ろう"
    
    # ペース率に基づく判定
    if pace_rate is None:
        if is_oni:
            return f"{emoji} 状況を把握しろ！"
        return f"{emoji} 一緒に頑張ろうね！"
    
    # かなり余裕（ペース率1.5以上）
    if pace_rate >= 1.5:
        if is_oni:
            return f"{emoji} かなり余裕があるな。だが調子に乗るなよ！"
        return f"{emoji} すごい！とっても順調だよ！この調子！"
    
    # 順調（ペース率1.0〜1.5）
    if pace_rate >= 1.0:
        if is_oni:
            return f"{emoji} まあまあだな。油断せず続けろ！"
        return f"{emoji} いい感じ！このペースを維持しよう！"
    
    # やや使いすぎ（ペース率0.5〜1.0）
    if pace_rate >= 0.5:
        if is_oni:
            return f"{emoji} 少しペースが速いぞ！引き締めろ！"
        return f"{emoji} ちょっとだけペース早めかも。少し気をつけてね"
    
    # 危険（ペース率0.5未満）
    if is_oni:
        return f"{emoji} 危険だ！このままでは破綻するぞ！本気で節約しろ！"
    return f"{emoji} ちょっとピンチかも...一緒に節約頑張ろう！"

@router.get("/ai-analyze", response_model=AIAnalyzeResponse)
def ai_analyze(
    user: str = Query(..., description="ユーザー名"),
    coach: str = Query(..., description="コーチタイプ (oni/tenshi)"),
    db: Session = Depends(get_db)
):
    """AI分析API（OpenAI統合）"""
    
    user_obj = db.query(User).filter(User.username == user).first()
    if not user_obj:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    
    # 今月の支出合計
    today = date.today()
    month_start = today.replace(day=1)
    days_in_month = monthrange(today.year, today.month)[1]
    month_end = today.replace(day=days_in_month)
    
    total = db.query(func.sum(Expense.price)).filter(
        Expense.user_id == user_obj.id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= month_end
    ).scalar() or 0
    
    budget_obj = db.query(Budget).filter(Budget.user_id == user_obj.id).first()
    if not budget_obj:
        raise HTTPException(status_code=400, detail="予算が設定されていません")
    
    budget = budget_obj.monthly_budget
    
    # OpenAI API呼び出し
    ai_message = _generate_ai_analysis(coach, total, budget)
    
    return AIAnalyzeResponse(
        user=user,
        total=total,
        budget=budget,
        coach_type=coach,
        ai_message=ai_message
    )


def _generate_ai_analysis(coach: str, total: int, budget: int) -> str:
    """OpenAI APIによるAI分析"""
    
    instructions = """
あなたは20年以上の経験を持つ優秀なファイナンシャルプランナーです。
ユーザーの目標を達成するために必要な指導を具体的に提示してください。

* 分析内容
- 目標支出金額と現在の支出額を比較し、目標とどれだけ差があるか確認する
- 目標からオーバーしてしまった場合は、辛口で指導する
- 目標から遠い場合も厳しく指導する

* トーン
"""
    
    if coach == "oni":
        instructions += "- 全体的に厳しい口調でユーザーに接する\n- 忖度なしで意見を述べる"
    else:
        instructions += "- 優しく励ます口調でユーザーに接する\n- ポジティブなアドバイスを心がける"
    
    input_text = f"""
目標支出額{budget:,}円に対して、今月{total:,}円使用しています。
目標支出額内に抑えられるための具体例を3つ提示してください。
"""
    
    try:
        client = get_azure_client()
        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
            messages=[
                {"role": "system", "content": instructions},
                {"role": "user", "content": input_text}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"AI分析でエラーが発生しました: {str(e)}"
