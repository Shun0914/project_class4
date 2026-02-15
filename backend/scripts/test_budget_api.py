#!/usr/bin/env python3
"""
予算API（GET /api/budget, PUT /api/budget）の動作確認スクリプト。

ローカルまたは Azure にデプロイした API に対して、同一の認証・DB 前提で
予算の「未設定時 404」「作成」「取得」「更新」を検証する。

使い方:
  # トークンを指定（推奨: generate_test_token.py で発行）
  python scripts/test_budget_api.py --base-url http://localhost:8000 --token <JWT>
  python scripts/test_budget_api.py --base-url https://tech0-gen-11-step3-2-py-67.azurewebsites.net --token <JWT>

  # user_id を指定するとトークンを自前発行（DB は使わない。API 側の DB にその user がいる必要あり）
  python scripts/test_budget_api.py --base-url http://localhost:8000 --user-id 1
"""
import argparse
import sys
from pathlib import Path

import requests

# テスト対象の年月（重複しにくいように固定）
TEST_YEAR = 2026
TEST_MONTH = 2


def get_token_for_user_id(user_id: int) -> str:
    """プロジェクトの create_access_token でトークン発行（JWT_SECRET_KEY 要一致）"""
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
    from app.core.security import create_access_token
    return create_access_token(data={"sub": str(user_id)})


def main() -> None:
    parser = argparse.ArgumentParser(description="予算APIの動作確認")
    parser.add_argument("--base-url", type=str, default="http://localhost:8000", help="API のベース URL")
    parser.add_argument("--token", type=str, help="Bearer トークン（未指定時は --user-id で発行）")
    parser.add_argument("--user-id", type=int, default=1, help="トークン発行用 user_id（--token 未指定時）")
    args = parser.parse_args()

    base = args.base_url.rstrip("/")
    if args.token:
        token = args.token
    else:
        token = get_token_for_user_id(args.user_id)
        print(f"発行したトークン (user_id={args.user_id}) でリクエストします")

    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    session = requests.Session()
    session.headers.update(headers)

    ok = 0
    ng = 0

    # --- 1. 未設定時 GET → 404
    print(f"\n1. GET /api/budget?year={TEST_YEAR}&month={TEST_MONTH} （未設定想定）")
    r = session.get(f"{base}/api/budget", params={"year": TEST_YEAR, "month": TEST_MONTH})
    if r.status_code == 404:
        print("   → 404 OK（予算が設定されていません）")
        ok += 1
    else:
        print(f"   → 期待 404, 実際 {r.status_code} body={r.text[:200]}")
        ng += 1

    # --- 2. PUT で作成
    print(f"\n2. PUT /api/budget 作成（{TEST_YEAR}年{TEST_MONTH}月 30,000円）")
    payload = {"budget_year": TEST_YEAR, "budget_month": TEST_MONTH, "monthly_budget": 30000}
    r = session.put(f"{base}/api/budget", json=payload)
    if r.status_code in (200, 201):
        data = r.json()
        if data.get("monthly_budget") == 30000 and data.get("budget_year") == TEST_YEAR and data.get("budget_month") == TEST_MONTH:
            print("   → 200 OK, 作成レスポンス内容一致")
            ok += 1
        else:
            print(f"   → 200 だが内容不一致: {data}")
            ng += 1
    else:
        print(f"   → 期待 200/201, 実際 {r.status_code} body={r.text[:300]}")
        ng += 1

    # --- 3. GET で取得
    print(f"\n3. GET /api/budget?year={TEST_YEAR}&month={TEST_MONTH}")
    r = session.get(f"{base}/api/budget", params={"year": TEST_YEAR, "month": TEST_MONTH})
    if r.status_code == 200:
        data = r.json()
        if data.get("monthly_budget") == 30000:
            print("   → 200 OK, 30,000円で取得")
            ok += 1
        else:
            print(f"   → 200 だが monthly_budget 不一致: {data}")
            ng += 1
    else:
        print(f"   → 期待 200, 実際 {r.status_code} body={r.text[:200]}")
        ng += 1

    # --- 4. PUT で更新
    print(f"\n4. PUT /api/budget 更新（25,000円に変更）")
    payload = {"budget_year": TEST_YEAR, "budget_month": TEST_MONTH, "monthly_budget": 25000}
    r = session.put(f"{base}/api/budget", json=payload)
    if r.status_code == 200:
        data = r.json()
        if data.get("monthly_budget") == 25000:
            print("   → 200 OK, 更新レスポンス 25,000円")
            ok += 1
        else:
            print(f"   → 200 だが monthly_budget 不一致: {data}")
            ng += 1
    else:
        print(f"   → 期待 200, 実際 {r.status_code} body={r.text[:200]}")
        ng += 1

    # --- 5. GET で再取得
    print(f"\n5. GET 再取得（25,000円）")
    r = session.get(f"{base}/api/budget", params={"year": TEST_YEAR, "month": TEST_MONTH})
    if r.status_code == 200 and r.json().get("monthly_budget") == 25000:
        print("   → 200 OK")
        ok += 1
    else:
        print(f"   → 失敗 status={r.status_code} body={r.text[:200]}")
        ng += 1

    # --- バリデーション（400）の簡易チェック
    print("\n6. PUT 不正値（month=13）→ 422 想定")
    r = session.put(f"{base}/api/budget", json={"budget_year": TEST_YEAR, "budget_month": 13, "monthly_budget": 10000})
    if r.status_code == 422:
        print("   → 422 OK（バリデーションエラー）")
        ok += 1
    else:
        print(f"   → 期待 422, 実際 {r.status_code}")
        ng += 1

    print(f"\n--- 結果: {ok} OK, {ng} NG ---")
    if ng > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
