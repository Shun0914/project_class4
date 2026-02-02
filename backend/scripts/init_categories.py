"""カテゴリマスターデータ投入スクリプト（テーブル定義.md 準拠）"""
import sys
import os

# プロジェクトのルートディレクトリをパスに追加
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db import SessionLocal, engine, Base
from app.models import Category
from datetime import datetime


def init_categories():
    """家計簿用カテゴリマスターデータを投入"""
    # テーブルが存在することを確認
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # 既存データをチェック
        existing_count = db.query(Category).count()
        if existing_count > 0:
            print(f"既に{existing_count}件のカテゴリデータが存在します。")
            response = input("既存データを削除して再投入しますか？ (y/N): ")
            if response.lower() == 'y':
                db.query(Category).delete()
                db.commit()
                print("既存データを削除しました。")
            else:
                print("処理を中止しました。")
                return

        # 家計簿用カテゴリデータ（まっちゃんウォレット用）
        categories_data = [
            # L1: 生活費
            {"id": 1, "name": "食費", "parent_id": None, "level": 1, "path": "1", "display_order": 1},
            {"id": 2, "name": "交通費", "parent_id": None, "level": 1, "path": "2", "display_order": 2},
            {"id": 3, "name": "住居費", "parent_id": None, "level": 1, "path": "3", "display_order": 3},
            {"id": 4, "name": "光熱費", "parent_id": None, "level": 1, "path": "4", "display_order": 4},
            {"id": 5, "name": "通信費", "parent_id": None, "level": 1, "path": "5", "display_order": 5},
            {"id": 6, "name": "娯楽費", "parent_id": None, "level": 1, "path": "6", "display_order": 6},
            {"id": 7, "name": "書籍・教育", "parent_id": None, "level": 1, "path": "7", "display_order": 7},
            {"id": 8, "name": "医療費", "parent_id": None, "level": 1, "path": "8", "display_order": 8},
            {"id": 9, "name": "被服費", "parent_id": None, "level": 1, "path": "9", "display_order": 9},
            {"id": 10, "name": "その他", "parent_id": None, "level": 1, "path": "10", "display_order": 10},
        ]

        # データを投入
        for cat_data in categories_data:
            category = Category(
                id=cat_data["id"],
                name=cat_data["name"],
                parent_id=cat_data["parent_id"],
                level=cat_data["level"],
                path=cat_data["path"],
                display_order=cat_data["display_order"],
                is_active=True,
                created_at=datetime.now()
            )
            db.add(category)

        db.commit()
        print(f"✅ {len(categories_data)}件のカテゴリデータを投入しました。")

        # 投入結果を確認
        count = db.query(Category).count()
        print(f"📊 データベース内のカテゴリ数: {count}件")

    except Exception as e:
        db.rollback()
        print(f"❌ エラーが発生しました: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("カテゴリマスターデータを投入します...")
    init_categories()
    print("完了しました。")
