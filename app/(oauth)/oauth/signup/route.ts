import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { GetAccessToken } from '@/service/authorization';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || (await getCookie('device_id'));
  const access = searchParams.get('access') || (await getCookie('tempToken'));

  if (!id || !access) {
    return NextResponse.json({ error: 'Missing id or state' }, { status: 400 });
  }
  // 분기점

  try {
    await GetAccessToken({ id, access });
    await deleteCookie('tempToken');
    await deleteCookie('device_id');
    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    const err = error as APIErrorResponse;
    if (err.code === 'U007') {
      // U007은 회원가입이 필요한 경우
      await setCookie('device_id', id);
      await setCookie('tempToken', access);
      return NextResponse.redirect(new URL('/signup/agree', req.url));
    } else if (err.msg === '401 Unauthorized') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.json({ error: `${err.msg} [${err.code}]` });
  }
}
