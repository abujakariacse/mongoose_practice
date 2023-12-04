import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemsterValidations } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemsterValidations.CreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createSemester,
);

export const AcademicSemesterRoutes = router;
