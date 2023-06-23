import { Request, Response } from 'express';
import status from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableField } from '../acadamicSemester/academicSemester.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { facultyService } from './academicFaculty.services';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...faculty } = req.body;

  const result = await facultyService.createFacultyServices(faculty);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty create successfully!',
    data: result,
  });
});

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions: IPaginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };

  const filters = pick(req.query, academicSemesterFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await facultyService.getFacultyService(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty get successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await facultyService.updateFacultyService(id, updateData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty update successfully!',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteData = req.body;

  const result = await facultyService.deleteFaculty(id, deleteData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty delete successfully!',
    data: result,
  });
});

export const facultyController = {
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
