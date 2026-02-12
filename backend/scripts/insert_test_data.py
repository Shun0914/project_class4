"""テストデータ投入スクリプト"""
import sys
from pathlib import Path
from datetime import date, timedelta

sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget

def insert_test_data():
    """テストデータを投入"""
    db: Session = SessionLocal()
    
    try:
        # ユーザー作成
        user = User(username="しゅんすけ")
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"✓ ユーザー作成: {user.username} (ID: {user.id})")
        
        # 予算作成
        budget = Budget(user_id=user.id, monthly_budget=20000)
        db.add(budget)
        db.commit()
        print(f"✓ 予算設定: {budget.monthly_budget}円")
        
        # 支出データ作成（先週分）
        today = date.today()
        expenses_data = [
            ("コーヒー", 500, today - timedelta(days=1)),
            ("ランチ", 1200, today - timedelta(days=2)),
            ("書籍", 2500, today - timedelta(days=3)),
            ("交通費", 800, today - timedelta(days=4)),
            ("飲み会", 4000, today - timedelta(days=5)),
        ]
        
        for item, price, exp_date in expenses_data:
            expense = Expense(
                user_id=user.id,
                item=item,
                price=price,
                expense_date=exp_date
            )
            db.add(expense)
        
        db.commit()
        print(f"✓ 支出データ作成: {len(expenses_data)}件")
        print("\n投入完了！")
        
    except Exception as e:
        db.rollback()
        print(f"エラー: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    print("テストデータ投入中...\n")
    insert_test_data()
