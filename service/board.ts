'use server';

import { redirect } from 'next/navigation';

import type { APIErrorResponse, TagTypeEN } from '@/constants/types';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

import { api } from './api';

export const GetBoardPosts = async (param: TagTypeEN) => {
  try {
    const res = await api<'getBoardPosts'>(
      'GET',
      `/api/boards?hashtag=${param}`,
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
    console.error('GetBoardPosts Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`GetBoardPosts Error: ${err.msg} [${err.code}]`);
      redirect(`/signin?error=${err.msg}`);
    }
  }
};

export const UploadBoardPost = async ({
  title,
  type,
  contents,
  tags,
}: {
  title: string;
  type: TagTypeEN;
  contents: string;
  tags: string[];
}) => {
  try {
    const res = await api<'uploadPost'>(
      'POST',
      '/api/boards',
      {
        title: 'Sample Title',
        content: 'Sample Content',
        hashtags: ['SampleTag'],
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
    console.error('UploadBoardPost Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`UploadBoardPost Error: ${err.msg} [${err.code}]`);
      redirect(`/error?message=${err.msg}`);
    }
  }
};
