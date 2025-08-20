import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

const AUTH_PAGES = ['/signin', '/signup/*', '/pwa-debug', '/oauth/*'] as const;
const AUTHED_REDIRECT = '/';

// 정규식 이스케이프
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** pattern 매칭:
 * - '.../*' : base와 base 하위 전부 매치
 * - '*' 포함 : glob → 정규식
 * - 기본(별표 없음) : 자신 또는 하위 경로 매치(기존 동작 유지)
 */
function matchPath(pathname: string, patterns: readonly string[]) {
  return patterns.some(pattern => {
    if (pattern.endsWith('/*')) {
      const base = pattern.slice(0, -2);
      return pathname === base || pathname.startsWith(base + '/');
    }
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + escapeRegExp(pattern).replace(/\\\*/g, '.*') + '$');
      return regex.test(pathname);
    }
    // (기존과 동일) '/signin'이면 '/signin'과 '/signin/...'
    return pathname === pattern || pathname.startsWith(pattern + '/');
  });
}

function isAuthPage(pathname: string) {
  return matchPath(pathname, AUTH_PAGES);
}

export default function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const { pathname } = url;

  const access = req.cookies.get('access_token')?.value;
  const isAuthed = Boolean(access);

  if (isAuthPage(pathname)) {
    if (isAuthed) {
      return NextResponse.redirect(new URL(AUTHED_REDIRECT, req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthed) {
    const loginUrl = new URL('/signin', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
