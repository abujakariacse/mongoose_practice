import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from './../student/student.validation';
import { UserControllers } from './user.controller';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLES } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLES.admin),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLES.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get('/me', UserControllers.getMe);

export const UserRoutes = router;
