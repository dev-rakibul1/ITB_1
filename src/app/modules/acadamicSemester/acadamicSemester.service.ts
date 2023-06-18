import status from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IGenResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IAcademicSemester } from './acadamicSemester.interface';
import AcademicSemester from './acadamicSemester.model';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    // throw new ApiError(Number(status['400_MESSAGE']), 'Invalid semester code.');
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code.');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semester

const getAllSemesterService = async (
  pagination: IPaginationOptions
): Promise<IGenResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.paginationCalculation(pagination);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({})
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesterService,
};
