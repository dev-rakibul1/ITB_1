import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { managementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { studentRoutes } from '../modules/student/student.route';
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
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/faculty',
    route: facultyRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/management-department',
    route: managementDepartmentRoutes,
  },
];

modulesRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
