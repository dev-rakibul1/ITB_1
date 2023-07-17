import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { departmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  departmentController.updateDepartment
);
router.delete('/:id', departmentController.deleteDepartment);
router.get('/:id', departmentController.getSingleDepartment);

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  departmentController.createDepartment
);

router.get('/', departmentController.getAllDepartment);

export const managementDepartmentRoutes = router;
