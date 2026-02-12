"""DB確認用スクリプト"""
from sqlalchemy import text
from app.db import engine

def check_users():
    """usersテーブルの中身を確認"""
    with engine.connect() as conn:
        # usersテーブルの全データ取得
        result = conn.execute(text("SELECT * FROM users"))
        users = result.fetchall()
        
        print("=== usersテーブル ===")
        if not users:
            print("データが存在しません")
        else:
            for user in users:
                print(f"ID: {user[0]}, Username: {user[1]}, Created: {user[2]}")
        
        print(f"\n合計: {len(users)}件")

def check_expenses():
    """expensesテーブルの中身を確認"""
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM expenses LIMIT 10"))
        expenses = result.fetchall()
        
        print("\n=== expensesテーブル（最新10件） ===")
        if not expenses:
            print("データが存在しません")
        else:
            for exp in expenses:
                print(f"ID: {exp[0]}, User: {exp[1]}, Item: {exp[2]}, Price: {exp[3]}")
        
        # 件数確認
        count = conn.execute(text("SELECT COUNT(*) FROM expenses")).scalar()
        print(f"\n合計: {count}件")

def check_budgets():
    """budgetsテーブルの中身を確認"""
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM budgets"))
        budgets = result.fetchall()
        
        print("\n=== budgetsテーブル ===")
        if not budgets:
            print("データが存在しません")
        else:
            for budget in budgets:
                print(f"ID: {budget[0]}, User: {budget[1]}, Budget: {budget[2]}")
        
        print(f"\n合計: {len(budgets)}件")

if __name__ == "__main__":
    try:
        check_users()
        check_expenses()
        check_budgets()
    except Exception as e:
        print(f"エラー: {e}")
