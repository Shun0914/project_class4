/**
 * 認証ミドルウェア
 * localStorageベースのため、実際の認証チェックはクライアントサイドのAuthContextで行う
 * cookieベースに移行する場合はここで検証可能
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/signup', '/setup', '/settings', '/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
