'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const academicDepartment_route_1 = require('../modules/academicDepartment/academicDepartment.route');
const academicFaculty_route_1 = require('../modules/academicFaculty/academicFaculty.route');
const academicSemester_route_1 = require('../modules/academicSemester/academicSemester.route');
const student_route_1 = require('../modules/student/student.route');
const user_route_1 = require('../modules/user/user.route');
const router = express_1.default.Router();
const modulesRouters = [
  {
    path: '/user',
    route: user_route_1.userRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemester_route_1.semesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFaculty_route_1.academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartment_route_1.academicDepartmentRoutes,
  },
  {
    path: '/student',
    route: student_route_1.studentRoutes,
  },
];
modulesRouters.forEach(route => {
  router.use(route.path, route.route);
});
exports.default = router;
