import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config';
import { IUser, IUserMethods, userModel } from './user.interface';

const userSchema = new Schema<
  IUser,
  Record<string, unknown>,
  IUserMethods,
  userModel
>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// create a user methods
userSchema.methods.isUserExist = async function (
  email: string
): Promise<Partial<IUser | null>> {
  const user = await User.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  );
  return user;
};

// Create a password methods
userSchema.methods.isPasswordMatch = async function (
  currentPassword: string,
  savePassword: string
): Promise<boolean> {
  const user = await bcrypt.compare(currentPassword, savePassword);
  return user;
};

// password hashing
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salts_round)
  );
  next();
});

const User = model<IUser, userModel>('user', userSchema);
export default User;
