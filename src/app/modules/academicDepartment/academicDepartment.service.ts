import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IGenResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { academicDepartmentSearchKeys } from './academicDepartment.constants';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentService = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllAcademicDepartmentService = async (
  filters: IAcademicDepartmentFilters,
  payload: IPaginationOptions
): Promise<IGenResponse<IAcademicDepartment[]>> => {
  // search stream
  const { searchTerm, ...searchTermData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchKeys.map(field => ({
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
  const whereConditions = andConditions.length ? { $and: andConditions } : {};
  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAcademicDepartmentService = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const deleteDepartment = await AcademicDepartment.findByIdAndDelete(
    id
  ).populate('academicFaculty');
  return deleteDepartment;
};

const getSingleAcademicDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const singleDepartment = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return singleDepartment;
};

export const academicDepartmentService = {
  createAcademicDepartmentService,
  getAllAcademicDepartmentService,
  updateAcademicDepartmentService,
  deleteAcademicDepartmentService,
  getSingleAcademicDepartmentService,
};
