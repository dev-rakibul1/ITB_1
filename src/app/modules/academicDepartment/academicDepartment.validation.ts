import { z } from 'zod';

const createAcademicDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is require.',
    }),

    academicFaculty: z.string({
      required_error: 'Academic faculty is require.',
    }),
  }),
});

const updateAcademicDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const academicDepartmentZodValidation = {
  createAcademicDepartmentZodValidation,
  updateAcademicDepartmentZodValidation,
};
