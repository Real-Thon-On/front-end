import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { GetAccessToken } from '@/service/authorization';
import { deleteCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const access = searchParams.get('access');

  if (!id || !access) {
    return NextResponse.json({ error: 'Missing id or state' }, { status: 400 });
  }

  try {
    await GetAccessToken({ id, access });

    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    const err = error as APIErrorResponse;
    if (err.code === 'U007') {
      return NextResponse.redirect(new URL('/signup/complete', req.url));
    } else if (err.msg === '401 Unauthorized') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.json({ error: `${err.msg} [${err.code}]` });
  }
}
