/**
 * 認証関連のAPI関数
 */
import { get, post, patch } from './client';
import type { User, SignupRequest, LoginRequest, GoogleAuthRequest, SetupRequest, UpdateProfileRequest, ChangePasswordRequest, TokenResponse } from '../types/auth';

/** サインアップ */
export async function signup(data: SignupRequest): Promise<TokenResponse> {
  return post<TokenResponse>('/api/auth/signup', data);
}

/** ログイン */
export async function login(data: LoginRequest): Promise<TokenResponse> {
  return post<TokenResponse>('/api/auth/login', data);
}

/** Google認証 */
export async function googleAuth(data: GoogleAuthRequest): Promise<TokenResponse> {
  return post<TokenResponse>('/api/auth/google', data);
}

/** ログアウト */
export async function logout(): Promise<void> {
  await post<void>('/api/auth/logout');
}

/** 初期設定を保存 */
export async function setupProfile(data: SetupRequest): Promise<User> {
  return post<User>('/api/auth/setup', data);
}

/** プロフィール更新 */
export async function updateProfile(data: UpdateProfileRequest): Promise<User> {
  return patch<User>('/api/auth/me', data);
}

/** パスワード変更 */
export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  await post<void>('/api/auth/change-password', data);
}

/** 現在のユーザー情報を取得 */
export async function getMe(): Promise<User> {
  return get<User>('/api/auth/me');
}
