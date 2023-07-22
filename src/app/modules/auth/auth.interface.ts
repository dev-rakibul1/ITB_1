export type IAuthLoginTypes = {
  email: string;
  role?: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshToken = {
  accessToken: string;
};
