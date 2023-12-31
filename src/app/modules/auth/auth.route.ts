import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { authControllers } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLES.admin, USER_ROLES.faculty, USER_ROLES.student),
  validateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(authValidations.forgotpasswordValidationSchema),
  authControllers.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(authValidations.resetpasswordValidationSchema),
  authControllers.resetPassword,
);

export const authRoutes = router;
