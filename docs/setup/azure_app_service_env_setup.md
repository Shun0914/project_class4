# Azure App Service 環境変数設定手順（project_class4）

このドキュメントでは、project_class4 の Azure App Service に環境変数を設定する手順を説明します。

## リソース名（project_class4 用）

| 種類 | リソース名 |
|------|-----------|
| バックエンド App Service | **tech0-gen-11-step3-2-py-67** |
| フロントエンド App Service | **tech0-gen-11-step3-2-node-67** |
| Key Vault | **gen11-key-container** |

**Key Vault でシークレットを管理する場合**: [azure_key_vault_setup.md](./azure_key_vault_setup.md) を参照してください。

## 前提条件

- Azure Portal にアクセスできること
- バックエンド用・フロントエンド用の App Service リソースが作成されていること
- データベース接続情報が準備できていること
- Azure OpenAI リソースが作成されていること（分析機能で使用）

---

## バックエンド用 App Service の環境変数

### 必須の環境変数

| 環境変数名 | 値 | 説明 |
|----------|-----|------|
| `DATABASE_URL` | `mysql+pymysql://{username}:{password}@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db` | データベース接続文字列 |
| `JWT_SECRET_KEY` | ランダムな文字列（64文字以上推奨） | JWT認証の秘密鍵。本番では必ず強力な値に変更 |
| `GOOGLE_CLIENT_ID` | Google Cloud Consoleで取得したClient ID | Google OAuth認証用 |
| `ALLOWED_ORIGINS` | フロントエンドのURL（カンマ区切り） | CORSで許可するオリジン。例: `https://tech0-gen-11-step3-2-node-67.azurewebsites.net` |

### Azure OpenAI 用の環境変数（分析機能で使用）

| 環境変数名 | 値 | 説明 |
|----------|-----|------|
| `AZURE_OPENAI_API_KEY` | Azure OpenAI の API キー | Azure Portal の OpenAI リソースから取得 |
| `AZURE_OPENAI_ENDPOINT` | `https://<リソース名>.openai.azure.com/` | Azure OpenAI のエンドポイントURL |
| `AZURE_OPENAI_API_VERSION` | `2024-02-15-preview` など | 使用するAPIバージョン |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | デプロイ名（例: `gpt-4`） | Azure OpenAI にデプロイしたモデル名 |

**注意**: 分析機能（AIアドバイス）を使用しない場合は、これらの変数がなくてもアプリは起動します。ただし、分析API呼び出し時にエラーになります。

---

## フロントエンド用 App Service の環境変数（ビルド時）

Next.js はビルド時に `NEXT_PUBLIC_*` を埋め込みます。**GitHub Actions の Secrets** で設定し、ビルド時に渡します。

| 環境変数名 | 値 | 説明 |
|----------|-----|------|
| `NEXT_PUBLIC_API_URL` | バックエンド App Service のURL | 例: `https://xxx.azurewebsites.net` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google Cloud Consoleで取得したClient ID | バックエンドと同じClient IDを使用 |

---

## 手順: Azure Portalでバックエンドの環境変数を設定

### Step 1: App Serviceリソースを開く

1. [Azure Portal](https://portal.azure.com/) にログイン
2. 左側のメニューから **「App Services」** を選択
3. **tech0-gen-11-step3-2-py-67**（バックエンド用）をクリック

### Step 2: 設定画面を開く

1. App Serviceの左側メニューで **「設定」** セクションを展開
2. **「構成」** をクリック

### Step 3: アプリケーション設定を追加

**「+ 新しいアプリケーション設定」** で以下を1つずつ追加：

| 名前 | 値 |
|------|-----|
| `DATABASE_URL` | `mysql+pymysql://{username}:{password}@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db` |
| `JWT_SECRET_KEY` | 強力なランダム文字列 |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `ALLOWED_ORIGINS` | `https://tech0-gen-11-step3-2-node-67.azurewebsites.net` |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI APIキー |
| `AZURE_OPENAI_ENDPOINT` | `https://<リソース名>.openai.azure.com/` |
| `AZURE_OPENAI_API_VERSION` | `2024-02-15-preview` |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | デプロイしたモデル名 |

### Step 4: 設定を保存

1. 画面の上部にある **「保存」** ボタンをクリック
2. **「続行」** をクリックして確認
3. 保存が完了するまで待機（App Serviceが自動的に再起動されます）

---

## コード変更の確認事項

現在、`backend/app/main.py` の CORS 設定は `localhost:3000` がハードコードされています。本番デプロイ時には、環境変数 `ALLOWED_ORIGINS` から読み取るように変更が必要です。

**変更例**（手順書の作業と並行して実施）:
```python
import os
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    ...
)
```

---

## パスワードに特殊文字が含まれる場合

`@`, `#`, `%`, `&` などの特殊文字は URL エンコードが必要です。

| 文字 | エンコード後 |
|------|-------------|
| `@` | `%40` |
| `#` | `%23` |
| `%` | `%25` |
| `&` | `%26` |

---

## 次のステップ

環境変数の設定が完了したら：

1. **起動コマンドの設定**（[azure_app_service_startup.md](./azure_app_service_startup.md) 参照）
2. **データベースマイグレーションの実行**
3. **CI/CDパイプラインの設定**（[github_actions_cicd.md](./github_actions_cicd.md) 参照）
