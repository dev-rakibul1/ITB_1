import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { departmentService } from './managementDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const newDepartment = req.body;

  const result = await departmentService.createDepartmentService(newDepartment);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'management department update successfully!',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const newDepartment = req.body;

  const result = await departmentService.updateDepartmentService(
    id,
    newDepartment
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department update successfully!',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await departmentService.deleteDepartmentService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department delete successfully!',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await departmentService.getSingleDepartmentService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single management department get successfully!',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await departmentService.getAllDepartmentService(
    filters,
    paginationOptions
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department delete successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const departmentController = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartment,
  getSingleDepartment,
};
