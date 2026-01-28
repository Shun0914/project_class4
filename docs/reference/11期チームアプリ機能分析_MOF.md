# MOF - AI文書管理システム機能分析

## 概要
11期チームが開発した「MOF」- AI文書管理システム（自動仕分け＆版管理）の機能を分析したドキュメントです。

**リポジトリ**: 
- フロントエンド: https://github.com/hikarumae/MOF.git
- バックエンド: https://github.com/hikarumae/MOF_version

**分析ベース**: 実際のコード（GitHubリポジトリ）

---

## 技術スタック
- **フロントエンド**: Next.js, TypeScript, Tailwind CSS
- **バックエンド**: Flask, Python
- **ストレージ**: Azure Storage Blob
- **データベース**: Azure Table Storage
- **AI**: Azure OpenAI (GPT-4o)
- **デプロイ**: Azure App Service

---

## 実装されている主要機能（コードから確認）

### 1. PDF自動仕分け機能

#### 処理フロー
1. Azure Storageの`mof2-blob-new`コンテナを監視（10秒間隔）
2. PDFファイルを検知したら自動処理開始
3. `pdf_analyzer.py`でPDF解析:
   - 1ページ目冒頭2000文字を抽出
   - 最終ページ末尾2000文字を抽出
   - 1ページ目を画像化（base64エンコード）
4. `ai_judge.py`でGPT-4oが判定:
   - カテゴリ判定（契約書/社内規定/請求書/その他）
   - 日付抽出（施行日、改訂日、契約締結日など）
   - 対象の特定（取引先名、書類タイトルなど）
5. `blob_organizer.py`でファイル整理:
   - 最新版判定（日付比較）
   - 最新版は`mof2-blob-all`に保存
   - 旧版は`mof2-blob-old`にリネームして保存
   - Azure Table Storageにメタデータ保存

#### コードの特徴
- 監視ループは別スレッドで実行（Flaskサーバーと並行）
- GPT-4oのVision APIを使用（画像も解析）
- 厳格なルールベースの判定（推測を排除）
- 版管理の自動化（最新版/旧版の自動整理）

**参考ファイル**:
- `main_app.py`: 監視ループとFlaskサーバー
- `pdf_analyzer.py`: PDF解析処理
- `ai_judge.py`: GPT-4oによる判定処理
- `blob_organizer.py`: ファイル整理と版管理

---

### 2. 検索・質問応答機能

#### エンドポイント
- フロントエンドから`/ask?q={質問文}`を呼び出し
  - 回答テキストとソース情報（ファイル名、URI、カテゴリ、ページ、テキスト）を返す
- バックエンドには`/search`エンドポイントも実装（RAG検索用、Azure Cognitive Search使用）

#### フロントエンド実装
- `useFileSearch.ts`: 検索ロジックをカスタムフックで実装
- タイムアウト処理（30秒）
- 検索結果からファイル名を抽出してメタデータ取得
- Azure Table Storageからメタデータ（カテゴリ、日付、タイトル）を取得

#### コードの特徴
- 検索結果のメタデータを動的に取得・更新
- ファイル名からURIを抽出してメタデータと照合
- AI回答とソース情報の両方を表示

**参考ファイル**:
- `app/main.py`: FastAPIエンドポイント（`/search`）
- `app/search.py`: Azure Cognitive Searchを使用したRAG検索
- `src/hooks/useFileSearch.ts`: フロントエンドの検索フック

---

### 3. ファイルアップロード機能

#### フロントエンド実装
- ドラッグ&ドロップ対応
- Next.js API Route (`/api/upload`) で実装
- Azure Storageの`mof2-blob-new`コンテナにアップロード
- メタデータ（カテゴリ、日付）も同時に保存

#### コードの特徴
- Next.jsのAPI Routeで実装
- Azure Storage Blob SDKを使用
- メタデータをblobのmetadataとして保存

**参考ファイル**:
- `src/app/page.tsx`: ドラッグ&ドロップUI
- `src/app/api/upload/route.ts`: アップロード処理

