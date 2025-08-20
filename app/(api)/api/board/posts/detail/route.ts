import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse, TagTypeEN } from '@/constants/types';
import { GetBoardComments, GetBoardPostDetail } from '@/service/board';
import { BoardPostDetail } from '@/service/interfaces';
import { deleteCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'id is required' }, { status: 400 });
  }

  const postId = Number(id);

  try {
    const postInfo = await GetBoardPostDetail(postId);
    const comments = await GetBoardComments(postId);

    return NextResponse.json({
      success: true,
      data: {
        postInfo: postInfo,
        comments: comments,
      },
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
