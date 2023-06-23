import { z } from 'zod';

const createFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is require!',
    }),
  }),
});

export const academicFacultyZodValidation = {
  createFacultyZodValidation,
};
