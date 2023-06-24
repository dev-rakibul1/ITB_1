import { z } from 'zod';

const createFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is require!',
    }),
  }),
});

const updateFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'When you update faculty title must need title.',
    }),
  }),
});

export const academicFacultyZodValidation = {
  createFacultyZodValidation,
  updateFacultyZodValidation,
};
