import { Request, Response } from 'express';
import status from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableField } from './student.constant';
import { IStudent } from './student.interface';
import { studentService } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await studentService.getStudentService(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student get successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await studentService.SingleStudentService(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single student get successfully!',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateUser = req.body;

  const result = await studentService.updateSingleStudentService(
    id,
    updateUser
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student update successfully!',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  const result = await studentService.deleteSingleStudentService(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student delete successfully!',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
