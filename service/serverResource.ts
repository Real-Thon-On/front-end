import {
  GetAccessToken,
  GetBoardPosts,
  GetMindTestList,
  GetMindTestQuestionList,
  RegisterUser,
  SubmitMindTest,
  UploadDiary,
  UploadPost,
} from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
  uploadDiary: UploadDiary;
  getBoardPosts: GetBoardPosts;
  uploadPost: UploadPost;
  getMindTestList: GetMindTestList;
  getMindTestQuestionList: GetMindTestQuestionList;
  submitMindTest: SubmitMindTest;
}
