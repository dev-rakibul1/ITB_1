import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userZodValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userZodValidation.createUserValidation),
  userController.createNewUser
);

export const userRoutes = router;
