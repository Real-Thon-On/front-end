export interface Term {
  label: string;
  href: string;
  required: boolean;
}
export type TermsState = Record<string, boolean>;

export interface APIResponse<T> {
  code: number;
  message: string | null;
  content: T;
}

export interface APIErrorResponse {
  code: number;
  message: string | null;
}

export interface AccInterlockCode {
  code: string;
  state: string;
}

export interface AuthAPIHeader {
  'Content-Type': 'application/json';
  [key: string]: string | number | boolean;
}
export type APIHeader = AuthAPIHeader;

export type TokenTypeHint = 'access_token' | 'refresh_token';
