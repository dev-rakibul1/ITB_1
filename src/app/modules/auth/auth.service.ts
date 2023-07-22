import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config/config';
import ApiError from '../../../errors/ApiError';
import { jwtTokenProvider } from '../../../helpers/jwtHelper';
import User from '../user/user.model';
import {
  IAuthLoginTypes,
  IRefreshToken,
  IUserLoginResponse,
} from './auth.interface';

const loginUserService = async (
  payload: IAuthLoginTypes
): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist?.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  // ACCESS REFRESH TOKEN AND ASSESS TOKEN
  // access token
  const accessToken = jwtTokenProvider.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      password: isUserExist.password,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );

  // refresh token
  const refreshToken = jwtTokenProvider.createToken(
    {
      id: isUserExist?.email,
      role: isUserExist?.role,
      password: isUserExist?.password,
    },
    config.jwtRefreshKey as Secret,
    config.jwtRefreshExpireDate as string
  );

  return {
    accessToken,
    refreshToken,
  };

  // const { id, password } = payload;
  // const user = new User();
  // const isIdExist = await user.isIdExist(id);
  // if (!isIdExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');
  // }
  // if (
  //   isIdExist?.password &&
  //   !user.isPasswordMatch(password, isIdExist?.password)
  // ) {
  //   throw new ApiError(
  //     httpStatus.UNAUTHORIZED,
  //     'Your password does not match.'
  //   );
  // }
  // // access JWT refresh and access token
  // // Access token
  // // const accessToken = jwt.sign(
  // //   { id: isIdExist?.id, role: isIdExist?.role },
  // //   config.jwtAccessKey,
  // //   { expiresIn: config.jwtAccessExpireDate }
  // // );
  // const accessToken = jwtTokenProvider.createToken(
  //   {
  //     id: isIdExist?.id,
  //     role: isIdExist?.role,
  //   },
  //   config.jwtAccessKey as Secret,
  //   config.jwtAccessExpireDate as string
  // );
  // // Refresh token
  // const refreshToken = jwtTokenProvider.createToken(
  //   { id: isIdExist?.id, role: isIdExist?.role },
  //   config.jwtRefreshKey as Secret,
  //   config.jwtRefreshExpireDate as string
  // );
  // const { needPasswordChange } = isIdExist;
  // // console.log({ accessToken, refreshToken, needPasswordChange });
  // return {
  //   accessToken,
  //   refreshToken,
  //   needPasswordChange,
  // };
};

const refreshTokenService = async (token: string): Promise<IRefreshToken> => {
  let verifyToken = null;
  try {
    verifyToken = jwtTokenProvider.verifyJwtToken(
      token,
      config.jwtRefreshKey as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }

  const { id: userId } = verifyToken;

  const user = new User();
  const isIdExist = await user.isIdExist(userId);

  if (!isIdExist?.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');
  }

  // generate a new token
  const newAccessToken = jwtTokenProvider.createToken(
    {
      userId: isIdExist.id,
      role: isIdExist.role,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  loginUserService,
  refreshTokenService,
};
