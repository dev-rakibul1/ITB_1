"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentZodValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is require.',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic faculty is require.',
        }),
    }),
});
const updateAcademicDepartmentZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
    }),
});
exports.academicDepartmentZodValidation = {
    createAcademicDepartmentZodValidation,
    updateAcademicDepartmentZodValidation,
};
