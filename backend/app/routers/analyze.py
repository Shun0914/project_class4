"""分析API"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import date, timedelta
from calendar import monthrange
from app.db import get_db
from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget
from app.models.category import Category
from app.schemas.analyze import AnalyzeResponse, WeeklyReport, AIAnalyzeResponse
from app.core.security import get_current_user
from openai import AzureOpenAI
from dotenv import load_dotenv
import os

load_dotenv()


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

def _get_monthly_expense_data(user_id: int, db: Session) -> tuple[int, int | None]:
    """月次支出データと予算を取得"""
    today = date.today()
    month_start = today.replace(day=1)
    days_in_month = monthrange(today.year, today.month)[1]
    month_end = today.replace(day=days_in_month)
    
    total = db.query(func.sum(Expense.price)).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= month_end
    ).scalar() or 0
    
    budget_obj = db.query(Budget).filter(
        Budget.user_id == user_id,
        Budget.budget_year == today.year,
        Budget.budget_month == today.month,
    ).first()
    budget = budget_obj.monthly_budget if budget_obj else None
    
    return total, budget

def _calculate_fixed_week_of_year(today: date) -> tuple[date, date]:
    """
    年間で固定された1週間を計算
    
    ルール:
    - 1年を7日単位で区切る（1/1-1/7, 1/8-1/14, ...）
    - 今日が属する週を返す
    
    例:
    - 2026/02/09 → 2026/02/08-2026/02/14 (第6週)
    - 2026/02/01 → 2026/01/26-2026/02/01 (第4週)
    """
    # 年初（1月1日）
    year_start = date(today.year, 1, 1)
    
    # 年初からの経過日数
    days_since_year_start = (today - year_start).days
    
    # 何週目か（0始まり）
    week_number = days_since_year_start // 7
    
    # その週の開始日と終了日
    week_start = year_start + timedelta(days=week_number * 7)
    week_end = week_start + timedelta(days=6)
    
    # 年をまたぐ場合の調整（12月末）
    year_end = date(today.year, 12, 31)
    if week_end > year_end:
        week_end = year_end
    
    return week_start, week_end



@router.get("/analyze", response_model=AnalyzeResponse)
def analyze(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """分析API（コーチング）"""
    
    coach = current_user.coach_mode
    total, budget = _get_monthly_expense_data(current_user.id, db)
    
    today = date.today()
    days_in_month = monthrange(today.year, today.month)[1]
    days_remaining = days_in_month - today.day
    
    # エンプティ状態チェック
    has_expenses = total > 0
    has_budget = budget is not None
    
    # 残金計算
    remaining = (budget - total) if budget else None
    remaining_rate = round(safe_divide(remaining, budget) * 100, 2) if budget else None
    
    # ペース率計算
    pace_rate = _calculate_pace_rate(remaining, days_remaining, budget, days_in_month)
    if pace_rate is not None and pace_rate != float('inf'):
        pace_rate = round(pace_rate, 3)
    
    # 一週間レポート（今日より一つ前の固定週）
    current_week_start, current_week_end = _calculate_fixed_week_of_year(today)
    
    # 一つ前の週を計算
    previous_week_end = current_week_start - timedelta(days=1)
    previous_week_start = previous_week_end - timedelta(days=6)
    
    weekly_expenses = db.query(Expense).filter(
        Expense.user_id == current_user.id,
        Expense.expense_date >= previous_week_start,
        Expense.expense_date <= previous_week_end
    ).all()
    
    start_date = previous_week_start
    end_date = previous_week_end
    
    weekly_total = sum(e.price for e in weekly_expenses)
    weekly_count = len(weekly_expenses)
    weekly_average = round(weekly_total / weekly_count, 2) if weekly_count > 0 else 0.0
    
    # 一つ前の週の最終日時点のコーチメッセージを取得
    weekly_month_start = previous_week_end.replace(day=1)
    weekly_days_in_month = monthrange(previous_week_end.year, previous_week_end.month)[1]
    weekly_month_end = previous_week_end.replace(day=weekly_days_in_month)
    weekly_days_remaining = weekly_days_in_month - previous_week_end.day
    
    weekly_month_total = db.query(func.sum(Expense.price)).filter(
        Expense.user_id == current_user.id,
        Expense.expense_date >= weekly_month_start,
        Expense.expense_date <= previous_week_end
    ).scalar() or 0
    
    weekly_remaining = (budget - weekly_month_total) if budget else None
    weekly_pace_rate = _calculate_pace_rate(weekly_remaining, weekly_days_remaining, budget, weekly_days_in_month)
    if weekly_pace_rate is not None and weekly_pace_rate != float('inf'):
        weekly_pace_rate = round(weekly_pace_rate, 3)
    
    weekly_coach_message = _generate_coach_message(
        coach=coach,
        budget=budget,
        remaining=weekly_remaining,
        days_remaining=weekly_days_remaining,
        pace_rate=weekly_pace_rate,
        has_expenses=weekly_month_total > 0,
        has_budget=has_budget
    )
    
    # AIコーチングメッセージ生成（エンプティ状態を考慮）
    coach_message = _generate_coach_message(
        coach=coach,
        budget=budget,
        remaining=remaining,
        days_remaining=days_remaining,
        pace_rate=pace_rate,
        has_expenses=has_expenses,
        has_budget=has_budget
    )
    
    return AnalyzeResponse(
        user=current_user.username,
        total=total,
        budget=budget,
        remaining=remaining,
        remaining_rate=remaining_rate,
        pace_rate=pace_rate,
        coach_mode=coach,
        coach_message=coach_message,
        has_expenses=has_expenses,  # エンプティ状態フラグ
        has_budget=has_budget,      # エンプティ状態フラグ
        weekly_report=WeeklyReport(
            start_date=start_date,
            end_date=end_date,
            total=weekly_total,
            count=weekly_count,
            average=weekly_average,
            coach_message=weekly_coach_message
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
    pace_rate: float | None,
    has_expenses: bool,
    has_budget: bool
) -> str:
    """
    コーチングメッセージ生成（エンプティ状態を考慮）
    """
    emoji = "😈" if coach == "devil" else "👼"
    is_oni = coach == "devil"
    
    # エンプティ状態: 予算も支出もない
    if not has_budget and not has_expenses:
        if is_oni:
            return f"{emoji} 何も始まっていないぞ！まずは予算を設定して支出を記録しろ！"
        return f"{emoji} まずは予算を設定して、支出を記録してみよう！"
    
    # エンプティ状態: 予算はあるが支出がない
    if has_budget and not has_expenses:
        if is_oni:
            return f"{emoji} 予算は設定したな。さあ、支出を記録し始めろ！"
        return f"{emoji} 予算が設定されたね！支出を記録して管理を始めよう！"
    
    # エンプティ状態: 支出はあるが予算がない
    if not has_budget and has_expenses:
        if is_oni:
            return f"{emoji} 支出だけ記録して予算がないとは...まずは予算を決めろ！"
        return f"{emoji} 支出を記録してるね！予算も設定すると管理しやすくなるよ！"
    
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """AI分析API（OpenAI統合）"""
    
    coach = current_user.coach_mode
    total, budget = _get_monthly_expense_data(current_user.id, db)
    
    if budget is None:
        raise HTTPException(status_code=400, detail="予算が設定されていません")
    
    ai_message = _generate_ai_analysis(coach, total, budget, current_user.id, db)

    return AIAnalyzeResponse(
        user=current_user.username,
        total=total,
        budget=budget,
        coach_mode=coach,
        ai_message=ai_message
    )


def _generate_ai_analysis(coach: str, total: int, budget: int, user_id: int, db: Session) -> str:
    """OpenAI APIによるAI分析"""
    today = date.today()
    month_start = today.replace(day=1)
    days_in_month = monthrange(today.year, today.month)[1]
    month_end = today.replace(day=days_in_month)

    # カテゴリ別支出を取得
    category_data = db.query(
        case(
            (Category.name.isnot(None), Category.name),
            else_="未分類"
        ).label("category_name"),
        func.sum(Expense.price).label("category_total")
    ).outerjoin(Category, Expense.category_id == Category.id).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= month_end
    ).group_by(Category.name).order_by(func.sum(Expense.price).desc()).all()

    # 対象月の支出履歴をすべて取得
    recent_expenses = db.query(Expense).outerjoin(
        Category, Expense.category_id == Category.id
    ).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= month_end
    ).order_by(Expense.expense_date.desc(), Expense.created_at.desc()).all()

    instructions = """
