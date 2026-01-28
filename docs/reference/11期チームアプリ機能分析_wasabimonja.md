# 11期チームアプリ機能分析：wasabimonja（サブスク解約サービス）

## プロジェクト概要

**wasabimonja**は、銀行口座・クレジットカード明細書からサブスクリプション（定期課金サービス）を自動検出し、解約支援を行うサービスです。

### 技術スタック
- **フロントエンド**: Next.js (TypeScript), Tailwind CSS
- **バックエンド**: FastAPI (Python)
- **データベース**: Azure Database for MySQL
- **AI**: OpenAI GPT-4o Vision API（OCR・明細解析）
- **決済**: Stripe
- **認証**: JWT, Google OAuth

---

## 主要機能

### 1. 明細書解析機能（AI駆動）

#### 対応ファイル形式
- **PDF**: PyMuPDF (fitz)で画像変換後、GPT-4o Vision APIで解析
- **画像**: PNG, JPG, JPEG, GIF, WEBP（画像前処理でOCR精度向上）
- **CSV**: 文字コード自動判定（UTF-8, Shift_JIS, CP932）

#### 解析プロセス
```python
# CSV処理の特徴
- 定期性パターン検出（月次間隔25-35日）
- サービス名正規化（表記揺れ対応）
- 年額/月額の自動判定
- 決済代行サービス（Stripe/PayPal等）の特別処理
```

#### サービス名正規化
- 500以上のサービス名マッピング（Netflix, Spotify, Adobe等）
- 表記揺れ対応（全角/半角、記号統一）
- 部分一致検索（誤爆防止機能付き）

#### OCR精度向上
- 画像アップスケール（最低1500px幅）
- コントラスト・シャープネス強調
- ノイズ除去（MedianFilter）
- リトライ機能（OCR失敗時）

### 2. 認証機能

#### メール認証フロー
1. 仮登録 → 認証メール送信
2. メール内リンククリック → トークン検証
3. ニックネーム・パスワード設定 → 本登録完了

#### Google OAuth
- Google IDトークン検証
- 自動アカウント作成
- JWTトークン発行

#### セキュリティ
- JWT認証（Bearer Token）
- パスワードハッシュ化（bcrypt）
- トークン有効期限管理

### 3. 検出履歴管理

#### データモデル
```python
DetectionHistory:
  - id (UUID)
  - user_id
  - uploaded_files_count
  - detected_subscriptions_count
  - total_monthly_amount
  - created_at

HistorySubscription:
  - id (UUID)
  - detection_history_id
  - name (サービス名)
  - monthly_price / yearly_price
  - category
  - canceled (解約フラグ)
  - confidence (確信度)
  - official_url / cancel_url
  - raw_merchant (明細表記)
  - is_yearly_detected
```

#### API機能
- 履歴一覧取得（ページネーション対応）
- 履歴詳細取得
- 解約ステータス更新（チェックボックス）
- 履歴削除

### 4. サービスマスター機能

#### マスターデータ管理
- サービス名 → 公式URL・解約URLのマッピング
- AI検出結果とマスターの統合
- カテゴリ分類

### 5. 決済機能（Stripe）

#### 機能
- Checkout Session作成
- Webhook処理（決済完了通知）
- 決済履歴取得
- 決済検証

#### 価格設定
- 月額1,980円（固定）

---

## gen12への統合可能性

### 高優先度

#### 1. 明細書解析機能（AI駆動）
**統合価値**: ⭐⭐⭐⭐⭐
- gen12のCSV解析を大幅に強化
- PDF・画像対応でユーザビリティ向上
- サービス名正規化で検出精度向上

**実装アプローチ**:
```python
# gen12のanalyze機能を拡張
@app.post("/api/analyze")
async def analyze_files(files: List[UploadFile]):
    # PDF/画像/CSVの統合処理
    # サービス名正規化適用
    # 定期性パターン検出
```

**データモデル拡張**:
- `raw_merchant`フィールド追加（明細表記保存）
- `confidence`フィールド追加（確信度）
- `is_yearly_detected`フラグ追加

