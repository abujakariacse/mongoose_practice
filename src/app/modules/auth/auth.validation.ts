import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old oassword is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

const forgotpasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'UserId is required' }),
  }),
});
const resetpasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'UserId is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }),
});

export const authValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgotpasswordValidationSchema,
  resetpasswordValidationSchema,
};
