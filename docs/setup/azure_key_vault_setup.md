# Azure Key Vault 連携手順（project_class4）

このドキュメントでは、既存の **gen11-key-container**（Key Vault）を使って、project_class4 のシークレットを管理する手順を説明します。

## 前提条件

- Azure Key Vault **gen11-key-container** が存在すること
- App Service **tech0-gen-11-step3-2-py-67**（バックエンド）が存在すること
- App Service に Key Vault へのアクセス権限を付与済みであること

---

## Key Vault に登録するシークレット（推奨）

| シークレット名 | 用途 | 対応する環境変数 |
|---------------|------|------------------|
| `DATABASE-URL` | MySQL 接続文字列 | `DATABASE_URL` |
| `JWT-SECRET-KEY` | JWT 認証の秘密鍵 | `JWT_SECRET_KEY` |
| `GOOGLE-CLIENT-ID` | Google OAuth Client ID | `GOOGLE_CLIENT_ID` |
| `AZURE-OPENAI-API-KEY` | Azure OpenAI API キー | `AZURE_OPENAI_API_KEY` |

**注意**: Key Vault のシークレット名は英数字とハイフンのみ。アンダースコアは使えません。

---

## 1. Key Vault にシークレットを登録

### 手順

1. Azure Portal で **gen11-key-container** を開く
2. 左側メニューで **「オブジェクト」→「シークレット」** を選択
3. **「+ 生成/インポート」** をクリック
4. 各シークレットを追加：

| 名前 | 値 |
|------|-----|
| `DATABASE-URL` | `mysql+pymysql://{username}:{password}@rg-001-gen11-step3-class4.mysql.database.azure.com:3306/project_class4_db` |
| `JWT-SECRET-KEY` | 強力なランダム文字列 |
| `GOOGLE-CLIENT-ID` | Google OAuth Client ID |
| `AZURE-OPENAI-API-KEY` | Azure OpenAI API キー |

5. **「作成」** をクリック

---

## 2. App Service にマネージド ID を有効化

Key Vault から値を取得するには、App Service のマネージド ID が必要です。

### 手順

1. Azure Portal で **tech0-gen-11-step3-2-py-67** を開く
2. 左側メニューで **「設定」→「ID」** を選択
3. **「システム割り当て」** タブで **「状態」** を **オン** に設定
4. **「保存」** をクリック

---

## 3. Key Vault のアクセスポリシーを設定

App Service のマネージド ID に、Key Vault のシークレット取得権限を付与します。

### 手順

1. **gen11-key-container** を開く
2. 左側メニューで **「アクセスポリシー」** を選択
3. **「+ アクセスポリシーの追加」** をクリック
4. **シークレットのアクセス許可** で **「取得」** にチェック
5. **「プリンシパルの選択」** で **tech0-gen-11-step3-2-py-67** のマネージド ID を検索して選択
6. **「追加」** → **「保存」** をクリック

---

## 4. App Service の環境変数で Key Vault 参照を設定

App Service の「アプリケーション設定」で、値を直接入力する代わりに **Key Vault 参照** を指定します。

### 参照形式

```
@Microsoft.KeyVault(SecretUri=https://gen11-key-container.vault.azure.net/secrets/シークレット名/)
```

### 手順

1. **tech0-gen-11-step3-2-py-67** の **「設定」→「構成」→「アプリケーション設定」** を開く
2. **「+ 新しいアプリケーション設定」** で以下を追加：

| 名前 | 値 |
|------|-----|
| `DATABASE_URL` | `@Microsoft.KeyVault(SecretUri=https://gen11-key-container.vault.azure.net/secrets/DATABASE-URL/)` |
| `JWT_SECRET_KEY` | `@Microsoft.KeyVault(SecretUri=https://gen11-key-container.vault.azure.net/secrets/JWT-SECRET-KEY/)` |
| `GOOGLE_CLIENT_ID` | `@Microsoft.KeyVault(SecretUri=https://gen11-key-container.vault.azure.net/secrets/GOOGLE-CLIENT-ID/)` |
| `AZURE_OPENAI_API_KEY` | `@Microsoft.KeyVault(SecretUri=https://gen11-key-container.vault.azure.net/secrets/AZURE-OPENAI-API-KEY/)` |

**注意**: Key Vault の URI は実際のリソース名で確認してください。`gen11-key-container` が Key Vault の名前です。

3. **直接入力する設定**（Key Vault に登録しないもの）:
   - `ALLOWED_ORIGINS`: `https://tech0-gen-11-step3-2-node-67.azurewebsites.net`
   - `AZURE_OPENAI_ENDPOINT`: `https://<リソース名>.openai.azure.com/`
   - `AZURE_OPENAI_API_VERSION`: `2024-02-15-preview`
   - `AZURE_OPENAI_DEPLOYMENT_NAME`: デプロイ名

4. **「保存」** をクリック

---

## 5. Key Vault の URI の確認方法

Key Vault の正しい URI を確認するには：

1. **gen11-key-container** を開く
2. **「オブジェクト」→「シークレット」** で登録したシークレットをクリック
3. **「現在のバージョン」** をクリック
4. **「シークレット識別子」** をコピー（`https://gen11-key-container.vault.azure.net/secrets/DATABASE-URL/xxxxx` の形式）
5. App Service の参照では、`/` で終わる形式を使用: `https://gen11-key-container.vault.azure.net/secrets/DATABASE-URL/`

---

## トラブルシューティング

### 参照が解決されない / アプリが起動しない

- マネージド ID が有効か確認
- Key Vault のアクセスポリシーで「取得」権限が付与されているか確認
- シークレット名が正しいか確認（大文字小文字、ハイフン）

### Key Vault のネットワーク制限

Key Vault にファイアウォールや仮想ネットワークの制限がある場合、App Service からのアクセスを許可する設定が必要です。
