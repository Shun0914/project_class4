# 12期特別クエスト「半年後の姿」

## プロジェクト概要
11期の半年後輩である**12期生**に、11期が培った技術力と開発フローを「**半年後の姿**」として見せ、技術的な驚きと学びを与えるプロジェクトです。

12期生が作成した**家計簿アプリ（gen12）**を土台に、11期各チームが **Step3-2 で取り組んだプロダクトのエッセンス**（くんよみ・MOF・wasabimonja 等の知見や機能アイデア）を反映し、**家計簿アプリとしての質**を一段高めます。誰にどんな価値を届けるか・誰のどんな課題を解決するかは [プロダクトビジョン](./docs/requirements/プロダクトビジョン.md) を参照してください。

## プロジェクト構造
```
project_class4/
├── gen12/              # 12期生が作成したアプリ（参考用）
│   ├── main.py
│   ├── index.html
│   ├── style.css
│   ├── data.csv
│   └── README
├── frontend/           # フロントエンド（11期が改造・開発）
│   ├── app/                # Next.js App Router
│   ├── components/         # 共通コンポーネント
│   ├── lib/api/            # APIクライアント (client.ts等)
│   ├── public/             # 静的資産
│   ├── types/              # 型定義
│   ├── eslint.config.mjs   # ESLint設定
│   ├── next.config.ts      # Next.js設定
│   ├── package.json        # Node.js依存関係
│   ├── postcss.config.mjs  # CSSプリプロセッサ設定
│   └── tsconfig.json       # TypeScript設定
├── backend/            # バックエンド（11期が改造・開発）
│   ├── alembic/            # データベース移行関連
│   ├── app/                # アプリケーション本体
│   ├── scripts/            # ユーティリティスクリプト
│   ├── alembic.ini         # Alembic設定
│   └── requirements.txt    # Pythonパッケージ依存関係
└── docs/               # プロジェクトドキュメント
    ├── requirements/    # 要件定義書系
    │   ├── プロダクトビジョン.md   # 誰に・価値・課題（ビジネス要件）
    │   ├── 機能一覧.md
    │   ├── 基本要件定義書.md
    │   └── 非機能要件.md
    ├── design/          # 設計書系
    │   └── テーブル定義.md
    ├── reference/       # 参考資料系
    │   ├── PROJECT_CONTEXT.md          # プロジェクトコンテキスト
    │   └── gen12_current_state.md      # 12期アプリの現状分析
    ├── tasks/           # タスク分割・スプリント単位
    │   └── task_breakdown_sprint0.md   # Sprint 0 タスク分割
    ├── org/              # 体制図
    │   ├── 体制図.md
    │   └── 体制図.png
    └── setup/           # セットアップ関連
        ├── setup.md      # 開発環境構築手順
        ├── db_setup.md   # TBL移行手順
        ├── github_workflow.md
        └── azure_deployment_guide.md  # Azure 本番デプロイ手順
```

**注意**: `gen12/`は12期生が作成した参考アプリです。実際の開発は`frontend/`と`backend/`で行います。

## スケジュール

| フェーズ | 期間 | 状況 |
| :--- | :--- | :--- |
| **Sprint 0** | 〜2/3 | 休息・準備期（要件・UI確定） |
| **Sprint 1** | 2/4 〜 2/10 | 開発開始 |
| **Sprint 2** | 2/11 〜 2/17 | 全員合流・最終調整 |

**最終納期**: 2月17日

## 開発ワークフロー
- **Issue/PR管理**: GitHub Issue/PRベースの開発フロー

## チームメンバー
| ニックネーム | GitHub |
|-------------|--------|
| しゅんすけ | [Shun0914](https://github.com/Shun0914) |
| まっちゃん | [maccha-n](https://github.com/maccha-n) |
| まーP | [nomogulnolife-pixel](https://github.com/nomogulnolife-pixel) |
| たも | [hikarumae](https://github.com/hikarumae) |
| よこち | [Yoko-dev](https://github.com/Yoko-dev) |
| なおみん | [Ogura-Naomi](https://github.com/Ogura-Naomi) |
| くぼしー | [misakikuboshima](https://github.com/misakikuboshima) |
| つね | [ryotsunekawa](https://github.com/ryotsunekawa) |
| くまぷー | [kuma0120](https://github.com/kuma0120) |
| がうら | [kimiyya](https://github.com/kimiyya) |

## ドキュメント

### 要件定義
- [プロダクトビジョン（誰に・価値・課題）](./docs/requirements/プロダクトビジョン.md)
- [機能一覧](./docs/requirements/機能一覧.md)
- [基本要件定義書](./docs/requirements/基本要件定義書.md)
- [非機能要件](./docs/requirements/非機能要件.md)

### 設計
- [テーブル定義](./docs/design/テーブル定義.md)

### タスク
- [Sprint 0 タスク分割](./docs/tasks/task_breakdown_sprint0.md)

### 体制
- [体制図](./docs/org/体制図.md)

### 参考資料
- [プロジェクトコンテキスト](./docs/reference/PROJECT_CONTEXT.md)
- [12期アプリの現状分析](./docs/reference/gen12_current_state.md)
- [11期チームアプリ機能分析](./docs/reference/11期チームアプリ機能分析_サマリー.md)
  - [くんよみ機能分析](./docs/reference/11期チームアプリ機能分析_くんよみ.md)
  - [MOF機能分析](./docs/reference/11期チームアプリ機能分析_MOF.md)
  - [wasabimonja機能分析](./docs/reference/11期チームアプリ機能分析_wasabimonja.md)

### セットアップ
- [GitHubワークフロー手順書](./docs/setup/github_workflow.md)
- [開発環境セットアップ手順](./docs/setup/setup.md)
- [TBL移行手順](./docs/setup/db_setup.md)
- [Azure デプロイ手順書](./docs/setup/azure_deployment_guide.md)（本番環境）

---
*プロジェクト開始日: 2026年1月28日*
