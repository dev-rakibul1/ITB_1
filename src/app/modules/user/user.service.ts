import config from '../../../config/config';
import { IUser } from './user.interface';
import User from './user.model';

const createNewUserService = async (payload: IUser): Promise<IUser | null> => {
  if (!payload.role) {
    payload.role = config.user_default_role as string;
  }

  // jwtTokenProvider.createToken(
  //   {
  //     id: payload.email,
  //     role: payload.role,
  //     password: payload.password,
  //   },
  //   config.bcrypt_salts_round as string,
  //   config.jwtAccessExpireDate as string
  // );

  // payload.password = await bcrypt.hash(
  //   payload.password,
  //   Number(config.bcrypt_salts_round)
  // );

  const result = await User.create(payload);
  return result;
};

export const userService = {
  createNewUserService,
};
