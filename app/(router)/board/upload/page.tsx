import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { TagTypeEN } from '@/constants/types';
import { UploadBoardPost } from '@/service/board';

import UploadClient from './uploadClient';

export default function Diary() {
  async function uploadPost(formData: FormData) {
    'use server';

    const title = formData.get('title')?.toString().trim() ?? null;
    const getType = formData.get('type')?.toString().trim() ?? null;
    const contents = formData.get('contents')?.toString().trim() ?? null;
    const tags = formData.getAll('hashtag').map(String);
    // const imgs = formData.getAll('image').map(file => {
    //   if (file instanceof File) {
    //     return file;
    //   }
    //   return null;
    // }).filter(file => file !== null) as File[];

    const hashtag = tags.filter(tag => tag.trim() !== '');
    const type = getType as TagTypeEN;

    console.log('title:', title, 'contents:', contents, 'hashtag:', hashtag, 'type:', type);

    if (!title || !contents || !hashtag) {
      redirect('/board/upload/?error=please_fill_all_fields');
    }

    const res = await UploadBoardPost({ title, type, contents, tags });
    if (!res.success) {
      redirect(`/board/upload/?error=${res.success}`);
    } else {
      redirect('/board/posts');
    }
  }
  return <UploadClient action={uploadPost} />;
}
