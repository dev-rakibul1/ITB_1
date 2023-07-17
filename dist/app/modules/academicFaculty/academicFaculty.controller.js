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
exports.facultyController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationsFields_1 = require('../../../constants/paginationsFields');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const academicFaculty_constant_1 = require('./academicFaculty.constant');
const academicFaculty_services_1 = require('./academicFaculty.services');
const createFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const faculty = __rest(req.body, []);
    const result =
      yield academicFaculty_services_1.facultyService.createFacultyServices(
        faculty
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Faculty create successfully!',
      data: result,
    });
  })
);
const getFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const filters = (0, pick_1.default)(
      req.query,
      academicFaculty_constant_1.academicFacultyFilterableField
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationsFields_1.paginationFields
    );
    const result =
      yield academicFaculty_services_1.facultyService.getFacultyService(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Faculty get successfully!',
      meta: result.meta,
      data: result.data,
    });
  })
);
const updateFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result =
      yield academicFaculty_services_1.facultyService.updateFacultyService(
        id,
        updateData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Faculty update successfully!',
      data: result,
    });
  })
);
const deleteFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteData = req.body;
    const result =
      yield academicFaculty_services_1.facultyService.deleteFaculty(
        id,
        deleteData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Faculty delete successfully!',
      data: result,
    });
  })
);
const getSingleFaculty = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield academicFaculty_services_1.facultyService.getSingleFacultyService(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single faculty get successfully!',
      data: result,
    });
  })
);
exports.facultyController = {
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
  getSingleFaculty,
};
