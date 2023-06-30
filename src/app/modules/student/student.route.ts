import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  studentController.updateSingleStudent
);
router.delete('/:id', studentController.deleteSingleStudent);
router.get('/:id', studentController.getSingleStudent);
router.get('/', studentController.getAllStudent);

export const studentRoutes = router;
