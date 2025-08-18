import type { APIErrorResponse, APIHeader, APIResponse } from '@/constants/types';
import { getCookie } from '@/utils/cookie';

import { RefreshAccessToken } from './authorization';
import { APIResource } from './serverResource';

export const api = async <T extends keyof APIResource>(
  method: APIResource[T]['method'],
  endpoint: APIResource[T]['endpoint'],
  param?: APIResource[T]['req'] & {
    withoutAuth?: boolean;
  },
  headers?: APIHeader
): Promise<APIResource[T]['res']> => {
  const token = getCookie('accessToken');

  const makeRequest = async (): Promise<Response> => {
    return await fetch(`${process.env.OPENAPI}${endpoint}`, {
      method: method,
      headers: {
        ...(param?.withoutAuth &&
          token && {
            Authorization: `Bearer ${token}`,
          }),
        ...headers,
      },
      body: param ? JSON.stringify(param) : undefined,
    });
  };

  let res = await makeRequest();

  if (res.status === 401) {
    try {
      await RefreshAccessToken();
      res = await makeRequest();
    } catch (error) {
      console.error('[api] Token refresh failed: ', error);
      throw new Error('인증이 만료되었습니다. 다시 로그인 해주세요.');
    }
  }

  if (!res.ok) {
    const err = (await res.json()) as APIErrorResponse;
    throw err;
  }

  const result = (await res.json()) as APIResponse<APIResource[T]['res']>;
  return result.content;
};
