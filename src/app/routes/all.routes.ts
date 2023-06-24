import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route';
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
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
];

modulesRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
