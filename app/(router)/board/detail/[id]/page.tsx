import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { UploadBoardComment } from '@/service/board';

import CommentClient from './commentClient';
import { dummyPosts } from '../../posts/page';

export default function Comment() {
  async function uploadComment(formData: FormData) {
    'use server';

    const comment = formData.get('comment')?.toString().trim() ?? null;
    const postId = formData.get('postId');

    console.log('comment:', comment, 'postId:', postId);

    if (!comment || !postId) {
      redirect('/board/detail/?error=please_fill_all_fields');
    }

    const parsedPostId = Number(postId);

    const res = await UploadBoardComment({ contents: comment, postId: parsedPostId }); // Replace '1' with the appropriate postId value
    if (!res.success) {
      redirect(`/board/upload/?error=${res.success}`);
    } else {
      redirect(`/board/detail/${parsedPostId}`);
    }
  }
  return <CommentClient action={uploadComment} />;
}
