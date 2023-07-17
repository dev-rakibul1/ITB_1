'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const academicFaculty_controller_1 = require('./academicFaculty.controller');
const academicFaculty_zodValidation_1 = require('./academicFaculty.zodValidation');
const router = express_1.default.Router();
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicFaculty_zodValidation_1.academicFacultyZodValidation
      .updateFacultyZodValidation
  ),
  academicFaculty_controller_1.facultyController.updateFaculty
);
router.delete(
  '/:id',
  academicFaculty_controller_1.facultyController.deleteFaculty
);
router.get(
  '/:id',
  academicFaculty_controller_1.facultyController.getSingleFaculty
);
router.post(
  '/create-faculty',
  (0, validateRequest_1.default)(
    academicFaculty_zodValidation_1.academicFacultyZodValidation
      .createFacultyZodValidation
  ),
  academicFaculty_controller_1.facultyController.createFaculty
);
router.get('/', academicFaculty_controller_1.facultyController.getFaculty);
exports.academicFacultyRoutes = router;
