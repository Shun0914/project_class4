/** ユーザー情報 */
export interface User {
  id: number;
  username: string;
  nickname: string | null;
  report_enabled: boolean;
  coach_mode: string;
}

/** サインアップリクエスト */
export interface SignupRequest {
  username: string;
  password: string;
}

/** ログインリクエスト */
export interface LoginRequest {
  username: string;
  password: string;
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

/** パスワード変更リクエスト */
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

/** Google認証リクエスト */
export interface GoogleAuthRequest {
  access_token: string;
}

/** 認証コンテキストの型 */
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  googleLogin: (accessToken: string) => Promise<void>;
  setupProfile: (data: SetupRequest) => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  logout: () => void;
}
