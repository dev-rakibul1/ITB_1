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
exports.academicDepartmentController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationsFields_1 = require('../../../constants/paginationsFields');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const academicDepartment_constants_1 = require('./academicDepartment.constants');
const academicDepartment_service_1 = require('./academicDepartment.service');
const createAcademicDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createDepartment = __rest(req.body, []);
    const result =
      yield academicDepartment_service_1.academicDepartmentService.createAcademicDepartmentService(
        createDepartment
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Department create successfully!',
      data: result,
    });
  })
);
const getAllAcademicDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      academicDepartment_constants_1.academicDepartmentFilterableField
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationsFields_1.paginationFields
    );
    const result =
      yield academicDepartment_service_1.academicDepartmentService.getAllAcademicDepartmentService(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Department get successfully!',
      meta: result.meta,
      data: result.data,
    });
  })
);
const updateAcademicDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateDepartment = req.body;
    const result =
      yield academicDepartment_service_1.academicDepartmentService.updateAcademicDepartmentService(
        id,
        updateDepartment
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Department update successfully!',
      data: result,
    });
  })
);
const deleteAcademicDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield academicDepartment_service_1.academicDepartmentService.deleteAcademicDepartmentService(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Department delete successfully!',
      data: result,
    });
  })
);
const getSingleAcademicDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield academicDepartment_service_1.academicDepartmentService.getSingleAcademicDepartmentService(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single department get successfully!',
      data: result,
    });
  })
);
exports.academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  getSingleAcademicDepartment,
};
