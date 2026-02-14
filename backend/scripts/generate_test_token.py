#!/usr/bin/env python3
"""
OAuth をバイパスしてテスト用 JWT を発行するスクリプト。

使い方:
  # DB からユーザーを検索してトークン発行（ローカル DB 接続が必要）
  python scripts/generate_test_token.py
  python scripts/generate_test_token.py --username しゅんすけ

  # user_id を指定してトークン発行（DB 不要。Azure 等の既存ユーザー ID が分かっている場合）
  python scripts/generate_test_token.py --user-id 1

発行したトークンで API をテスト:
  curl -H "Authorization: Bearer <TOKEN>" https://tech0-gen-11-step3-2-py-67.azurewebsites.net/api/auth/me
  curl -H "Authorization: Bearer <TOKEN>" https://tech0-gen-11-step3-2-py-67.azurewebsites.net/api/analyze
"""
import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from app.core.security import create_access_token
from app.core.config import SECRET_KEY


def main():
    parser = argparse.ArgumentParser(description="テスト用 JWT を発行")
    parser.add_argument("--user-id", type=int, help="ユーザー ID（DB 不要でトークン発行）")
    parser.add_argument("--username", type=str, help="ユーザー名（DB から検索）")
    parser.add_argument("--base-url", type=str, default="https://tech0-gen-11-step3-2-py-67.azurewebsites.net",
                        help="API のベース URL（curl 例用）")
    args = parser.parse_args()

    user_id = args.user_id

    if user_id is None:
        if args.username:
            from app.db import SessionLocal
            from app.models.user import User
            db = SessionLocal()
            try:
                user = db.query(User).filter(User.username == args.username).first()
                if not user:
                    print(f"エラー: ユーザー '{args.username}' が見つかりません")
                    sys.exit(1)
                user_id = user.id
                print(f"ユーザー: {user.username} (ID: {user_id})")
            finally:
                db.close()
        else:
            from app.db import SessionLocal
            from app.models.user import User
            db = SessionLocal()
            try:
                user = db.query(User).first()
                if not user:
                    print("エラー: DB にユーザーが存在しません。insert_test_data.py を実行するか --user-id を指定してください")
                    sys.exit(1)
                user_id = user.id
                print(f"最初のユーザー: {user.username} (ID: {user_id})")
            finally:
                db.close()

    token = create_access_token(data={"sub": str(user_id)})
    print(f"\n=== テスト用トークン (user_id={user_id}) ===\n")
    print(token)
    print(f"\n=== curl 例 ===\n")
    print(f'curl -H "Authorization: Bearer {token}" {args.base_url}/api/auth/me')
    print(f'curl -H "Authorization: Bearer {token}" {args.base_url}/api/analyze')
    print(f'curl -H "Authorization: Bearer {token}" {args.base_url}/api/ai-analyze')
    print(f"\n※ Azure API をテストする場合、JWT_SECRET_KEY が Azure の環境変数と一致している必要があります")
    print(f"※ user_id={user_id} のユーザーが対象 DB に存在する必要があります")


if __name__ == "__main__":
    main()
