import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

router.delete('/:id', academicDepartmentController.deleteAcademicDepartment);
router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentZodValidation.updateAcademicDepartmentZodValidation
  ),
  academicDepartmentController.updateAcademicDepartment
);

router.get('/', academicDepartmentController.getAllAcademicDepartment);
router.post(
  '/create-department',
  validateRequest(
    academicDepartmentZodValidation.createAcademicDepartmentZodValidation
  ),
  academicDepartmentController.createAcademicDepartment
);

export const academicDepartmentRoutes = router;
