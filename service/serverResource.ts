import {
  GetAccessToken,
  GetAnalyzeDiary,
  GetBoardComments,
  GetBoardPostDetail,
  GetBoardPosts,
  GetMindTestList,
  GetMindTestQuestionList,
  GetTestResultData,
  RegisterUser,
  SubmitMindTest,
  UploadBoardComment,
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
  uploadBoardComment: UploadBoardComment;
  getBoardComments: GetBoardComments;
  getBoardPostDetail: GetBoardPostDetail;
  getTestResultData: GetTestResultData;
  getAnalyzeDiary: GetAnalyzeDiary;
}
