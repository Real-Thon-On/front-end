// import { TokenTypeHint } from '@/constants/types';

export interface GetAccessToken {
  method: 'POST';
  endpoint: '/api/auth/oauth-login';
  req: undefined;
  res: {
    access: string;
    refresh: string;
  };
}

export interface RegisterUser {
  method: 'POST';
  endpoint: '/api/user/complete-sign-up';
  req: {
    nickname: string;
    email: string;
  };
  res: {
    success: boolean;
  };
}

// export interface RefreshAccessToken {
//   method: 'POST';
//   endpoint: '/auth/v1/token';
//   req: {
//     grantType: string;
//     refreshToken: string;
//     clientId: string;
//     clientSecret: string;
//   };
//   res: {
//     accessToken: string;
//     refreshToken: string;
//     tokenType: string;
//     expiresIn: string;
//     scope: string;
//   };
// }

// export interface RevokeToken {
//   method: 'POST';
//   endpoint: '/auth/v1/token/revoke';
//   req: {
//     clientId: string;
//     clientSecret: string;
//     token: string;
//     tokenTypeHint: TokenTypeHint;
//   };
//   res: undefined;
// }
