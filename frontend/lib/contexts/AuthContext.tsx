'use client';

/**
 * 認証コンテキスト
 * アプリ全体でユーザーの認証状態を管理する
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { setToken, removeToken, getToken } from '../api/client';
import * as authApi from '../api/auth';
import type { User, AuthContextType, LoginRequest, SignupRequest, SetupRequest, UpdateProfileRequest, ChangePasswordRequest } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ページ読み込み時にトークンが有効かチェック
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.getMe();
        setUser(currentUser);
      } catch {
        removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const response = await authApi.login(data);
    setToken(response.access_token);
    const currentUser = await authApi.getMe();
    setUser(currentUser);
    // 初期設定未完了ならセットアップページへ
    router.push(currentUser.nickname ? '/' : '/setup');
  }, [router]);

  const signup = useCallback(async (data: SignupRequest) => {
    const response = await authApi.signup(data);
    setToken(response.access_token);
    const currentUser = await authApi.getMe();
    setUser(currentUser);
    router.push('/setup');
  }, [router]);

  const googleLogin = useCallback(async (accessToken: string) => {
    const response = await authApi.googleAuth({ access_token: accessToken });
    setToken(response.access_token);
    const currentUser = await authApi.getMe();
    setUser(currentUser);
    router.push(currentUser.nickname ? '/' : '/setup');
  }, [router]);

  const setupProfile = useCallback(async (data: SetupRequest) => {
    const updatedUser = await authApi.setupProfile(data);
    setUser(updatedUser);
    router.push('/');
  }, [router]);

  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    const updatedUser = await authApi.updateProfile(data);
    setUser(updatedUser);
  }, []);

  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    await authApi.changePassword(data);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, googleLogin, setupProfile, updateProfile, changePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** 認証コンテキストを使用するカスタムフック */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
