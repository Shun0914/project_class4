# 認証実装後の修正TODO

## 現在の実装状況

### ✅ 既に実装済み
1. **エンドポイント**: `GET /api/analyze`（coachパラメータなし）
2. **コーチモード**: `user_obj.coach_mode`から取得（設定から取得）
3. **エンプティ状態**: `has_expenses`, `has_budget`フラグで対応
4. **再分析**: `/api/ai-analyze`エンドポイントで対応

### ⚠️ 認証実装待ち

#### analyze.py の修正

**現在（仮実装）**
```python
@router.get("/analyze", response_model=AnalyzeResponse)
def analyze(
    user: str = Query(..., description="ユーザー名"),  # 仮実装：認証後は削除
    db: Session = Depends(get_db)
):
    user_obj = db.query(User).filter(User.username == user).first()
    coach = user_obj.coach_mode  # 設定から取得
```

**認証実装後**
```python
@router.get("/analyze", response_model=AnalyzeResponse)
def analyze(
    current_user: User = Depends(get_current_user),  # 認証から取得
    db: Session = Depends(get_db)
):
    user_obj = current_user
    coach = user_obj.coach_mode  # 設定から取得（変更なし）
```

#### ai-analyze.py の修正も同様

**現在（仮実装）**
```python
@router.get("/ai-analyze", response_model=AIAnalyzeResponse)
def ai_analyze(
    user: str = Query(..., description="ユーザー名"),  # 仮実装：認証後は削除
    db: Session = Depends(get_db)
):
    user_obj = db.query(User).filter(User.username == user).first()
```

**認証実装後**
```python
@router.get("/ai-analyze", response_model=AIAnalyzeResponse)
def ai_analyze(
    current_user: User = Depends(get_current_user),  # 認証から取得
    db: Session = Depends(get_db)
):
    user_obj = current_user
```

## まとめ

機能的には完全実装済み。認証機能実装後、URLパラメータ`user`を`Depends(get_current_user)`に置き換えるだけで完了。
