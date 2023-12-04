import express from 'express';
import { userControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validationMiddleware from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validationMiddleware(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

export const userRoutes = router;
