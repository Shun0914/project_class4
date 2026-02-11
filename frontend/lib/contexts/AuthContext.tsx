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
  type ReactNode,
} from 'react';

interface User {
  id: number;
  email: string;
  nickname: string;
  coach_mode: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { setToken, removeToken, getToken } from '../api/client';
import * as authApi from '../api/auth';
import type { User, AuthContextType, SetupRequest, UpdateProfileRequest } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // テスト用: 仮のユーザーを設定
    setUser({ 
      id: 1, 
      email: 'test@example.com', 
      nickname: 'testuser',
      coach_mode: 'tenshi'
    });
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
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

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, googleLogin, setupProfile, updateProfile, logout }}>
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
