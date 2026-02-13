# project_class4 Azure デプロイ 概要

このドキュメントは、project_class4 を Azure にデプロイする際の全体像と、手順書の読み進め方をまとめたものです。

## デプロイ構成

```
[GitHub] --push--> [GitHub Actions] --> [tech0-gen-11-step3-2-py-67]  (バックエンド)
                \                    --> [tech0-gen-11-step3-2-node-67] (フロントエンド)
                 \
                  (環境変数・Secrets)
                          |
                          v
[gen11-key-container]  <-- Key Vault 参照でシークレット取得
[Azure Database for MySQL] <-- [バックエンド]
[Azure OpenAI]             <-- [バックエンド（分析機能）]
```

## 必要な Azure リソース（project_class4 用）

| リソース | リソース名 | 用途 |
|---------|-----------|------|
| Azure App Service（Python） | **tech0-gen-11-step3-2-py-67** | バックエンド（FastAPI） |
| Azure App Service（Node.js） | **tech0-gen-11-step3-2-node-67** | フロントエンド（Next.js） |
| Azure Key Vault | **gen11-key-container** | シークレット管理（APIキー、OAuth等） |
| Azure Database for MySQL | **rg-001-gen11-step3-class4**（フレキシブルサーバー名） | データベース |
| Azure OpenAI | （作成が必要） | AI分析機能（オプション） |

## 手順書の実行順序

作業は以下の順番で進めます。**一個一個確認しながら進めましょう。**

### フェーズ1: インフラ準備

1. **[azure_database_setup.md](./azure_database_setup.md)**  
   - Azure Database for MySQL の作成  
   - ファイアウォールルール  
   - データベース `project_class4_db` の作成  

2. **Azure App Service**（既存）  
   - バックエンド: **tech0-gen-11-step3-2-py-67**  
   - フロントエンド: **tech0-gen-11-step3-2-node-67**  

3. **Azure Key Vault**（既存: **gen11-key-container**）  
   - シークレット（APIキー、OAuth等）の管理は Key Vault 参照で行う（[azure_key_vault_setup.md](./azure_key_vault_setup.md) 参照）

4. **Azure OpenAI の作成**（分析機能を使う場合）  
   - Azure Portal で OpenAI リソースを作成  
   - モデルをデプロイ  
   - API キー・エンドポイント・デプロイ名をメモ  

### フェーズ2: コード変更（事前準備）

4. **CORS の環境変数対応**  
   - `backend/app/main.py` で `ALLOWED_ORIGINS` を読み取るように変更  

5. **Next.js の standalone 出力**  
   - `frontend/next.config.ts` に `output: 'standalone'` を追加  

### フェーズ3: 環境変数・起動設定

6. **[azure_app_service_env_setup.md](./azure_app_service_env_setup.md)**  
   - バックエンド App Service の環境変数設定  
   - Key Vault 参照でシークレットを取得する場合: [azure_key_vault_setup.md](./azure_key_vault_setup.md) 参照  

7. **[azure_app_service_startup.md](./azure_app_service_startup.md)**  
   - バックエンドの起動コマンド  
   - フロントエンドの起動コマンド  

### フェーズ4: CI/CD

8. **[github_actions_cicd.md](./github_actions_cicd.md)**  
   - GitHub Secrets の設定  
   - ワークフローファイルの作成  
   - 初回デプロイ  

### フェーズ5: 初回セットアップ

9. **データベースマイグレーション**  
   - Alembic でテーブル作成  

10. **初期データ投入**（必要に応じて）  
    - カテゴリマスターなど  

### フェーズ6: 本番向け設定

11. **Google Cloud Console**  
    - 承認済みリダイレクトURI に本番フロントエンドURLを追加  
    - 承認済みJavaScript生成元に本番URLを追加  

---

## 環境変数一覧（参照用）

### バックエンド（App Service の構成で設定）

| 変数名 | 必須 | 説明 |
|--------|------|------|
| DATABASE_URL | ○ | MySQL 接続文字列 |
| JWT_SECRET_KEY | ○ | JWT 秘密鍵 |
| GOOGLE_CLIENT_ID | ○ | Google OAuth |
| ALLOWED_ORIGINS | ○ | CORS 許可オリジン |
| AZURE_OPENAI_API_KEY | △ | 分析機能用（使う場合） |
| AZURE_OPENAI_ENDPOINT | △ | 同上 |
| AZURE_OPENAI_API_VERSION | △ | 同上 |
| AZURE_OPENAI_DEPLOYMENT_NAME | △ | 同上 |

### フロントエンド（GitHub Secrets → ビルド時に埋め込み）

| 変数名 | 必須 | 説明 |
|--------|------|------|
| NEXT_PUBLIC_API_URL | ○ | バックエンドAPIのURL |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | ○ | Google OAuth Client ID |

---

## 次のステップ

まずは **[azure_database_setup.md](./azure_database_setup.md)** から始めましょう。  
各ステップで不明点があれば、その都度確認しながら進めてください。
