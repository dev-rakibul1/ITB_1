'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelpers_1 = require('../../../helpers/paginationHelpers');
const acadamicSemester_model_1 = __importDefault(
  require('./acadamicSemester.model')
);
const academicSemester_constant_1 = require('./academicSemester.constant');
const createSemester = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      academicSemester_constant_1.academicSemesterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      // throw new ApiError(Number(status['400_MESSAGE']), 'Invalid semester code.');
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid semester code.'
      );
    }
    const result = yield acadamicSemester_model_1.default.create(payload);
    return result;
  });
// get all semester
const getAllSemesterService = (filters, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      searchTermData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: academicSemester_constant_1.academicSemesterSearchKeys.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })
        ),
      });
    }
    if (Object.keys(searchTermData).length) {
      andConditions.push({
        $and: Object.entries(searchTermData).map(([fields, value]) => ({
          [fields]: value,
        })),
      });
    }
    // const andConditions = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         code: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         startMonth: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         endMonth: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //     ],
    //   },
    // ];
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.paginationHelper.paginationCalculation(pagination);
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length ? { $and: andConditions } : {};
    const result = yield acadamicSemester_model_1.default
      .find(whereConditions)
      .sort(sortConditions)
      .limit(limit)
      .skip(skip);
    const total = yield acadamicSemester_model_1.default.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleSemesterService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acadamicSemester_model_1.default.findById(id);
    return result;
  });
const updateSemesterService = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      payload.title &&
      payload.code &&
      academicSemester_constant_1.academicSemesterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      // throw new ApiError(Number(status['400_MESSAGE']), 'Invalid semester code.');
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid semester code.'
      );
    }
    const result = yield acadamicSemester_model_1.default.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    );
    return result;
  });
const deleteSingleSemesterService = (id, payload) => {
  const finallyDeleteData = acadamicSemester_model_1.default.findOneAndDelete(
    { _id: id },
    payload
  );
  return finallyDeleteData;
};
exports.AcademicSemesterService = {
  createSemester,
  getAllSemesterService,
  getSingleSemesterService,
  updateSemesterService,
  deleteSingleSemesterService,
};
