import config from '../../../config/config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import generateStudentId from './user.utlis';

const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto password generate
  const id = await generateStudentId();
  user.id = id;

  // Default password set
  if (!user.password) {
    user.password = config.student_password as string;
  }
  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(400, 'Fail to create user.');
  }
  return newUser;
};

export const userServices = {
  createUserService,
};
