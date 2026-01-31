"""データベース接続設定"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

# データベース接続URLを環境変数から取得
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:password@localhost:3306/project_class4_db"
)

# SQLAlchemyエンジンを作成
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # 接続の有効性をチェック
    echo=False  # SQLクエリをログ出力するか（開発時はTrue推奨）
)

# セッション生成用のファクトリ
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースクラス（モデル定義で使用）
Base = declarative_base()


def get_db():
    """依存性注入用のDBセッション生成関数"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

