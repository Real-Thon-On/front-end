import { GetAccessToken, RegisterUser, UploadDiary } from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
  uploadDiary: UploadDiary;
}
