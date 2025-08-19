import type { APIErrorResponse, APIHeader, APIResponse } from '@/constants/types';
import { getCookie } from '@/utils/cookie';

// import { RefreshAccessToken } from './authorization';
import { APIResource } from './serverResource';

export const api = async <T extends keyof APIResource>(
  method: APIResource[T]['method'],
  endpoint: APIResource[T]['endpoint'],
  param?: APIResource[T]['req'],
  headers?: APIHeader,
  needAuth?: boolean
): Promise<APIResource[T]['res']> => {
  const token = await getCookie('access_token');

  const makeRequest = async (): Promise<Response> => {
    return await fetch(`${process.env.BACKEND_API}${endpoint}`, {
      method: method,
      headers: {
        ...(needAuth &&
          token && {
            Authorization: `Bearer ${token}`,
          }),
        ...headers,
      },
      body: param ? JSON.stringify(param) : undefined,
    });
  };

  const res = await makeRequest();

  if (res.status === 401) {
    throw new Error('401 Unauthorized');
  }

  if (!res.ok) {
    const err = (await res.json()) as APIErrorResponse;
    throw err;
  }

  const result = (await res.json()) as APIResponse<APIResource[T]['res']>;
  return result.data;
};
