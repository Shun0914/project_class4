# backend/seed.py
# データベースに初期データを投入するスクリプト

from app.db import SessionLocal, engine
from app.models.user import User
from app.models.category import Category
from app.models.expense import Expense

def seed_data():
    print("Creating tables if they don't exist...")
    User.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # --- 1. テストユーザー(ID:1)の作成 ---
        user = db.query(User).filter(User.id == 1).first()
        if not user:
            print("Creating test user (ID: 1)...")
            
            dummy_hashed_password = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"
            
            test_user = User(
                id=1,
                username="testuser",
                password_hash=dummy_hashed_password,
                # email はモデルにないので削除済み
            )
            db.add(test_user)
            db.commit()
        else:
            print("Test user (ID: 1) already exists.")

        # --- 2. テストカテゴリ(ID:1)の作成 ---
        category = db.query(Category).filter(Category.id == 1).first()
        if not category:
            print("Creating test category (ID: 1)...")
            test_category = Category(
                id=1,
                name="食費",
                # user_id=1  <-- これがエラー原因だったので削除！
            )
            db.add(test_category)
            db.commit()
        else:
            print("Test category (ID: 1) already exists.")
            
        print("✅ データの準備が完了しました！")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()