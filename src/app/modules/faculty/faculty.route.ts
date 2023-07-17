import express from 'express';
import { facultyController } from './faculty.controller';

const router = express.Router();

router.get('/:id', facultyController.getSingleFaculty);
router.patch('/:id', facultyController.updateFaculty);
router.delete('/:id', facultyController.deleteFaculty);
// router.post('/create-faculty', facultyController.createFaculty);
router.get('/', facultyController.getAllFaculty);

export const facultyRoutes = router;
