import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  // validateRequest(UserValidation.createStudentZodSchema),
  userController.createStudent
);

export const userRoutes = router;
