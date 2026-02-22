# backend/seed_category.py
from app.db import engine
from sqlalchemy import text

def seed():
    # MySQLに直接初期データを書き込むSQL
    sql = text("""
        INSERT IGNORE INTO categories (id, name) 
        VALUES 
        (1, '食費'), 
        (2, '日用品'), 
        (3, '交通費'), 
        (4, 'その他')
    """)
    
    try:
        with engine.begin() as conn:
            conn.execute(sql)
        print("✅ カテゴリーデータの登録が大成功しました！")
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")

if __name__ == "__main__":
    seed()