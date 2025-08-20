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
        title: title,
        content: contents,
        boardType: type,
        hashtags: tags,
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

export const GetBoardPostDetail = async (postId: number) => {
  try {
    const res = await api<'getBoardPostDetail'>(
      'GET',
      `/api/boards/${postId}`,
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
    console.error('GetBoardPostDetail Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`GetBoardPostDetail Error: ${err.msg} [${err.code}]`);
      redirect(`/error?message=${err.msg}`);
    }
  }
};

export const GetBoardComments = async (postId: number) => {
  try {
    const res = await api<'getBoardComments'>(
      'GET',
      `/api/boards/${postId}/comments`,
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
    console.error('GetBoardComments Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`GetBoardComments Error: ${err.msg} [${err.code}]`);
      redirect(`/error?message=${err.msg}`);
    }
  }
};

export const UploadBoardComment = async ({
  contents,
  postId,
}: {
  contents: string;
  postId: number;
}) => {
  try {
    const res = await api<'uploadBoardComment'>(
      'POST',
      `/api/boards/${postId}/comments`,
      { content: contents },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      },
      true
    );

    return res;
  } catch (error) {
    const err = error as APIErrorResponse;
    console.error('UploadBoardComment Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`UploadBoardComment Error: ${err.msg} [${err.code}]`);
      redirect(`/error?message=${err.msg}`);
    }
  }
};
