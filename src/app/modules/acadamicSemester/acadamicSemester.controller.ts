import { Request, Response } from 'express';
import status from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './acadamicSemester.interface';
import { AcademicSemesterService } from './acadamicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester create successfully!',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesterService(
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester get successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
};
