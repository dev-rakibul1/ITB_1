'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require('mongoose');
const academicSemesterFacultySchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      require: true,
      min: [5, 'Min 5 charter require'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.AcademicFaculty = (0, mongoose_1.model)(
  'AcademicFaculty',
  academicSemesterFacultySchema
);
