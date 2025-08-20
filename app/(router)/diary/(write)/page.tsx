import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { UploadDiary } from '@/service/diary';

import DiaryClient from './diaryClient';

export default function Diary() {
  async function uploadDiary(formData: FormData) {
    'use server';

    const contents = formData.get('diary')?.toString().trim() ?? null;
    const tags = formData.getAll('hashtag').map(String);

    const hashtag = tags.filter(tag => tag.trim() !== '');

    console.log('contents:', contents, 'hashtag:', hashtag);

    if (!contents || !hashtag) {
      redirect('/diary/?error=please_fill_all_fields');
    }

    const res = await UploadDiary({ contents, hashtag });
    if (!res.success) {
      redirect('/diary/?error=upload_failed');
    }
    redirect('/diary/result');
  }
  return <DiaryClient action={uploadDiary} />;
}
