"""認証関連のAPIエンドポイント"""
import uuid
import urllib.request
import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.user import User
from app.schemas.auth import SignupRequest, LoginRequest, GoogleAuthRequest, SetupRequest, UpdateProfileRequest, ChangePasswordRequest, TokenResponse, UserResponse
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter(prefix="/api/auth", tags=["認証"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """新規ユーザー登録"""
    # ユーザー名の重複チェック
    existing_user = db.query(User).filter(User.username == request.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="このユーザー名は既に使用されています",
        )

    # ユーザー作成
    hashed_password = get_password_hash(request.password)
    new_user = User(
        username=request.username,
        password_hash=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # トークン生成して返却（サインアップ後そのままログイン状態にする）
    access_token = create_access_token(data={"sub": str(new_user.id)})
    return TokenResponse(access_token=access_token)


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """ログイン"""
    user = db.query(User).filter(User.username == request.username).first()
    if not user or not user.password_hash or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ユーザー名またはパスワードが正しくありません",
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return TokenResponse(access_token=access_token)


@router.post("/google", response_model=TokenResponse)
def google_auth(request: GoogleAuthRequest, db: Session = Depends(get_db)):
    """Google認証（ログインまたは自動登録）"""
    # Googleのアクセストークンでユーザー情報を取得
    try:
        req = urllib.request.Request(
            f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={request.access_token}"
        )
        with urllib.request.urlopen(req) as resp:
            userinfo = json.loads(resp.read().decode())
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="無効なGoogleトークンです",
        )

    google_id = userinfo["sub"]
    email = userinfo.get("email", "")

    # 既存ユーザーを google_id で検索
    user = db.query(User).filter(User.google_id == google_id).first()

    if not user:
        # Google ID で見つからない場合、メールと同じ username がないか確認
        user = db.query(User).filter(User.username == email).first()
        if user:
            # 既存アカウントに google_id を紐付け
            user.google_id = google_id
            db.commit()
        else:
            # 新規ユーザー作成（パスワードなし）
            user = User(
                username=email or f"google_{uuid.uuid4().hex[:8]}",
                google_id=google_id,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

    access_token = create_access_token(data={"sub": str(user.id)})
    return TokenResponse(access_token=access_token)


@router.post("/logout")
def logout():
    """ログアウト（クライアント側でトークンを破棄する）"""
    return {"message": "ログアウトしました"}


@router.post("/setup", response_model=UserResponse)
def setup_profile(request: SetupRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """初期設定（ニックネーム・レポート・分析設定）"""
    if request.coach_mode not in ("devil", "angel"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="coach_mode は 'devil' または 'angel' を指定してください",
        )

    current_user.nickname = request.nickname
    current_user.report_enabled = request.report_enabled
    current_user.coach_mode = request.coach_mode
    db.commit()
    db.refresh(current_user)
    return current_user


@router.patch("/me", response_model=UserResponse)
def update_profile(request: UpdateProfileRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """プロフィール更新（指定されたフィールドのみ更新）"""
    if request.nickname is not None:
        current_user.nickname = request.nickname
    if request.username is not None:
        existing = db.query(User).filter(User.username == request.username, User.id != current_user.id).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="このメールアドレスは既に使用されています",
            )
        current_user.username = request.username
    if request.report_enabled is not None:
        current_user.report_enabled = request.report_enabled
    if request.coach_mode is not None:
        if request.coach_mode not in ("devil", "angel"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="coach_mode は 'devil' または 'angel' を指定してください",
            )
        current_user.coach_mode = request.coach_mode
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/change-password")
def change_password(request: ChangePasswordRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """パスワード変更"""
    if not current_user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google認証アカウントはパスワードを変更できません",
        )
    if not verify_password(request.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="現在のパスワードが正しくありません",
        )
    current_user.password_hash = get_password_hash(request.new_password)
    db.commit()
    return {"message": "パスワードを変更しました"}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """現在のユーザー情報を取得"""
    return current_user
