"""認証関連の設定"""
import os
from dotenv import load_dotenv

load_dotenv()

# JWT設定
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24時間

# Google OAuth設定
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
