# GitHub Actions CI/CD パイプライン設定手順（project_class4）

このドキュメントでは、project_class4 を Azure App Service に自動デプロイするための GitHub Actions 設定手順を説明します。

## 前提条件

- Azure App Service（バックエンド用・フロントエンド用）が作成されていること
- Azure Portal で GitHub との CI/CD 連携が有効になっていること（推奨：初回は手動で作成し、後からワークフローをカスタマイズ）

---

## 全体構成

| 構成要素 | 説明 |
|---------|------|
| バックエンド用ワークフロー | `main` ブランチへの push で FastAPI をデプロイ |
| フロントエンド用ワークフロー | `main` ブランチへの push で Next.js をデプロイ |
| デプロイ先 | それぞれ別の Azure App Service |

---

## 1. Azure から Publish Profile を取得

### 手順

1. Azure Portal で **tech0-gen-11-step3-2-py-67**（バックエンド用）を開く
2. **「概要」** または **「設定」→「プロパティ」** を選択
3. **「発行プロファイルのダウンロード」** をクリック
4. ダウンロードした `.PublishSettings` ファイルを開き、内容をコピー
5. **tech0-gen-11-step3-2-node-67**（フロントエンド用）についても同様に取得

---

## 2. GitHub Secrets の設定

1. リポジトリの **「Settings」→「Secrets and variables」→「Actions」** を開く
2. **「New repository secret」** で以下を追加：

| Secret 名 | 値 | 説明 |
|----------|-----|------|
| `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND` | tech0-gen-11-step3-2-py-67 の Publish Profile の内容（全体） | バックエンドデプロイ用 |
| `AZUREAPPSERVICE_PUBLISHPROFILE_FRONTEND` | tech0-gen-11-step3-2-node-67 の Publish Profile の内容（全体） | フロントエンドデプロイ用 |
| `NEXT_PUBLIC_API_URL` | `https://tech0-gen-11-step3-2-py-67.azurewebsites.net` | フロントエンドビルド時に埋め込む |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | フロントエンドビルド時に埋め込む |

**注意**: `NEXT_PUBLIC_*` はビルド時にフロントエンドのコードに埋め込まれるため、GitHub Secrets で管理します。

---

## 3. 事前準備: コード変更

### 3.1. Next.js の standalone 出力

`frontend/next.config.ts` に以下を追加：

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // 追加
  turbopack: {
    root: path.resolve(__dirname),
  },
};
```

### 3.2. CORS の環境変数対応

`backend/app/main.py` で `ALLOWED_ORIGINS` を読み取るように変更（[azure_app_service_env_setup.md](./azure_app_service_env_setup.md) 参照）

---

## 4. ワークフローファイルの作成

### 4.1. バックエンド用ワークフロー

`.github/workflows/deploy-backend.yml` を作成：

```yaml
name: Build and deploy Backend to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python version
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          python -m venv antenv
          source antenv/bin/activate
          pip install -r backend/requirements.txt

      # Oryx がルートから requirements.txt を探すため、backend/ をデプロイする場合は
      # パッケージ内に requirements.txt が含まれるようにする（backend/ に既にある）
      - name: Upload artifact for deployment
        uses: actions/upload-artifact@v4
        with:
          name: python-app
          path: backend/

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: python-app

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'tech0-gen-11-step3-2-py-67'
          slot-name: 'Production'
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND }}
```

### 4.2. フロントエンド用ワークフロー

`.github/workflows/deploy-frontend.yml` を作成：

```yaml
name: Build and deploy Frontend to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'

      - name: npm install and build
        run: |
          cd frontend
          npm install
          npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_GOOGLE_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_GOOGLE_CLIENT_ID }}

      - name: Prepare deployment artifact
        run: |
          mkdir deploy
          cp -r ./frontend/.next/standalone/. ./deploy
          cp -r ./frontend/.next/static/. ./deploy/.next/static
          cp -r ./frontend/public/. ./deploy/public
          cp ./frontend/app/favicon.ico ./deploy/favicon.ico 2>/dev/null || true

      - name: Zip artifact
        run: zip -r release.zip ./deploy

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: Unzip artifact
        run: unzip release.zip

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'tech0-gen-11-step3-2-node-67'
          slot-name: 'Production'
          package: ./deploy
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_FRONTEND }}
```

---

## 5. デプロイの実行

1. ワークフローファイルを `main` ブランチに push
2. GitHub の **「Actions」** タブでワークフローの実行を確認
3. 成功すれば、App Service にアプリケーションがデプロイされる

---

## 6. データベースマイグレーション

デプロイ後、初回はデータベースマイグレーションを実行する必要があります。

### 方法1: Azure Cloud Shell から

1. Azure Portal で **tech0-gen-11-step3-2-py-67**（バックエンド用）を開く
2. **「開発ツール」→「SSH」** または **「高度なツール」→「Go」** で Kudu にアクセス
3. SSH または コンソールで以下を実行：

```bash
cd /home/site/wwwroot  # または backend がデプロイされているパス
python -m alembic upgrade head
```

### 方法2: ローカルから接続

一時的に `DATABASE_URL` を本番の接続文字列に設定し、ローカルで：

```bash
cd backend
source venv/bin/activate
alembic upgrade head
```

**注意**: ファイアウォールでローカルIPを許可する必要がある。実行後は削除すること。

---

## トラブルシューティング

### フロントエンドビルドで `NEXT_PUBLIC_*` が undefined
- GitHub Secrets に `NEXT_PUBLIC_API_URL` と `NEXT_PUBLIC_GOOGLE_CLIENT_ID` が設定されているか確認
- ワークフローの `env` セクションで正しく渡されているか確認

### デプロイは成功するがアプリが起動しない
- 起動コマンドが正しく設定されているか確認
- ログストリームでエラーメッセージを確認
- 環境変数が App Service に設定されているか確認

### バックエンドの Oryx ビルドについて
Azure のデフォルトでは `SCM_DO_BUILD_DURING_DEPLOYMENT` が有効で、Oryx が `requirements.txt` を探してビルドします。`backend/` のみをデプロイする場合、ルートに `requirements.txt` がなければ Oryx が失敗する可能性があります。その場合は、ワークフローで `cp backend/requirements.txt .` を追加するか、またはデプロイパッケージの構成を調整してください。
