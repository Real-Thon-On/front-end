export interface Term {
  label: string;
  href: string;
  required: boolean;
}
export type TermsState = Record<string, boolean>;

export type TagType = '넋두리' | '잡담' | '치유';
export type TagTypeEN = 'NEOKDURI' | 'JABDAM' | 'CHIYU';

export type MindTestType = 'ADULT' | 'STUDENT';

const TAG_MAP_KO2EN = {
  NEOKDURI: '넋두리',
  JABDAM: '잡담',
  CHIYU: '치유',
} as const satisfies Record<TagTypeEN, TagType>;
const TAG_MAP_EN2KO = {
  넋두리: 'NEOKDURI',
  잡담: 'JABDAM',
  치유: 'CHIYU',
} as const satisfies Record<TagType, TagTypeEN>;

export const toKoTag = (t: TagTypeEN): TagType => TAG_MAP_KO2EN[t];
export const toEnTag = (t: TagType): TagTypeEN => TAG_MAP_EN2KO[t];

// FOR API

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
