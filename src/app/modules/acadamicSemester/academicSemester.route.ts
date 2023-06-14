import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './acadamicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
// import { userController } from './user.controller';
// import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester
);

export const semesterRoutes = router;
