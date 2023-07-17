import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/:id', adminController.getSingleAdmin);
router.patch('/:id');
router.delete('/:id');
router.get('/');

export const adminRoutes = router;
