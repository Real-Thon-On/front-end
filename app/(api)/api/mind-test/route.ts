import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse, MindTestType } from '@/constants/types';
import { GetMindTestList } from '@/service/mindTest';
import { deleteCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ success: false, message: 'Type is required' }, { status: 400 });
  }

  const param = type.toUpperCase() as MindTestType;
  console.log('param', param);
  try {
    const res = await GetMindTestList(param);

    return NextResponse.json(
      { data: res },
      {
        status: 200,
      }
    );
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
