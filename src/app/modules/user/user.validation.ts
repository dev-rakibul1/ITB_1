import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createUserValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name should be at least 3 characters long' }),
    role: z.string({}).optional(),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .refine(value => emailRegex.test(value), {
        message: 'Invalid email address',
      }),
    password: z.string().refine(value => passwordRegex.test(value), {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  }),
});

export const userZodValidation = {
  createUserValidation,
};
