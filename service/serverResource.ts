import { GetAccessToken, RefreshAccessToken, RevokeToken } from './interfaces';

export interface APIResource {
  getAccessToken: GetAccessToken;
  refreshAccessToken: RefreshAccessToken;
  revokeToken: RevokeToken;
}
