import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId; //| IFaculty;
  admin?: Types.ObjectId; // | IAdmin;
};

export type IUserMethods = {
  isIdExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatch(
    currentPassword: string,
    savePassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
