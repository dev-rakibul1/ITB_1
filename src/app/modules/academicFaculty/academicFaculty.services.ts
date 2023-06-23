import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IGenResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IAcademicSemesterFilter } from '../acadamicSemester/acadamicSemester.interface';
import { academicSemesterSearchKeys } from '../acadamicSemester/academicSemester.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFacultyServices = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const createNewFaculty = await AcademicFaculty.create(payload);
  return createNewFaculty;
};

const getFacultyService = async (
  filters: IAcademicSemesterFilter,
  payload: IPaginationOptions
): Promise<IGenResponse<IAcademicFaculty[]>> => {
  // search stream
  const { searchTerm, ...searchTermData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchKeys.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(searchTermData).length) {
    andConditions.push({
      $and: Object.entries(searchTermData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }

  // pagination sort
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.paginationCalculation(payload);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicFaculty.find()
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);
  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFacultyService = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const updateData = await AcademicFaculty.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return updateData;
};

const deleteFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id, payload);
  return result;
};

export const facultyService = {
  createFacultyServices,
  getFacultyService,
  updateFacultyService,
  deleteFaculty,
};
