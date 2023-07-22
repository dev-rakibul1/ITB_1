import { Model } from 'mongoose';

export type IUser = {
  name: string;
  role?: string;
  email: string;
  password: string;
};

export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser | null>>;
  isPasswordMatch(
    currentPassword: string,
    savePassword: string
  ): Promise<boolean>;
};

export type userModel = Model<IUser, Record<string, unknown>, IUserMethods>;