---

### 4. 版管理機能

#### 機能詳細
- Azure Table Storageで最新版を管理
- 日付比較による最新版判定
- 旧版の自動アーカイブ（リネームして保存）
- メタデータの自動更新

#### コードの特徴
- `blob_organizer.py`で版管理ロジックを実装
- PartitionKey（カテゴリ）とRowKey（対象）で管理
- 最新日付（LatestDate）で比較

**参考ファイル**:
- `blob_organizer.py`: 版管理ロジック

---

## gen12への組み込み可能性

### 最高優先度

#### レシート画像の自動認識・入力
- **実装のしやすさ**: ⭐⭐⭐⭐
- **組み込み方法**: 
  1. 画像アップロード機能（MOFの`/api/upload`を参考）
  2. AI解析機能（`pdf_analyzer.py`と`ai_judge.py`を参考）
  3. データ自動入力（抽出結果をgen12の支出記録フォームに自動入力）
- **gen12での活用**: 
  - レシートを撮影するだけで支出記録が自動入力
  - 手入力の手間を大幅に削減
  - 金額や日付の入力ミスを防止

**必要なコード**:
- `backend/app/routers/receipts.py`を作成
  - `POST /api/receipts/upload`: 画像アップロード
  - `POST /api/receipts/analyze`: AI解析（GPT-4 Vision）
- `backend/app/utils/receipt_analyzer.py`を作成（`pdf_analyzer.py`を参考）
- `backend/app/utils/receipt_judge.py`を作成（`ai_judge.py`を参考）
- フロントエンドに画像アップロードUIを追加

### 中優先度

#### 検索機能の強化
- **実装のしやすさ**: ⭐⭐⭐
- **組み込み方法**: MOFの`/ask` APIを参考に、自然言語での検索機能
- **gen12での活用**: 
  - 「今月の食費は？」「コーヒーを買ったのはいつ？」などの質問に対応
  - 自然言語での支出検索

---

## 参考コード

### PDF解析処理
```python
# pdf_analyzer.py
import fitz  # PyMuPDF
import base64

def extract_pdf_content(blob_data):
    """1ページ目冒頭2000文字 + 最終ページ末尾2000文字 + 1ページ目画像を抽出"""
    doc = fitz.open(stream=blob_data, filetype="pdf")
    # 1ページ目のテキスト（2000文字）
    # 最終ページのテキスト（末尾2000文字）
    # 1ページ目を画像化（base64エンコード）
    return text_head, text_tail, base64_image
```

### AI判定処理
```python
# ai_judge.py
from openai import AzureOpenAI

def get_judgment(text_head, text_tail, base64_image, company_name="たも株式会社"):
    client = AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version="2024-02-15-preview"
    )
    
    prompt = f"""
    あなたは精密な文書管理システムです。
    【解析対象データ】の中に記載されている情報のみを使用して判定してください。
    
    【カテゴリ判定（document_type）】
    ・内容から「契約書」「社内規定」「請求書」「その他」のいずれかに分類してください。
    
    【日付抽出ルール（identified_date）】
    必ず【解析対象データ】内に明記されている日付から抽出してください。
    
    【対象の特定ルール（target_entity）】
    必ず【解析対象データ】内に明記されている情報から抽出してください。
    
    【解析対象データ】
    text_head: {text_head}
    text_tail: {text_tail}
    """
    
    content = [{"type": "text", "text": prompt}]
    if base64_image:
        content.append({"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64_image}"}})
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": content}],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)
```

### 監視ループ
```python
# main_app.py
def monitor_loop():
    # Azure Storageのmof2-blob-newコンテナを監視（10秒間隔）
    # PDFファイルを検知したら自動処理
    # 別スレッドで実行（Flaskサーバーと並行）
    while True:
        # PDF検知 → 解析 → AI判定 → ファイル整理
        time.sleep(10)
```

---

**作成日**: 2026年1月28日  
**作成者**: しゅんすけ  
**ステータス**: 参考資料