#### 2. サービス名正規化機能
**統合価値**: ⭐⭐⭐⭐⭐
- 500以上のサービス名マッピング
- 表記揺れ対応（全角/半角、記号統一）
- gen12の検出精度を大幅向上

**実装アプローチ**:
```python
# normalize_service_name関数を移植
SERVICE_NAME_MAPPING = {...}  # 500以上のマッピング
def normalize_service_name(name: str) -> str:
    # 正規化ロジック
```

#### 3. 定期性パターン検出（CSV）
**統合価値**: ⭐⭐⭐⭐
- CSVから自動で定期支払いを検出
- 月次間隔チェック（25-35日）
- 未知のサブスク発見に有効

**実装アプローチ**:
```python
def parse_csv_and_detect_recurring(csv_text: str):
    # 取引をグルーピング
    # 月次間隔チェック
    # 定期候補を優先分析
```

### 中優先度

#### 4. 検出履歴管理
**統合価値**: ⭐⭐⭐
- 過去の解析結果を保存・参照可能
- 解約ステータス管理
- gen12の履歴機能を強化

**実装アプローチ**:
- gen12の既存データモデルに履歴テーブル追加
- 解約フラグ機能追加

#### 5. OCR精度向上（画像前処理）
**統合価値**: ⭐⭐⭐
- 画像のアップスケール・コントラスト強調
- OCR精度向上で検出率改善

**実装アプローチ**:
```python
def enhance_image_for_ocr(image_bytes: bytes) -> bytes:
    # PIL/Pillowで画像前処理
    # アップスケール、コントラスト強調
```

### 低優先度（参考）

#### 6. 決済機能（Stripe）
**統合価値**: ⭐
- gen12は無料サービス想定のため、現時点では不要
- 将来的な有料化時に参考

#### 7. メール認証フロー
**統合価値**: ⭐⭐
- gen12の認証要件次第
- セキュリティ強化が必要な場合に参考

---

## コードパターン・実装のポイント

### 1. エラーハンドリング
```python
# JSON抽出失敗時のリトライ
if result_json is None:
    retry_response = client.chat.completions.create(...)
```

### 2. データ正規化
```python
# サービス名・取引先名の正規化
normalize_service_name(name)
normalize_merchant(merchant)
```

### 3. 定期性検出アルゴリズム
```python
# 月次間隔チェック（25-35日）
def is_monthly_interval(dates: List[datetime]) -> bool:
    intervals = [(dates[i] - dates[i-1]).days for i in range(1, len(dates))]
    monthly_hits = sum(1 for d in intervals if 25 <= d <= 35)
```

### 4. 画像前処理
```python
# OCR精度向上のための前処理
- アップスケール（最低1500px幅）
- コントラスト・シャープネス強調
- ノイズ除去
```

---

## データモデル拡張案

### gen12の既存モデルに追加すべきフィールド

```python
# Subscriptionモデル拡張
class Subscription(BaseModel):
    # 既存フィールド
    name: str
    price: int
    
    # 追加フィールド（wasabimonjaから）
    raw_merchant: Optional[str]  # 明細表記
    confidence: Optional[float]  # 確信度（0.0-1.0）
    is_yearly_detected: bool  # 年額検出フラグ
    monthly_price: int  # 推定月額
    yearly_price: int  # 推定年額
    official_url: Optional[str]
    cancel_url: Optional[str]
```

---

## まとめ

wasabimonjaの最大の強みは**AI駆動の明細書解析機能**と**サービス名正規化**です。gen12に統合することで：

1. **検出精度の向上**: 500以上のサービス名マッピングで表記揺れに対応
2. **ファイル形式の拡張**: PDF・画像対応でユーザビリティ向上
3. **定期性パターン検出**: CSVから自動で定期支払いを発見
4. **OCR精度向上**: 画像前処理で検出率改善

特に**サービス名正規化機能**は、gen12のCSV解析機能を大幅に強化する可能性が高いです。
