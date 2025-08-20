import { BoardPostInfo } from '@/service/interfaces';

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

export const dummyPosts: BoardPostInfo[] = [
  {
    boardId: 1,
    title: '힘드네요',
    content: '과제가 너무 많아요',
    userId: 101,
    userName: '박선영',
    boardType: 'NEOKDURI',
    hashtags: ['20대', '대학생'],
    createdAt: '2025-08-18T10:30:00',
    modifiedAt: '2025-08-19T12:00:00',
  },
  {
    boardId: 2,
    title: '리얼톤 대회',
    content: '너무 기대가 됩니다',
    userId: 102,
    userName: '서정호',
    boardType: 'JABDAM',
    hashtags: ['자기계발', '해커톤'],
    createdAt: '2025-08-17T09:15:00',
    modifiedAt: '2025-08-18T14:00:00',
  },
  {
    boardId: 3,
    title: '하 인생',
    content: '살기 싫어요',
    userId: 103,
    userName: '김성원',
    boardType: 'CHIYU',
    hashtags: ['공감', '우울'],
    createdAt: '2025-08-19T08:00:00',
    modifiedAt: '2025-08-20T11:00:00',
  },
  {
    boardId: 4,
    title: '야호 신난다',
    content: '모두 행복하세요~',
    userId: 104,
    userName: '박민수',

    boardType: 'JABDAM',
    hashtags: ['신나', '행복'],
    createdAt: '2025-08-16T13:45:00',
    modifiedAt: '2025-08-17T15:20:00',
  },
  {
    boardId: 5,
    title: '사랑',
    content: '좋아하는 사람이 생겼어요! 이런 게 사랑일까요?',
    userId: 105,
    userName: '최지우',
    boardType: 'NEOKDURI',
    hashtags: ['연애', '설렘', '짝사랑'],
    createdAt: '2025-08-15T11:00:00',
    modifiedAt: '2025-08-16T12:30:00',
  },
];
