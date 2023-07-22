import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { default as httpStatus, default as status } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userServices } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...user } = req.body;
    const result = await userServices.createStudentService(student, user);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User create successfully!',
      data: result,
    });
  }
);

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await userServices.createFacultyService(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty create successfully!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await userServices.createAdminService(admin, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin create successfully!',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
