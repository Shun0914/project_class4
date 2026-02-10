/** ユーザー情報 */
export interface User {
  id: number;
  username: string;
  nickname: string | null;
  report_enabled: boolean;
  coach_mode: string;
}

/** トークンレスポンス */
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

/** 初期設定リクエスト */
export interface SetupRequest {
  nickname: string;
  report_enabled: boolean;
  coach_mode: string;
}

/** プロフィール更新リクエスト（全フィールド任意） */
export interface UpdateProfileRequest {
  nickname?: string;
  username?: string;
  report_enabled?: boolean;
  coach_mode?: string;
}

/** Google認証リクエスト */
export interface GoogleAuthRequest {
  access_token: string;
}

/** 認証コンテキストの型 */
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  googleLogin: (accessToken: string) => Promise<void>;
  setupProfile: (data: SetupRequest) => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  logout: () => void;
}