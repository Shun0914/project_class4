# Snyk ワークフロー ドキュメント

## 概要

本リポジトリでは、セキュリティスキャンツール **Snyk** を GitHub Actions に組み込み、push/PR のたびに依存関係のスナップショット取得とコードスキャン（Snyk Code）を実行している。Snyk Code の結果は GitHub Issue として自動作成し、リファクタ用バックログとして利用する。

**ワークフロー定義**: [.github/workflows/snyk.yml](../../.github/workflows/snyk.yml)

---

## Snyk とは

Snyk は、以下のようなセキュリティ・品質チェックを提供する SaaS である。

| 機能 | 内容 |
|------|------|
| **オープンソース（依存関係）** | npm / pip 等の依存パッケージの脆弱性・ライセンスを検出 |
| **Snyk Code** | ソースコードの静的解析（ハードコード認証情報・SSRF・Cookie 設定など） |

本ワークフローでは、**依存関係のスナップショット送信**と **Snyk Code の実行＋Issue 起票** の両方を行っている。

---

## ワークフローの構成

トリガー: **push** および **pull_request**（対象ブランチ: `main`）

### ジョブ一覧

| ジョブ名 | 役割 |
|----------|------|
| **Snyk (Frontend / Node) – スナップショット** | フロントエンドの依存関係を `snyk test` し、`snyk monitor` で Snyk にスナップショット送信 |
| **Snyk (Backend / Python) – スナップショット** | バックエンドの依存関係を同様に test + monitor |
| **Snyk Code（ソースコードスキャン）** | ソースコードをスキャンし、結果を SARIF で出力 → Issue 1 件を自動作成（QA ラベル付き） |

3 ジョブは並列実行される。いずれも `continue-on-error: true` のため、検出があってもワークフロー全体は成功扱いになる。

---

## 各ジョブの詳細

### 1. Frontend / Backend（スナップショット）

- **test**: 現在の依存関係に既知の脆弱性がないかチェック。結果は Actions のログに出力。
- **monitor**: プロジェクトのスナップショットを Snyk に送信。Snyk ダッシュボード上では **Source: CI/CLI** のプロジェクトとして表示される。

**ポイント**

- CI/CLI で送ったスナップショットからは、Snyk は **Fix PR / Backlog PR を自動作成しない**（仕様）。
- 依存関係の修正 PR を出したい場合は、Snyk の **GitHub 連携**（UI からリポジトリをインポートしたプロジェクト）で「Fix PRs」「Backlog PRs」を有効にし、必要に応じて GitHub PAT を登録する。

### 2. Snyk Code（ソースコードスキャン）

1. **Snyk Code test**  
   `snyk code test --sarif-file-output=snyk-code.sarif` でスキャンし、結果を SARIF ファイルに出力する。

2. **Issue 本文の生成**  
   SARIF を `jq` で解析し、次の形式の Markdown を生成する。
   - スキャン日時・検出件数
   - **サマリー（ルール別）**: 表形式（ルール名 | 件数）
   - **詳細（ルール別）**: ルールごとに見出しを付け、`ファイル:行 — メッセージ` のリストを列挙

3. **Issue 起票**  
   `gh issue create` でタイトル「Snyk Code スキャン結果（セキュリティ・リファクタ用）」・ラベル「QA」を付けて 1 件作成する。

コードの自動修正は行わず、**リファクタ用のタスク一覧**として Issue を残す運用である。

---

## 依存関係の Fix PR / Backlog PR について

| 取り込み方 | Snyk 上の Source | Fix PR / Backlog PR |
|------------|------------------|----------------------|
| 本ワークフローの `snyk monitor` | CI/CLI | ❌ 作成されない |
| Snyk UI で GitHub からリポジトリをインポート | GitHub | ✅ 設定で有効化可能 |

- **Fix PRs**: 新規に検出された脆弱性（または新しく修正が利用可能になったもの）に対して PR を 1 本自動作成。
- **Backlog PRs**: 既知のバックログの脆弱性を Priority Score 等に基づき PR で順次起票。

GitHub 連携でインポートしたプロジェクトでは、Integrations → GitHub で「Backlog PRs」等を ON にし、必要なら **GitHub PAT**（Fix PR 用トークン）を登録する。PAT が未設定だと、OAuth 連携の場合は Fix PR が作成されないことがある。

---

## 事前準備

| 項目 | 内容 |
|------|------|
| **SNYK_TOKEN** | Snyk の API トークン。[Snyk Account](https://app.snyk.io/account) で発行し、GitHub リポジトリの **Secrets** に `SNYK_TOKEN` として登録する。 |
| **QA ラベル** | Snyk Code の Issue に付与するラベル。リポジトリに「QA」ラベルが存在する必要がある。 |

---

## Issue 本文の例（スキャン結果）

```markdown
## Snyk Code スキャン結果

**スキャン日時:** 2026-02-16T21:48:16Z
**検出件数:** 9件

### サマリー（ルール別）

| ルール | 件数 |
|--------|------|
| javascript/WebCookieSecureDisabledByDefault | 1件 |
| python/NoHardcodedCredentials/test | 2件 |
| python/Ssrf/test | 6件 |

### 詳細（ルール別）

#### javascript/WebCookieSecureDisabledByDefault
- `figma/src/app/components/ui/sidebar.tsx:86` — Cookie misses the Secure attribute...
#### python/NoHardcodedCredentials/test
- `backend/scripts/insert_azure_test_user.py:30` — ...
...
```

---

## 参考リンク

- [Snyk 公式ドキュメント](https://docs.snyk.io/)
- [Snyk CLI](https://docs.snyk.io/snyk-cli/)
- [GitHub Actions for Snyk](https://docs.snyk.io/developer-tools/snyk-ci-cd-integrations/github-actions-for-snyk-setup-and-checking-for-vulnerabilities/)
