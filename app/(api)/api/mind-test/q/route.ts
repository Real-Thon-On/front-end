import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse, MindTestType } from '@/constants/types';
import { GetMindTestQuestionList } from '@/service/mindTest';
import { deleteCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'id is required' }, { status: 400 });
  }

  const idNumber = Number(id);

  try {
    const res = await GetMindTestQuestionList(idNumber);

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
