import { Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await userServices.createUserService(user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User create successfully!',
    data: result,
  });
});

export const userController = {
  createUser,
};
