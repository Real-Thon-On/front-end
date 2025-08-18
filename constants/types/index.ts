export interface Term {
  label: string;
  href: string;
  required: boolean;
}
export type TermsState = Record<string, boolean>;

export interface APIResponse<T> {
  success: boolean;
  data: T;
}

export interface APIErrorResponse {
  success: boolean;
  code: string;
  msg: string | null;
}

export interface AccInterlockCode {
  id: string;
  access: string;
}

export interface RegisterUserParams {
  nickname: string;
  email: string;
}

export interface AuthAPIHeader {
  'Content-Type': 'application/json';
  [key: string]: string | number | boolean;
}
export type APIHeader = AuthAPIHeader;

export type TokenTypeHint = 'access_token' | 'refresh_token';
