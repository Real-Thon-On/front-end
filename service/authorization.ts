'use server';

import { get } from 'http';
import { redirect } from 'next/navigation';

import type {
  APIErrorResponse,
  AccInterlockCode,
  RegisterUserParams,
  TokenTypeHint,
} from '@/constants/types';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

import { api } from './api';

export const GetAccessToken = async (param: AccInterlockCode) => {
  try {
    const res = await api<'getAccessToken'>('POST', '/api/auth/oauth-login', undefined, {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${param.access}`,
      'Device-Id': param.id,
    });

    const result = res.data;

    await setCookie('access_token', result.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    await setCookie('refresh_token', result.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    console.error('RequestAuthCode Error: ', error);
    throw error;
  }
};

export const RegisterUser = async (param: RegisterUserParams) => {
  try {
    const id = await getCookie('device_id');
    const access = await getCookie('tempToken');

    if (!id || !access) {
      console.error('RegisterUser Error: Missing device_id or tempToken');
      redirect('/signin?error=missing_credentials');
    }

    const res = await api<'registerUser'>(
      'POST',
      '/api/user/complete-sign-up',
      {
        nickname: param.nickname,
        email: param.email,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
        'Device-Id': id,
      }
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

// export const RefreshAccessToken = async () => {
//   const refreshToken = await getCookie('refresh_token');
//   if (!refreshToken) throw new Error('No refresh token available');

//   const res = await api<'refreshAccessToken'>(
//     'POST',
//     '/auth/v1/token',
//     {
//       grantType: 'refresh_token',
//       refreshToken,
//       clientId: process.env.CHZZK_CLIENTID!,
//       clientSecret: process.env.CHZZK_CLIENTSECRET!,
//     },
//     {
//       'User-Agent': 'Mozilla/5.0',
//       'Content-Type': 'application/json',
//     }
//   );

//   await setCookie('access_token', res.accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     path: '/',
//     maxAge: 60 * 60 * 24,
//   });
//   await setCookie('refresh_token', res.refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     path: '/',
//     maxAge: 60 * 60 * 24 * 30,
//   });
// };

// export const RevokeAccessToken = async (
//   tokenVal: string,
//   tokenTypeHintVal: TokenTypeHint
// ): Promise<void> => {
//   await api<'revokeToken'>(
//     'POST',
//     '/auth/v1/token/revoke',
//     {
//       clientId: process.env.CHZZK_CLIENTID!,
//       clientSecret: process.env.CHZZK_CLIENTSECRET!,
//       token: tokenVal,
//       tokenTypeHint: tokenTypeHintVal,
//     },
//     {
//       'User-Agent': 'Mozilla/5.0',
//       'Content-Type': 'application/json',
//     }
//   );

//   if (tokenTypeHintVal === 'access_token') {
//     await deleteCookie('access_token');
//   } else {
//     await deleteCookie('refresh_token');
//   }
// };
