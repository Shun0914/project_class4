# Azure Database for MySQL セットアップ手順（project_class4）

このドキュメントでは、project_class4 用に Azure Database for MySQL のリソース作成からデータベースセットアップまでの手順を説明します。

## 前提条件

- Azure サブスクリプションがあること
- Azure Portal にアクセスできること
- Azure App Service（バックエンド用）が既に作成されていること（ファイアウォールルール設定に必要）

---

## 1. Azure Database for MySQL リソースの作成

### 1.1. Azure Portalでのリソース作成

1. [Azure Portal](https://portal.azure.com/) にログイン
2. リソースの作成 → 「Azure Database for MySQL」を検索
3. **「フレキシブルサーバー」** を選択（単一サーバーは将来廃止予定）

### 1.2. 基本設定

#### 基本タブ
- **サブスクリプション**: 使用するサブスクリプションを選択
- **リソースグループ**: App Serviceと同じリソースグループを使用することを推奨
- **サーバー名**: 一意の名前（例: `project-class4-mysql-server`）
- **リージョン**: App Serviceと同じリージョンを選択（通信レイテンシーを最小化）
- **MySQL バージョン**: 8.0 を推奨
- **ワークロード タイプ**: 「開発/テスト」または「本番環境」を選択
- **コンピューティング + ストレージ**: 
  - **開発/テスト**: B1ms（1 vCore、2GB RAM）程度
  - **本番環境**: B2s以上推奨

#### ネットワークタブ
- **接続方法**: **パブリック アクセス**（App Serviceからの接続に必要）
- **ファイアウォール規則**: 
  - **「Azure サービスにアクセスを許可」**: ✅ チェック
  - ルール: 後でApp ServiceのアウトバウンドIPアドレスを追加（手順2参照）

#### セキュリティタブ
- **管理者ログイン名**: サーバー管理者のユーザー名（例: `projectclass4admin`）
- **パスワード**: 強力なパスワードを設定
  - **重要**: パスワードは安全な場所に保存（接続文字列作成に必要）

#### 確認および作成
- 設定を確認し、「作成」をクリック
- デプロイ完了まで5〜10分程度

---

## 2. ファイアウォールルールの設定

### 2.1. App ServiceのアウトバウンドIPアドレスの確認

1. Azure Portalで **バックエンド用 App Service** リソースを開く
2. **「設定」→「プロパティ」** を選択
3. **「送信 IP アドレス」** を確認（複数ある場合は全て）

### 2.2. ファイアウォールルールの追加

1. Azure Portalで **Azure Database for MySQL** リソースを開く
2. **「設定」→「ネットワーク」** を選択
3. **「ファイアウォール規則」** タブで以下を追加：
   - **ルール名**: `AppService-Outbound-IP-1` など
   - **開始 IP アドレス**: App ServiceのアウトバウンドIPアドレス
   - **終了 IP アドレス**: 同じアドレス
4. アウトバウンドIPアドレスが複数ある場合は、それぞれ追加
5. **「保存」** をクリック

**注意**: ローカルから接続テストする場合は、一時的に自分のIPアドレスを追加可能。**テスト完了後は必ず削除**すること。

---

## 3. データベースの作成

### 3.1. 接続情報の取得

1. Azure Portalで **Azure Database for MySQL** リソースを開く
2. **「設定」→「接続文字列」** を選択
3. ホスト名、ユーザー名、ポートを確認

### 3.2. MySQL コマンドラインまたはツールで接続

#### オプション1: Azure Cloud Shellから接続
1. Azure Portalの上部にある **Cloud Shell** アイコンをクリック
2. **Bash** を選択
3. 以下のコマンドで接続：

```bash
mysql -h <サーバー名>.mysql.database.azure.com -u <管理者名> -p
```

パスワードを入力後、MySQLコマンドラインが起動します。

#### オプション2: ローカルMySQLクライアントから接続
- **MySQL Workbench**、**DBeaver**、**TablePlus** などを使用
- 接続情報:
  - **ホスト**: `<サーバー名>.mysql.database.azure.com`
  - **ポート**: `3306`
  - **ユーザー名**: サーバー管理者名
  - **パスワード**: 設定したパスワード

### 3.3. データベースの作成

MySQLコマンドラインまたはツールで以下を実行：

```sql
CREATE DATABASE project_class4_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
```

**確認**: `project_class4_db` がリストに表示されればOK

---

## 4. 接続文字列の構築（Python/FastAPI用）

SQLAlchemy（PyMySQL）用の接続文字列形式：

```
mysql+pymysql://{username}:{password}@{server_name}.mysql.database.azure.com:3306/project_class4_db
```

**例**:
```
mysql+pymysql://projectclass4admin:YourPassword@project-class4-mysql-server.mysql.database.azure.com:3306/project_class4_db
```

**重要**: 
- パスワードに特殊文字が含まれる場合は、URLエンコードが必要
- この接続文字列は **Azure App Serviceの環境変数** `DATABASE_URL` として設定する

---

## 5. 次のステップ

データベースセットアップが完了したら：

1. **Azure App Serviceの環境変数設定**（[azure_app_service_env_setup.md](./azure_app_service_env_setup.md) 参照）
2. **データベースマイグレーションの実行**（Alembic）
3. **初期データの投入**（カテゴリマスターなど）

---

## トラブルシューティング

### 接続エラー: `Can't connect to MySQL server`
- ファイアウォールルールにApp ServiceのアウトバウンドIPアドレスが追加されているか確認
- 「Azure サービスにアクセスを許可」が有効か確認

### 接続エラー: `Access denied for user`
- 接続文字列のユーザー名とパスワードを確認
- パスワードに特殊文字が含まれる場合はURLエンコード

### データベースが見つからない: `Unknown database`
- 手順3.3でデータベースを作成したか確認
