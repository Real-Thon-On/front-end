'use server';

import { redirect } from 'next/navigation';

import type { APIErrorResponse } from '@/constants/types';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

import { api } from './api';

export const UploadDiary = async (param: { contents: string; hashtag: string[] }) => {
  try {
    const DATE = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 변환

    const res = await api<'uploadDiary'>(
      'POST',
      '/api/ai/diary/analyze',
      {
        todayDate: DATE,
        userDiaryText: `${param.contents} #${param.hashtag.join(' #')}`,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      },
      true
    );

    return res;
  } catch (error) {
    const err = error as APIErrorResponse;
    console.error('RegisterUser Error: ', err);
    if (err.code === 'C001') {
      redirect('/signup/complete?error=unknown_error');
    } else {
      console.error(`RegisterUser Error: ${err.msg} [${err.code}]`);
      redirect(`/signup/complete?error=${err.msg}`);
    }
  }
};

export const GetAnalyzeDiary = async () => {
  try {
    const res = await api<'getAnalyzeDiary'>(
      'GET',
      '/api/ai/diary/analyze/result',
      undefined,
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      },
      true
    );

    return res;
  } catch (error) {
    const err = error as APIErrorResponse;
    console.error('GetAnalyzeDiary Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`GetAnalyzeDiary Error: ${err.msg} [${err.code}]`);
      redirect(`/signin?error=${err.msg}`);
    }
  }
};
