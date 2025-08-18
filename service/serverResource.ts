import { GetAccessToken, RegisterUser } from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  registerUser: RegisterUser;
}
