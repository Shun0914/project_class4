# Azure デプロイ作業レポート（2026-02-14）

## 概要

project_class4 を Azure App Service にデプロイし、バックエンド（FastAPI）・フロントエンド（Next.js）が本番環境で動作する状態まで構築した。

**関連 Issue**: [Issue #45 デプロイ環境のセットアップ](https://github.com/Shun0914/project_class4/issues/45) / [Issue #46 CI/CDパイプライン](https://github.com/Shun0914/project_class4/issues/46)

---

## デプロイ構成

```
[GitHub] --push main--> [GitHub Actions]
                              |
                    +---------+---------+
                    |                   |
                    v                   v
        tech0-gen-11-step3-2-py-67   tech0-gen-11-step3-2-node-67
              (バックエンド)              (フロントエンド)
                    |                   |
                    +---------+---------+
                              |
                    [Azure Database for MySQL]
                    [Azure OpenAI]
```

---

## 使用リソース

| リソース | リソース名 | 用途 |
|---------|-----------|------|
| Azure App Service（Python） | **tech0-gen-11-step3-2-py-67** | バックエンド（FastAPI） |
| Azure App Service（Node.js） | **tech0-gen-11-step3-2-node-67** | フロントエンド（Next.js） |
| Azure Database for MySQL | **rg-001-gen11-step3-class4** | データベース |
| Azure OpenAI | （リソース名は環境変数で指定） | AI 分析機能 |

※ **Azure Key Vault は未使用**。環境変数は App Service の「構成」に直接設定。

---

## 実施した作業（フェーズ別）

### フェーズ1: インフラ準備

#### 1.1 Azure Database for MySQL

- **サーバー**: rg-001-gen11-step3-class4（フレキシブルサーバー）
- **データベース**: `project_class4_db`
- **接続文字列**: `mysql+pymysql://tech0gen11:***@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db`
- **ファイアウォール**: App Service の送信 IP を許可

参照: [azure_deployment_guide.md](../setup/azure_deployment_guide.md)

#### 1.2 Azure App Service

- バックエンド・フロントエンド用の App Service を利用
- 起動コマンド・環境変数を「構成」に直接設定（Key Vault は未使用）

---

### フェーズ2: コード変更（事前準備）

#### 2.1 Next.js の standalone 出力

**ファイル**: `frontend/next.config.ts`

```typescript
const nextConfig: NextConfig = {
  output: "standalone",
  // ...
};
```

Azure App Service 向けに standalone ビルドを有効化。

#### 2.2 バックエンドのデプロイ構成

- `backend/` ディレクトリのみをデプロイ
- `backend/requirements.txt` を pip でインストール

---

### フェーズ3: 環境変数・起動設定

#### 3.1 バックエンド App Service の環境変数

| 変数名 | 用途 |
|--------|------|
| `DATABASE_URL` | MySQL 接続文字列 |
| `JWT_SECRET_KEY` | JWT 認証 |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `ALLOWED_ORIGINS` | CORS 許可オリジン |
| `AZURE_OPENAI_API_KEY` | AI 分析 |
| `AZURE_OPENAI_ENDPOINT` | AI 分析 |
| `AZURE_OPENAI_API_VERSION` | AI 分析 |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | AI 分析 |

参照: [azure_deployment_guide.md](../setup/azure_deployment_guide.md)

#### 3.2 起動コマンド

**バックエンド**:
```bash
cd /home/site/wwwroot && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

**フロントエンド**:
```bash
cd /home/site/wwwroot && node server.js
```

参照: [azure_deployment_guide.md](../setup/azure_deployment_guide.md)

---

### フェーズ4: CI/CD パイプライン

#### 4.1 GitHub Secrets

| Secret 名 | 用途 |
|----------|------|
| `AZUREAPPSERVICE_PUBLISHPROFILE_*` | バックエンド・フロントエンドの Publish Profile |
| `NEXT_PUBLIC_API_URL` | フロントエンドビルド時の API URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | フロントエンドビルド時の OAuth Client ID |

#### 4.2 ワークフローファイル

| ファイル | トリガー | デプロイ先 |
|---------|---------|-----------|
| `.github/workflows/main_tech0-gen-11-step3-2-py-67.yml` | main push / workflow_dispatch | バックエンド |
| `.github/workflows/main_tech0-gen-11-step3-2-node-67.yml` | main push / workflow_dispatch | フロントエンド |

**バックエンド**:
- Python 3.12
- `pip install -r backend/requirements.txt`
- `backend/` をアーティファクトとしてアップロード
- `azure/webapps-deploy@v3` でデプロイ

**フロントエンド**:
- Node.js 20.x
- `npm run build`（standalone 出力）
- `.next/standalone` + `static` + `public` を zip してデプロイ

参照: [azure_deployment_guide.md](../setup/azure_deployment_guide.md)

---

### フェーズ5: 初回セットアップ

#### 5.1 データベースマイグレーション

- Alembic でテーブル作成（`alembic upgrade head`）
- 実行方法: Azure Cloud Shell / SSH、またはローカルから `DATABASE_URL` を本番に設定して実行

#### 5.2 初期データ投入

- **カテゴリマスター**: `init_categories.py` で 10 件投入
- **テストユーザー**: `insert_azure_test_user.py` で投入（API テスト用）

---

## デプロイ結果

| 項目 | URL | 状態 |
|------|-----|------|
| バックエンド | https://tech0-gen-11-step3-2-py-67.azurewebsites.net | ✅ 稼働中 |
| フロントエンド | https://tech0-gen-11-step3-2-node-67.azurewebsites.net | ✅ 稼働中 |
| ヘルスチェック | /health, /health/db | ✅ 正常 |
| DB 接続 | project_class4_db | ✅ 接続確認済み |
| AI 分析（OpenAI） | /api/ai-analyze | ✅ 動作確認済み |

---

## 動作確認手順

### 1. バックエンド

```bash
curl https://tech0-gen-11-step3-2-py-67.azurewebsites.net/
curl https://tech0-gen-11-step3-2-py-67.azurewebsites.net/health/db
```

### 2. フロントエンド

ブラウザで https://tech0-gen-11-step3-2-node-67.azurewebsites.net/ にアクセス

### 3. API テスト（認証付き）

[2026-02-14_api_test_report.md](./2026-02-14_api_test_report.md) を参照

---

## 関連ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [azure_deployment_guide.md](../setup/azure_deployment_guide.md) | デプロイ手順書（データベース〜CI/CD 一括） |

---

## 残課題・補足

- **OAuth（Google ログイン）**: 本番 URL を Google Cloud Console の承認済み URI に追加する必要あり
- **CORS**: `backend/app/main.py` で `ALLOWED_ORIGINS` を環境変数から読み取る実装への変更を推奨（現状は localhost のみハードコードの可能性）
- **デプロイの再実行**: `main` ブランチへの push で自動デプロイ。手動実行は GitHub Actions の「Run workflow」から可能
