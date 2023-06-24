import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.zodValidation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(academicFacultyZodValidation.updateFacultyZodValidation),
  facultyController.updateFaculty
);
router.delete('/:id', facultyController.deleteFaculty);
router.get('/:id', facultyController.getSingleFaculty);
router.post(
  '/create-faculty',
  validateRequest(academicFacultyZodValidation.createFacultyZodValidation),
  facultyController.createFaculty
);

router.get('/', facultyController.getFaculty);

export const academicFacultyRoutes = router;
