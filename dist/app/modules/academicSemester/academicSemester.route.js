'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.semesterRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const acadamicSemester_controller_1 = require('./acadamicSemester.controller');
const academicSemester_validation_1 = require('./academicSemester.validation');
// import { userController } from './user.controller';
// import { UserValidation } from './user.validation';
const router = express_1.default.Router();
router.post(
  '/create-semester',
  (0, validateRequest_1.default)(
    academicSemester_validation_1.AcademicSemesterValidation
      .createAcademicSemesterZodSchema
  ),
  acadamicSemester_controller_1.academicSemesterController
    .createAcademicSemester
);
router.get(
  '/:id',
  acadamicSemester_controller_1.academicSemesterController.getSingleSemester
);
router.delete(
  '/:id',
  acadamicSemester_controller_1.academicSemesterController.deleteSingleSemester
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicSemester_validation_1.AcademicSemesterValidation
      .updateAcademicSemesterZodSchema
  ),
  acadamicSemester_controller_1.academicSemesterController.updateSemester
);
router.get(
  '/',
  acadamicSemester_controller_1.academicSemesterController.getAllSemester
);
exports.semesterRoutes = router;
