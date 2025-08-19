import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse, TagTypeEN } from '@/constants/types';
import { GetBoardPosts } from '@/service/board';
import { deleteCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json({ success: false, message: 'Tag is required' }, { status: 400 });
  }

  const param = tag as TagTypeEN;

  try {
    const res = await GetBoardPosts(param);

    return NextResponse.json({
      success: res.success,
      data: res.data || [],
    });
  } catch (error) {
    const err = error as APIErrorResponse;

    if (err.code === 'C001') {
      deleteCookie('accessToken');
      return NextResponse.redirect(new URL('/signin', req.url));
    } else {
      return NextResponse.json({ success: false, message: err.msg }, { status: 500 });
    }
  }
}
