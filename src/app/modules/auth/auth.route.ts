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

export const authRoutes = router;
