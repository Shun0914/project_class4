# Azure App Service 起動コマンド設定手順（project_class4）

このドキュメントでは、Azure App Service で FastAPI（バックエンド）と Next.js（フロントエンド）を起動するための設定手順を説明します。

## リソース名（project_class4 用）

| 種類 | リソース名 |
|------|-----------|
| バックエンド App Service | **tech0-gen-11-step3-2-py-51** |
| フロントエンド App Service | **tech0-gen-11-step3-2-node-67** |

## 前提条件

- Azure App Service リソースが作成されていること
- バックエンド: `backend/` ディレクトリにコードが配置されていること
- フロントエンド: Next.js の `output: 'standalone'` ビルドがデプロイされていること

---

## バックエンド（FastAPI）の起動コマンド

### 手順

1. [Azure Portal](https://portal.azure.com/) にログイン
2. **tech0-gen-11-step3-2-py-51**（バックエンド用）を開く
3. 左側メニューで **「設定」→「構成」** を選択
4. **「一般設定」** タブを選択
5. **「起動コマンド」** フィールドに以下を入力：

```bash
cd backend && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

6. **「保存」** をクリック
7. App Service が再起動されます（数分かかります）

### 重要なポイント

- `${PORT:-8000}`: 環境変数 `PORT` が設定されていればその値、なければ `8000` を使用
- Azure App Service は自動的に `PORT` 環境変数を設定する
- `0.0.0.0` で全ネットワークインターフェースからアクセス可能に

### GitHub Actions からデプロイする場合

Azure はリポジトリのルートを `/home/site/wwwroot` にデプロイします。CI/CD で `backend/` のみをアップロードする場合は、パスが異なる可能性があります。その場合は：

```bash
cd /home/site/wwwroot && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

（デプロイアーティファクトの構成に合わせて調整）

---

## フロントエンド（Next.js）の起動コマンド

Next.js の standalone ビルドでは、`node server.js` で起動します。

### 手順

1. **tech0-gen-11-step3-2-node-67**（フロントエンド用）を開く
2. **「設定」→「構成」→「一般設定」** を選択
3. **「起動コマンド」** に以下を入力：

```bash
cd /home/site/wwwroot && node server.js
```

または、デプロイ構成に応じて：

```bash
node server.js
```

4. **「保存」** をクリック

**注意**: Next.js の standalone 出力では、`server.js` がルートに配置されます。デプロイアーティファクトの構成を確認してください。

---

## 動作確認

### 1. バックエンドのログ確認

1. App Service の **「監視」→「ログストリーム」** を選択
2. 起動ログを確認

**成功時のログ例**:
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. バックエンドのヘルスチェック

```
https://tech0-gen-11-step3-2-py-51.azurewebsites.net/
```

**期待されるレスポンス**:
```json
{
  "message": "API is running",
  "status": "ok"
}
```

### 3. データベース接続確認

```
https://tech0-gen-11-step3-2-py-51.azurewebsites.net/health/db
```

**期待されるレスポンス**:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 4. フロントエンドの確認

```
https://tech0-gen-11-step3-2-node-67.azurewebsites.net/
```

ログイン画面が表示されればOK。

---

## トラブルシューティング

### エラー: `ModuleNotFoundError: No module named 'app'`
- 起動コマンドで `cd backend` が正しく実行されているか確認
- デプロイアーティファクトに `backend/` の内容が含まれているか確認

### エラー: `Connection refused` または `Can't connect to MySQL server`
- `DATABASE_URL` 環境変数が正しく設定されているか確認
- Azure Database for MySQL のファイアウォールで App Service のアウトバウンドIPが許可されているか確認

### エラー: CORS エラー
- `ALLOWED_ORIGINS` にフロントエンドのURLが含まれているか確認
- コードで `ALLOWED_ORIGINS` を読み取る実装になっているか確認

### アプリケーションが起動しない
1. ログストリームでエラーメッセージを確認
2. `requirements.txt` が `backend/` に存在するか確認
3. 起動コマンドのパスを再確認