あなたは20年以上の経験を持つ優秀なファイナンシャルプランナーです。
ユーザーの目標を達成するために必要な指導を具体的に提示してください。

* 分析内容
- 目標支出金額と現在の支出額を比較し、目標とどれだけ差があるか確認する
- カテゴリ別の支出割合を分析し、どのカテゴリに削減余地があるか具体的に指摘する
- 直近の支出履歴から支出パターンや傾向を読み取り、改善ポイントを提示する
- 目標からオーバーしてしまった場合は、辛口で指導する

* トーン
"""

    if coach == "devil":
        instructions += "- 全体的に厳しい口調でユーザーに接する\n- 忖度なしで意見を述べる"
    else:
        instructions += "- 優しく励ます口調でユーザーに接する\n- ポジティブなアドバイスを心がける"

    # カテゴリ別支出テキスト
    category_lines = ""
    if category_data:
        category_lines = "\n【カテゴリ別支出】\n"
        for row in category_data:
            category_lines += f"- {row.category_name}: {int(row.category_total):,}円\n"

    # 直近の支出履歴テキスト
    history_lines = ""
    if recent_expenses:
        history_lines = "\n【今月の支出履歴】\n"
        for e in recent_expenses:
            cat_name = e.category.name if e.category else "未分類"
            history_lines += f"- {e.expense_date.strftime('%m/%d')} {e.item} {e.price:,}円（{cat_name}）\n"

    input_text = f"""
目標支出額{budget:,}円に対して、今月{total:,}円使用しています。
{category_lines}{history_lines}
上記の支出パターンを踏まえ、目標支出額内に抑えるための具体的なアドバイスを3つ提示してください。
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
