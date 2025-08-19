import { TagTypeEN } from '@/constants/types';

export interface GetBoardPosts {
  method: 'GET';
  endpoint: `/api/boards?hashtag=${TagTypeEN}`;
  res: {
    success: boolean;
    data: [
      {
        boardId: number;
        title: string;
        content: string;
        userId: number;
        hashtags: string[];
        createdAt: string;
        modifiedAt: string;
      }
    ];
  };
  req: undefined;
}

export interface UploadPost {
  method: 'POST';
  endpoint: '/api/boards';
  req: {
    title: string;
    content: string;
    hashtags: string[];
  };
  res: {
    success: boolean;
    postId: string;
  };
}
