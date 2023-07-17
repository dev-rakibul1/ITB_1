import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', adminController.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  adminController.updateSingleAdmin
);
router.delete('/:id', adminController.deleteSingleAdmin);
router.get('/', adminController.getAllAdmin);

export const adminRoutes = router;
