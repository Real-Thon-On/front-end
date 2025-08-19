'use server';

import { redirect } from 'next/navigation';

import type { APIErrorResponse, MindTestType } from '@/constants/types';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

import { api } from './api';

export const GetMindTestList = async (param: MindTestType) => {
  try {
    const res = await api<'getMindTestList'>(
      'GET',
      `/api/psych-tests?type=ADULT`,
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

export const GetMindTestQuestionList = async (id: number) => {
  try {
    const res = await api<'getMindTestQuestionList'>(
      'GET',
      `/api/psych-tests/${id}`,
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
    console.error('GetMindTestQuestionList Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`GetMindTestQuestionList Error: ${err.msg} [${err.code}]`);
      redirect(`/signin?error=${err.msg}`);
    }
  }
};

export const SubmitMindTest = async (
  id: number,
  answers: { questionId: number; choiceId: number }[]
) => {
  try {
    const res = await api<'submitMindTest'>(
      'POST',
      `/api/psych-tests/${id}/submit`,
      { answers },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      },
      true
    );

    return res;
  } catch (error) {
    const err = error as APIErrorResponse;
    console.error('SubmitMindTest Error: ', err);
    if (err.code === 'C001') {
      deleteCookie('accessToken');
      redirect('/signin');
    } else {
      console.error(`SubmitMindTest Error: ${err.msg} [${err.code}]`);
      redirect(`/signin?error=${err.msg}`);
    }
  }
};
