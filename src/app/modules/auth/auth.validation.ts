import { z } from 'zod';

const createLoginAuthValidation = z.object({
  body: z.object({
    id: z
      .string({
        required_error: 'Id is required.',
      })
      .nonempty('Id is required.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .nonempty('Password you not provide empty value.')
      .min(6, 'Password must be at least 6 characters long.'),
  }),
});

const createRefreshTokenZodValidation = z.object({
  cookies: z.object({
    refreshToken: z
      .string({
        required_error: 'Refresh token is required.',
      })
      .nonempty('Please provide a refresh token.'),
  }),
});

export const authValidation = {
  createLoginAuthValidation,
  createRefreshTokenZodValidation,
};
