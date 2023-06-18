import { SortOrder } from 'mongoose';

type IPaginationType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IPaginationResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const paginationCalculation = (ops: IPaginationType): IPaginationResult => {
  const page = ops.page || 1;
  const limit = ops.limit || 10;
  const skip = (page - 1) * limit;

  const sortBy = ops.sortBy || 'createdAt';
  const sortOrder = ops.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  paginationCalculation,
};
