"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_controller_1 = require("./student.controller");
const student_validation_1 = require("./student.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, validateRequest_1.default)(student_validation_1.studentValidation.updateStudentZodSchema), student_controller_1.studentController.updateSingleStudent);
router.delete('/:id', student_controller_1.studentController.deleteSingleStudent);
router.get('/:id', student_controller_1.studentController.getSingleStudent);
router.get('/', student_controller_1.studentController.getAllStudent);
exports.studentRoutes = router;
