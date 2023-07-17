'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = __importDefault(require('../../../config/config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const acadamicSemester_model_1 = __importDefault(
  require('../academicSemester/acadamicSemester.model')
);
const student_model_1 = require('../student/student.model');
const user_model_1 = __importDefault(require('./user.model'));
const user_utlis_1 = __importStar(require('./user.utlis'));
const createStudentService = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, user_utlis_1.generateFacultyId)();
    user.id = id;
    // Default password set
    if (!user.password) {
      user.password = config_1.default.student_password;
    }
    // Set role
    user.role = 'student';
    const academicsemester = yield acadamicSemester_model_1.default
      .findById(student.academicSemester)
      .lean();
    // -----------------START SESSION TRANSITION------------------
    // generate student id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, user_utlis_1.default)(academicsemester);
      user.id = id;
      student.id = id;
      //array
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student'
        );
      }
      //set student -->  _id into user.student
      user.student = newStudent[0]._id;
      const newUser = yield user_model_1.default.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.default
        .findOne({ id: newUserAllData.id })
        .populate({
          path: 'student',
          populate: [
            {
              path: 'academicSemester',
            },
            {
              path: 'academicDepartment',
            },
            {
              path: 'academicFaculty',
            },
          ],
        });
    }
    return newUserAllData;
  });
exports.userServices = {
  createStudentService,
};
