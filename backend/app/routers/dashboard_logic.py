from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import date, timedelta
from app.models.budget import Budget
from app.models.expense import Expense
from app.models.category import Category

def get_summary_data(db: Session, user_id: int, year: int, month: int):
    """
    ユーザーごとの予算・支出を集計し、ダッシュボード用のデータを構築する関数。
    """

    # --- 1. 予算の取得 ---
    # 指定された年月に対応する予算レコードを検索
    budget_record = db.query(Budget).filter(
        Budget.user_id == user_id,
        Budget.budget_year == year,
        Budget.budget_month == month
    ).first()
    # 予算が未設定の場合は 0 をデフォルト値とする
    total_budget = budget_record.monthly_budget if budget_record else 0

    # --- 2. 支出合計の取得 ---
    # 特定のユーザーおよび年月における全支出の合計金額を算出
    total_spent = db.query(func.sum(Expense.price)).filter(
        Expense.user_id == user_id,
        extract('year', Expense.expense_date) == year,
        extract('month', Expense.expense_date) == month
    ).scalar() or 0

    # --- 3. カテゴリ別集計（リレーションがある支出） ---
    # カテゴリ名でグループ化し、それぞれの支出合計を算出
    category_data = db.query(
        Category.id,
        Category.name,
        func.sum(Expense.price).label("amount")
    ).join(Expense, Category.id == Expense.category_id)\
    .filter(
        Expense.user_id == user_id,
        extract('year', Expense.expense_date) == year,
        extract('month', Expense.expense_date) == month
    ).group_by(Category.id).all()

    # --- 4. 未分類の集計 ---
    # category_id が NULL になっている支出を個別に集計
    unclassified_spent = db.query(func.sum(Expense.price)).filter(
        Expense.user_id == user_id,
        Expense.category_id == None,
        extract('year', Expense.expense_date) == year,
        extract('month', Expense.expense_date) == month
    ).scalar() or 0

    # フロントエンドへ返すカテゴリリストを構築
    categories = [{"id": c.id, "name": c.name, "amount": c.amount} for c in category_data]
    if unclassified_spent > 0:
        categories.append({"id": None, "name": "未分類", "amount": unclassified_spent})

    # --- 5. ステータス判定ロジック ---
    today = date.today()
    # 対象月の最終日を算出（翌月1日の1日前）
    if month == 12:
        last_day = date(year, 12, 31)
    else:
        last_day = date(year, month + 1, 1) - timedelta(days=1)

    # ステータスの決定:
    # - unconfigured: 予算未設定
    # - over: 予算超過（月が終わっているかは問わない）
    # - achieved: 月が終了し、かつ予算内に収まった
    # - in_progress: 月の途中で、かつ予算内
    if total_budget == 0:
        status = "unconfigured"
    elif total_spent > total_budget:
        status = "over"
    elif today > last_day:
        status = "achieved"
    else:
        status = "in_progress"

    return {
        "total_budget": total_budget,
        "total_spent": total_spent,
        "status": status,
        "remaining_amount": max(0, total_budget - total_spent),
        "categories": categories
    }