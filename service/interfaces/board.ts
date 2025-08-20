import { TagTypeEN } from '@/constants/types';

export interface GetBoardPosts {
  method: 'GET';
  endpoint: `/api/boards?hashtag=${TagTypeEN}`;
  req: undefined;
  res: {
    success: boolean;
    data: BoardPostInfo[];
  };
}

export interface BoardPostInfo {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  userName: string | null;
  boardType: TagTypeEN;
  hashtags: string[];
  createdAt: string;
  modifiedAt: string;
}

export interface GetBoardPostDetail {
  method: 'GET';
  endpoint: `/api/boards/${number}`;
  req: undefined;
  res: {
    success: boolean;
    data: BoardPostDetail;
  };
}

export interface BoardPostDetail {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  userName: string;
  profileImageUrl: string | null;
  boardTypes: TagTypeEN[];
  hashtags: string[];
  createdAt: string;
  modifiedAt: string;
}

export interface UploadPost {
  method: 'POST';
  endpoint: '/api/boards';
  req: {
    title: string;
    content: string;
    boardType: TagTypeEN;
    hashtags: string[];
  };
  res: {
    success: boolean;
    data: BoardPostDetail;
  };
}

export interface GetBoardComments {
  method: 'GET';
  endpoint: `/api/boards/${number}/comments`;
  req: undefined;
  res: {
    success: boolean;
    data: {
      commentId: number;
      userId: number;
      userName: string;
      profileImageUrl: string | null;
      content: string;
      createdAt: string;
      modifiedAt: string;
    }[];
  };
}

export interface UploadBoardComment {
  method: 'POST';
  endpoint: `/api/boards/${number}/comments`;
  req: {
    content: string;
  };
  res: {
    success: boolean;
    data: {
      commentId: number;
      content: string;
      userName: string;
      profileImageUrl: string | null;
      createdAt: string;
      modifiedAt: string;
    };
  };
}
