import status from 'http-status';
import ApiError from '../../../errors/ApiError';
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

export const AcademicSemesterService = {
  createSemester,
};
