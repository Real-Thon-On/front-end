import { GetAccessToken, GetBoardPosts, RegisterUser, UploadDiary, UploadPost } from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
  uploadDiary: UploadDiary;
  getBoardPosts: GetBoardPosts;
  uploadPost: UploadPost;
}
