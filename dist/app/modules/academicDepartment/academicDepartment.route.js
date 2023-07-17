'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const academicDepartment_controller_1 = require('./academicDepartment.controller');
const academicDepartment_validation_1 = require('./academicDepartment.validation');
const router = express_1.default.Router();
router.delete(
  '/:id',
  academicDepartment_controller_1.academicDepartmentController
    .deleteAcademicDepartment
);
router.get(
  '/:id',
  academicDepartment_controller_1.academicDepartmentController
    .getSingleAcademicDepartment
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicDepartment_validation_1.academicDepartmentZodValidation
      .updateAcademicDepartmentZodValidation
  ),
  academicDepartment_controller_1.academicDepartmentController
    .updateAcademicDepartment
);
router.get(
  '/',
  academicDepartment_controller_1.academicDepartmentController
    .getAllAcademicDepartment
);
router.post(
  '/create-department',
  (0, validateRequest_1.default)(
    academicDepartment_validation_1.academicDepartmentZodValidation
      .createAcademicDepartmentZodValidation
  ),
  academicDepartment_controller_1.academicDepartmentController
    .createAcademicDepartment
);
exports.academicDepartmentRoutes = router;
