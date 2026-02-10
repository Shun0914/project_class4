"""認証関連のリクエスト/レスポンススキーマ"""
from pydantic import BaseModel, Field


class GoogleAuthRequest(BaseModel):
    """Google認証リクエスト"""
    access_token: str = Field(..., description="GoogleのOAuthアクセストークン")


class TokenResponse(BaseModel):
    """トークンレスポンス"""
    access_token: str
    token_type: str = "bearer"


class SetupRequest(BaseModel):
    """初期設定リクエスト"""
    nickname: str = Field(..., min_length=1, max_length=255, description="ニックネーム")
    report_enabled: bool = Field(True, description="1週間レポートを送信するか")
    coach_mode: str = Field("angel", description="分析設定（devil or angel）")


class UpdateProfileRequest(BaseModel):
    """プロフィール更新リクエスト（全フィールド任意）"""
    nickname: str | None = Field(None, min_length=1, max_length=255, description="ニックネーム")
    username: str | None = Field(None, min_length=3, max_length=255, description="メールアドレス")
    report_enabled: bool | None = Field(None, description="1週間レポートを送信するか")
    coach_mode: str | None = Field(None, description="分析設定（devil or angel）")


class UserResponse(BaseModel):
    """ユーザー情報レスポンス"""
    id: int
    username: str
    nickname: str | None = None
    report_enabled: bool = True
    coach_mode: str = "angel"

    class Config:
        from_attributes = True
