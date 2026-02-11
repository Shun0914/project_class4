/**
 * APIクライアントのベース設定
 */

// 環境変数からAPIのベースURLを取得（デフォルトはローカル開発環境）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/** localStorageのトークンキー */
const TOKEN_KEY = 'access_token';

/** トークンの取得 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** トークンの保存 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** トークンの削除 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * APIエラークラス
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * APIリクエストの共通処理
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const safeEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${safeEndpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 認証トークンがあれば追加
  const token = getToken();
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
    let errorData: unknown;

    try {
      errorData = await response.json();
      if (errorData && typeof errorData === 'object' && 'detail' in errorData) {
        errorMessage = String(errorData.detail);
      }
    } catch {
      // JSON解析に失敗した場合は、テキストとして取得を試みる
      try {
        const text = await response.text();
        errorMessage = text || errorMessage;
      } catch {
        // 何もしない
      }
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  // レスポンスが空の場合はnullを返す
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return null as T;
  }

  return response.json();
}

/**
 * GETリクエスト
 */
export async function get<T>(endpoint: string): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'GET',
  });
}

/**
 * POSTリクエスト
 */
export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUTリクエスト
 */
export async function put<T>(endpoint: string, data?: unknown): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCHリクエスト
 */
export async function patch<T>(endpoint: string, data?: unknown): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETEリクエスト
 */
export async function del<T>(endpoint: string): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'DELETE',
  });
}

