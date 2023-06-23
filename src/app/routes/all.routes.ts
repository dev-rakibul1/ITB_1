import express from 'express';
import { semesterRoutes } from '../modules/acadamicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const modulesRouters = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/academic-semester',
    route: semesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
];

modulesRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
