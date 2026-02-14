#!/usr/bin/env python3
"""
Azure DB にテストユーザーを手動投入するスクリプト。

使い方:
  DATABASE_URL="mysql+pymysql://..." PYTHONPATH=. python scripts/insert_azure_test_user.py
"""
import sys
from pathlib import Path
from datetime import date, timedelta

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget


def insert_azure_test_user():
    """Azure DB にテストユーザー・予算・支出を投入"""
    db: Session = SessionLocal()

    try:
        # ユーザー作成
        user = User(username="test_user_azure@example.com")
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"✓ ユーザー作成: {user.username} (ID: {user.id})")

        # 予算作成
        budget = Budget(user_id=user.id, monthly_budget=20000)
        db.add(budget)
        db.commit()
        print(f"✓ 予算設定: {budget.monthly_budget}円")

        # 支出データ作成（category_id は NULL）
        today = date.today()
        expenses_data = [
            ("コーヒー", 500, today - timedelta(days=1)),
            ("ランチ", 1200, today - timedelta(days=2)),
            ("書籍", 2500, today - timedelta(days=3)),
        ]
        for item, price, exp_date in expenses_data:
            expense = Expense(
                user_id=user.id,
                item=item,
                price=price,
                expense_date=exp_date,
                helpful_count=0,
                helpfulness_score=0,
            )
            db.add(expense)
        db.commit()
        print(f"✓ 支出データ作成: {len(expenses_data)}件")

        print(f"\n投入完了！ user_id={user.id}")
        print(f"トークン発行: python scripts/generate_test_token.py --user-id {user.id}")

    except Exception as e:
        db.rollback()
        print(f"エラー: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    print("Azure DB にテストユーザーを投入中...\n")
    insert_azure_test_user()
