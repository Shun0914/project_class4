# project_class4 Azure デプロイ手順書（正式版）

データベース作成から CI/CD まで、本番デプロイに必要な作業を**1つのドキュメント**で完結する手順書です。

---

## 目次

1. [前提条件・リソース一覧](#1-前提条件リソース一覧)
2. [データベースのセットアップ](#2-データベースのセットアップ)
3. [コードの事前準備](#3-コードの事前準備)
4. [App Service の設定（環境変数・起動コマンド）](#4-app-service-の設定環境変数起動コマンド)
5. [CI/CD パイプラインの構築](#5-cicd-パイプラインの構築)
6. [初回デプロイとマイグレーション](#6-初回デプロイとマイグレーション)
7. [動作確認](#7-動作確認)
8. [トラブルシューティング](#8-トラブルシューティング)

---

## 1. 前提条件・リソース一覧

### 必要な Azure リソース

| リソース | リソース名 | 用途 |
|---------|-----------|------|
| Azure App Service（Python） | **tech0-gen-11-step3-2-py-67** | バックエンド（FastAPI） |
| Azure App Service（Node.js） | **tech0-gen-11-step3-2-node-67** | フロントエンド（Next.js） |
| Azure Database for MySQL | **rg-001-gen11-step3-class4** | データベース |
| Azure AI Foundry（Azure OpenAI 互換） | **af-gen11** | AI 分析機能 |

※ **Key Vault は未使用**。環境変数は App Service の「構成」に直接設定。

### AI リソースの関係性（Azure AI Foundry）

```
[Azure AI Foundry]  ← ポータル（ai.azure.com）でモデルをデプロイ
       |
       v
[af-gen11]  ← リソース名。エンドポイントのホスト部分
       |
       +-- エンドポイント: https://af-gen11.openai.azure.com/
       +-- API バージョン: 2024-12-01-preview
       +-- モデル: gpt-4o-mini（4o-mini）
       +-- デプロイ名: Foundry でデプロイ時に付けた名前（model パラメータで指定）
```

- **Azure AI Foundry** … Azure の AI モデル管理ポータル（ai.azure.com）。従来の「Azure OpenAI」を統合した形態。OpenAI 互換 API でアクセス可能
- **af-gen11** … このプロジェクトで使用する Foundry リソース名。エンドポイントは `https://af-gen11.openai.azure.com/`
- **モデル名（4o-mini）** … 実際のモデル。`gpt-4o-mini` の略称
- **API バージョン（2024-12-01-preview）** … 使用する REST API のバージョン。モデルごとにサポート版が異なる
- **デプロイ名** … Foundry でモデルをデプロイする際に付ける名前。コードの `model` パラメータで指定。モデル名と同じでも、別名でも可

### デプロイ構成

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

## 2. データベースのセットアップ

### 2.1 接続情報の確認

1. [Azure Portal](https://portal.azure.com/) にログイン
2. 検索バーで **「rg-001-gen11-step3-class4」** と入力 → MySQL サーバーをクリック
3. 左メニュー **「設定」→「接続文字列」** でホスト名・ユーザー名をメモ

### 2.2 ファイアウォールに IP を追加

1. MySQL サーバー画面で **「設定」→「ネットワーク」** を開く
2. **「+ ファイアウォール規則の追加」** をクリック
3. **tech0-gen-11-step3-2-py-67** を開く → **「設定」→「プロパティ」** で **「送信 IP アドレス」** をコピー
4. MySQL のファイアウォールで、その IP を **開始 IP** と **終了 IP** の両方に入力
5. **「確認および作成」** → **「作成」**

### 2.3 データベースを作成

1. Azure Portal 上部の **Cloud Shell**（`>_`）→ **Bash** を選択
2. 以下を実行（`<管理者名>` と `<パスワード>` を実際の値に置き換え）：

```bash
mysql -h rg-001-gen11-step3-class4.mysql.database.azure.com -u <管理者名> -p
```

3. パスワード入力後、MySQL プロンプトで：

```sql
CREATE DATABASE project_class4_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
```

4. `project_class4_db` が表示されれば OK。`exit` で終了。

### 2.4 接続文字列の形式

```
mysql+pymysql://<管理者名>:<パスワード>@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db
```

**パスワードに特殊文字**（`@`, `#`, `%`, `&` など）が含まれる場合は URL エンコードが必要。

---

## 3. コードの事前準備

### 3.1 Next.js の standalone 出力

`frontend/next.config.ts` に以下を追加：

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  // ... 既存の設定
};
```

### 3.2 CORS の環境変数対応（推奨）

`backend/app/main.py` で `ALLOWED_ORIGINS` を環境変数から読み取る：

```python
import os
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)
```

---

## 4. App Service の設定（環境変数・起動コマンド）

### 4.1 バックエンドの環境変数

1. **tech0-gen-11-step3-2-py-67** を開く
2. **「設定」→「構成」** → **「+ 新しいアプリケーション設定」** で以下を追加：

| 名前 | 値 |
|------|-----|
| `DATABASE_URL` | `mysql+pymysql://<管理者名>:<パスワード>@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db` |
| `JWT_SECRET_KEY` | ランダムな文字列（64文字以上推奨） |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `ALLOWED_ORIGINS` | `https://tech0-gen-11-step3-2-node-67.azurewebsites.net` |
| `AZURE_OPENAI_API_KEY` | Azure AI Foundry の API キー |
| `AZURE_OPENAI_ENDPOINT` | `https://af-gen11.openai.azure.com/`（Foundry リソース名） |
| `AZURE_OPENAI_API_VERSION` | `2024-12-01-preview` |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Foundry でデプロイした名前（例: `gpt-4o-mini` や `4o-mini`） |

**本プロジェクトの AI 設定**:
- リソース: **af-gen11**（Azure AI Foundry）
- モデル: **gpt-4o-mini**（4o-mini）
- API バージョン: **2024-12-01-preview**

3. **「保存」** → **「続行」**

### 4.2 バックエンドの起動コマンド

1. **「構成」→「一般設定」** タブ
2. **「起動コマンド」** に以下を入力：

```bash
cd /home/site/wwwroot && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

3. **「保存」**

### 4.3 フロントエンドの起動コマンド

1. **tech0-gen-11-step3-2-node-67** を開く
2. **「設定」→「構成」→「一般設定」**
3. **「起動コマンド」** に以下を入力：

```bash
cd /home/site/wwwroot && node server.js
```

4. **「保存」**

※ フロントエンドの `NEXT_PUBLIC_*` は **GitHub Secrets** でビルド時に渡す（後述）。

---

## 5. CI/CD パイプラインの構築

### 5.1 Publish Profile の取得

1. **tech0-gen-11-step3-2-py-67** を開く → **「発行プロファイルのダウンロード」**
2. ダウンロードした `.PublishSettings` の内容をコピー
3. **tech0-gen-11-step3-2-node-67** についても同様に取得

### 5.2 GitHub Secrets の設定

1. リポジトリ **「Settings」→「Secrets and variables」→「Actions」**
2. **「New repository secret」** で以下を追加：

| Secret 名 | 値 |
|----------|-----|
| `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND` | バックエンドの Publish Profile の内容（全体） |
| `AZUREAPPSERVICE_PUBLISHPROFILE_FRONTEND` | フロントエンドの Publish Profile の内容（全体） |
| `NEXT_PUBLIC_API_URL` | `https://tech0-gen-11-step3-2-py-67.azurewebsites.net` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID |

**注意**: Azure Portal から「GitHub に発行プロファイルを追加」すると、Secret 名が `AZUREAPPSERVICE_PUBLISHPROFILE_<ハッシュ>` の形式になる場合があります。その場合はワークフローファイルの `secrets.` 参照をその名前に合わせてください。

### 5.3 ワークフローファイル

既存のワークフローが `main` ブランチへの push でデプロイする構成になっていることを確認：

- `.github/workflows/main_tech0-gen-11-step3-2-py-67.yml`（バックエンド）
- `.github/workflows/main_tech0-gen-11-step3-2-node-67.yml`（フロントエンド）

プロジェクトに既にワークフローファイルが含まれている。Secret 名が異なる場合は、ワークフローの `secrets.` 参照を 5.2 で設定した名前に合わせて編集する。

---

## 6. 初回デプロイとマイグレーション

### 6.1 初回デプロイ

1. ワークフローファイルを `main` ブランチに push
2. GitHub **「Actions」** タブで実行を確認
3. 成功すれば App Service にデプロイされる

### 6.2 データベースマイグレーション

デプロイ後、テーブルを作成するため Alembic を実行。

**方法1: ローカルから（推奨）**

```bash
cd backend
DATABASE_URL="mysql+pymysql://<管理者名>:<パスワード>@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db" \
  alembic upgrade head
```

※ ファイアウォールでローカル IP を一時許可する必要がある場合あり。

**方法2: Azure SSH から**

1. App Service **「開発ツール」→「SSH」**
2. 接続後：

```bash
cd /home/site/wwwroot
python -m alembic upgrade head
```

### 6.3 初期データ投入（カテゴリマスター）

```bash
cd backend
DATABASE_URL="mysql+pymysql://<管理者名>:<パスワード>@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db" \
  PYTHONPATH=. python scripts/init_categories.py
```

---

## 7. 動作確認

### バックエンド

```bash
curl https://tech0-gen-11-step3-2-py-67.azurewebsites.net/
# → {"message":"API is running","status":"ok"}

curl https://tech0-gen-11-step3-2-py-67.azurewebsites.net/health/db
# → {"status":"healthy","database":"connected"}
```

### フロントエンド

ブラウザで https://tech0-gen-11-step3-2-node-67.azurewebsites.net/ にアクセス。ログイン画面が表示されれば OK。

### API ドキュメント

- Swagger UI: https://tech0-gen-11-step3-2-py-67.azurewebsites.net/docs

---

## 8. トラブルシューティング

### 接続エラー: `Can't connect to MySQL server`
- ファイアウォールに App Service の送信 IP が追加されているか確認

### 接続エラー: `Access denied for user`
- 接続文字列のユーザー名・パスワードを確認
- パスワードの特殊文字は URL エンコード

### `ModuleNotFoundError: No module named 'app'`
- 起動コマンドが `cd /home/site/wwwroot` になっているか確認
- デプロイアーティファクトに `backend/` の内容が含まれているか確認

### デプロイは成功するがアプリが起動しない
- ログストリーム（**「監視」→「ログストリーム」**）でエラーを確認
- 環境変数が正しく設定されているか確認
- 起動コマンドのパスを確認

### フロントエンドで `NEXT_PUBLIC_*` が undefined
- GitHub Secrets に `NEXT_PUBLIC_API_URL` と `NEXT_PUBLIC_GOOGLE_CLIENT_ID` が設定されているか確認
- ワークフローの `env` で正しく渡されているか確認

### CORS エラー
- `ALLOWED_ORIGINS` にフロントエンド URL が含まれているか確認
- コードで `ALLOWED_ORIGINS` を読み取る実装になっているか確認

---

## 補足: Google OAuth 本番設定

本番で Google ログインを使う場合：

1. [Google Cloud Console](https://console.cloud.google.com/) で OAuth クライアントを開く
2. **承認済みリダイレクト URI** に `https://tech0-gen-11-step3-2-node-67.azurewebsites.net/...` を追加
3. **承認済み JavaScript 生成元** に `https://tech0-gen-11-step3-2-node-67.azurewebsites.net` を追加
