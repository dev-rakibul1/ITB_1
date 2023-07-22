import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { authProvider } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.zodValidation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(academicFacultyZodValidation.updateFacultyZodValidation),
  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  facultyController.updateFaculty
);
router.delete(
  '/:id',
  authProvider.auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.deleteFaculty
);
router.get(
  '/:id',
  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  facultyController.getSingleFaculty
);
router.post(
  '/create-faculty',
  validateRequest(academicFacultyZodValidation.createFacultyZodValidation),

  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  facultyController.createFaculty
);

router.get(
  '/',
  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  facultyController.getFaculty
);

export const academicFacultyRoutes = router;
