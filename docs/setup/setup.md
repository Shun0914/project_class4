# 開発環境セットアップ手順

このドキュメントでは、プロジェクトの開発環境をセットアップする手順を説明します。

## 前提条件

- Python 3.9以上がインストールされていること
- MySQL がインストールされていること
- Git がインストールされていること

---

## 1. リポジトリのクローン

```bash
git clone https://github.com/Shun0914/project_class4.git
cd project_class4
```

---

## 2. バックエンド環境のセットアップ

### 2.1. 仮想環境の作成とアクティベート

```bash
cd backend
python3 -m venv venv # Windows: python -m venv venvのこともあり
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2.2. 依存関係のインストール

```bash
pip install -r requirements.txt
```

### 2.3. データベースの作成

MySQLに接続してデータベースを作成します：

```bash
mysql -u root -p
```

MySQLコマンドラインで以下を実行：

```sql
CREATE DATABASE project_class4_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
exit
```

### 2.4. 環境変数の設定

`.env`ファイルを作成して、データベース接続情報を設定します：

```bash
cp .env.example .env
```

`.env`ファイルを編集して、自分のMySQLの接続情報に合わせて変更：

```env
DATABASE_URL=mysql+pymysql://root:your_password@localhost:3306/project_class4_db
```

**重要**: `.env`ファイルには実際のパスワードを記載しますが、このファイルは`.gitignore`に含まれているため、Gitにはコミットされません。

### 2.5. サーバーの起動と動作確認

```bash
uvicorn app.main:app --reload
```

サーバーが起動したら、以下で動作確認：

- APIの稼働確認: http://127.0.0.1:8000/
- ヘルスチェック: http://127.0.0.1:8000/health
- データベース接続確認: http://127.0.0.1:8000/health/db
- API ドキュメント（Swagger UI）: http://127.0.0.1:8000/docs

**データベース接続が成功した場合**:
```json
{"status":"healthy","database":"connected"}
```

**データベース接続が失敗した場合**:
```json
{"status":"unhealthy","database":"disconnected","error":"..."}
```

**データベースのセットアップ**:
データベースのセットアップ手順は、[db_setup.md](./db_setup.md)を参照すること

---

## 3. フロントエンド環境のセットアップ

### 3.1. 依存関係のインストール

```bash
cd frontend
npm install  # or pnpm install
```

### 3.2. 環境変数の設定（オプション）

`.env.local`ファイルを作成し、APIのベースURLを設定します：

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3.3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスします。

**注意**: 現時点（Phase 0完了時点）では、Next.jsのデフォルトページが表示されます。実際のページコンポーネントはPhase 2以降で実装予定です。

---

## トラブルシューティング

### データベース接続エラー

**エラー**: `(2003, "Can't connect to MySQL server on 'localhost'")`

**解決方法**:
- MySQLサーバーが起動しているか確認: `brew services list` (Homebrewの場合)
- MySQLサーバーを起動: `brew services start mysql` (Homebrewの場合)
- `.env`ファイルの接続情報が正しいか確認

**エラー**: `(1045, "Access denied for user 'root'@'localhost'")`

**解決方法**:
- `.env`ファイルのパスワードが正しいか確認
- MySQLのrootパスワードをリセットする必要がある場合があります

**エラー**: `(1049, "Unknown database 'kunyomi_db'")`

**解決方法**:
- データベースが作成されているか確認: `SHOW DATABASES;`
- データベースを作成: `CREATE DATABASE kunyomi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

### Python関連のエラー

**エラー**: `python: command not found`

**解決方法**:
- macOSでは`python3`を使用: `python3 -m venv venv`
- パスが通っているか確認: `which python3`

### 依存関係のインストールエラー

**エラー**: `pip: command not found`

**解決方法**:
- 仮想環境をアクティベート: `source venv/bin/activate`
- 仮想環境内では`pip`が使用可能になります

---

## 次のステップ

セットアップが完了したら、以下のドキュメントを確認してください：

- [GitHub開発ワークフロー手順書](./github_workflow.md) - GitHubを使った開発の進め方
- [Week 1 開発ガイド](./week1_development_guide.md) - API実装の手順
- [プロジェクト構造と開発フロー](../project_structure.md) - プロジェクトの構造と開発の流れ
- [Week 1タスク分割](../tasks/task_breakdown_week1.md) - Week 1のタスク一覧

---

## 参考リンク

- [FastAPI公式ドキュメント](https://fastapi.tiangolo.com/)
- [SQLAlchemy公式ドキュメント](https://www.sqlalchemy.org/)
- [Next.js公式ドキュメント](https://nextjs.org/)
- [React公式ドキュメント](https://react.dev/)

