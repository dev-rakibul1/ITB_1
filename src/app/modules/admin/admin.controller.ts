import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from '../faculty/faculty.constant';
import { IAdmin } from './admin.interface';
import { adminService } from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await adminService.getAllAdminService(
    filters,
    paginationOptions
  );

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.getSingleAdminService(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single admin fetched successfully!',
    data: result,
  });
});

const updateSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const newAdmin = req.body;

  const result = await adminService.updateSingleAdminService(id, newAdmin);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single admin update successfully!',
    data: result,
  });
});

const deleteSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.deleteSingleAdminService(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single admin delete successfully!',
    data: result,
  });
});

export const adminController = {
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
  getAllAdmin,
};
