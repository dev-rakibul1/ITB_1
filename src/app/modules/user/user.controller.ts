import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await userService.createNewUserService(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully!',
    data: result,
  });
});

export const userController = {
  createNewUser,
};
