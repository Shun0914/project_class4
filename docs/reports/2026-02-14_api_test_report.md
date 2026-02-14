# API 動作確認・テスト作業レポート（2026-02-14）

## 概要

Azure デプロイ環境における API の動作確認を実施した。OAuth（Google ログイン）が未動作のため、テスト用 JWT トークンを用いて全エンドポイントを検証した。

---

## 実施内容

### 1. 課題の整理

- **OAuth 未動作**: Google ログインが動作しておらず、認証付き API を直接テストできない
- **Azure DB が空**: users テーブルにデータがなく、トークン検証時に 401 が返る状態

### 2. 対応策の実装

#### 2.1 テスト用トークン発行スクリプト

**ファイル**: `backend/scripts/generate_test_token.py`

OAuth をバイパスし、指定した user_id で JWT を発行するスクリプトを作成。

```bash
# 使い方
python scripts/generate_test_token.py --user-id 1
python scripts/generate_test_token.py --username しゅんすけ  # DB から検索
```

#### 2.2 Azure DB 確認スクリプトの利用

**ファイル**: `backend/scripts/check_db.py`（既存）

`DATABASE_URL` を Azure の接続文字列に設定して実行することで、Azure DB の内容を確認可能。

```bash
DATABASE_URL="mysql+pymysql://..." PYTHONPATH=. python scripts/check_db.py
```

#### 2.3 Azure DB へのテストデータ投入

**ファイル**: `backend/scripts/insert_azure_test_user.py`（新規作成）

- テストユーザー（username: test_user_azure@example.com）
- 予算（20,000円）
- 支出データ（3件）

を Azure DB に投入。

```bash
DATABASE_URL="mysql+pymysql://..." PYTHONPATH=. python scripts/insert_azure_test_user.py
```

#### 2.4 カテゴリマスタの投入

**ファイル**: `backend/scripts/init_categories.py`（既存）

Azure DB にカテゴリが存在しなかったため、`init_categories.py` を実行して 10 件のカテゴリを投入。支出登録 API のテストに必要。

---

## テスト環境

| 項目 | 値 |
|------|-----|
| バックエンド URL | https://tech0-gen-11-step3-2-py-67.azurewebsites.net |
| フロントエンド URL | https://tech0-gen-11-step3-2-node-67.azurewebsites.net |
| 認証方式 | テスト用 JWT（`generate_test_token.py`） |
| テストユーザー | user_id=1（Azure DB に手動投入） |

---

## テスト結果一覧

| # | エンドポイント | メソッド | 結果 | 備考 |
|---|---------------|----------|------|------|
| 1 | `/` | GET | ✅ OK | API 稼働確認 |
| 2 | `/health` | GET | ✅ OK | ヘルスチェック |
| 3 | `/health/db` | GET | ✅ OK | DB 接続確認 |
| 4 | `/api/auth/me` | GET | ✅ OK | ユーザー情報取得 |
| 5 | `/api/auth/logout` | POST | ✅ OK | ログアウト |
| 6 | `/api/auth/setup` | POST | ✅ OK | 初期設定 |
| 7 | `/api/auth/me` | PATCH | ✅ OK | プロフィール更新 |
| 8 | `/api/analyze` | GET | ✅ OK | 分析（コーチング） |
| 9 | `/api/ai-analyze` | GET | ✅ OK | **AI 分析（OpenAI API）** |
| 10 | `/expenses` | POST | ✅ OK | 支出登録 |

※ `/api/auth/google` は OAuth トークン必須のため未実施。

---

## 主要レスポンス例

### GET `/api/auth/me`
```json
{"id":1,"username":"test_user_azure@example.com","nickname":"テストユーザー","report_enabled":true,"coach_mode":"angel"}
```

### GET `/api/analyze`
```json
{
  "user":"test_user_azure@example.com",
  "total":4200,
  "budget":20000,
  "remaining":15800,
  "remaining_rate":79.0,
  "pace_rate":1.58,
  "coach_mode":"angel",
  "coach_message":"👼 すごい！とっても順調だよ！この調子！",
  "has_expenses":true,
  "has_budget":true,
  "weekly_report":{...}
}
```

### GET `/api/ai-analyze`（OpenAI API）

Azure OpenAI の Chat Completions API を呼び出し、ファイナンシャルプランナー風のアドバイスを取得。レスポンスの `ai_message` に具体的な節約アドバイス（3つの具体策）が含まれることを確認。

**呼び出しフロー**:
```
GET /api/ai-analyze
  → ai_analyze() で認証・DB から予算・支出取得
  → _generate_ai_analysis() で Azure OpenAI API をコール
  → client.chat.completions.create() が実際の HTTP リクエスト
```

**必要な環境変数**（Azure App Service）:
- `AZURE_OPENAI_API_KEY`
- `AZURE_OPENAI_ENDPOINT`（例: `https://af-gen11.openai.azure.com/`）
- `AZURE_OPENAI_API_VERSION`（`2024-12-01-preview`）
- `AZURE_OPENAI_DEPLOYMENT_NAME`（Foundry のデプロイ名。モデル: gpt-4o-mini / 4o-mini）

### POST `/expenses`
```json
{
  "success":true,
  "data":{"id":4,"item":"テスト支出","category_id":1,"price":300,"expense_date":"2026-02-14",...}
}
```

---

## 作成・更新したファイル

| ファイル | 内容 |
|---------|------|
| `backend/scripts/generate_test_token.py` | 新規：テスト用 JWT 発行 |
| `backend/scripts/insert_azure_test_user.py` | 新規：Azure DB にテストユーザー投入 |

---

## 記録先

- **GitHub Issue #27**: [Sprint1] 6-1 動作確認・テスト  
  - テスト結果サマリー  
  - 各エンドポイントのレスポンス詳細  

---

## 今後のテスト手順（再現用）

```bash
cd backend

# 1. トークン発行
python scripts/generate_test_token.py --user-id 1

# 2. API 呼び出し例
curl -H "Authorization: Bearer <TOKEN>" https://tech0-gen-11-step3-2-py-67.azurewebsites.net/api/auth/me
curl -H "Authorization: Bearer <TOKEN>" https://tech0-gen-11-step3-2-py-67.azurewebsites.net/api/analyze
curl -H "Authorization: Bearer <TOKEN>" https://tech0-gen-11-step3-2-py-67.azurewebsites.net/api/ai-analyze
```

---

## 補足・残課題

- **OAuth（Google ログイン）**: 別途対応が必要
- **JWT_SECRET_KEY**: ローカルと Azure で同一である必要あり（トークン検証のため）
- **Azure DB のテストユーザー**: 本番運用時は削除または適切に管理すること
