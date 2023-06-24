import { Request, Response } from 'express';
import status from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableField } from './academicDepartment.constants';
import { IAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...createDepartment } = req.body;

    const result =
      await academicDepartmentService.createAcademicDepartmentService(
        createDepartment
      );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Department create successfully!',
      data: result,
    });
  }
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableField);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await academicDepartmentService.getAllAcademicDepartmentService(
        filters,
        paginationOptions
      );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Department get successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateDepartment = req.body;

    const result =
      await academicDepartmentService.updateAcademicDepartmentService(
        id,
        updateDepartment
      );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Department update successfully!',
      data: result,
    });
  }
);

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await academicDepartmentService.deleteAcademicDepartmentService(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Department delete successfully!',
      data: result,
    });
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await academicDepartmentService.getSingleAcademicDepartmentService(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single department get successfully!',
      data: result,
    });
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  getSingleAcademicDepartment,
};
