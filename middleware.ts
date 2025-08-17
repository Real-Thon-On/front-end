import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

const AUTH_PAGES = ['/signin', '/signup'];
const AUTHED_REDIRECT = '/';

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some(p => pathname === p || pathname.startsWith(p + '/'));
}

export default function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const { pathname, search } = url;

  const access = req.cookies.get('access_token')?.value;
  const refresh = req.cookies.get('refresh_token')?.value;
  const isAuthed = Boolean(access && refresh);

  // 인증 페이지 접근 로직
  if (isAuthPage(pathname)) {
    if (isAuthed) {
      return NextResponse.redirect(new URL(AUTHED_REDIRECT, req.url));
    }
    // 비로그인 사용자는 인증 페이지 통과
    return NextResponse.next();
  }

  // 그 외 모든 페이지는 보호: 둘 중 하나라도 없으면 로그인으로; 나중에 refresh 토큰 로직 추가 예정
  if (!isAuthed) {
    const loginUrl = new URL('/signin', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
