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

router.get('/', AcademicSemesterControllers.getSemesters);

router.get('/:id', AcademicSemesterControllers.getASemester);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemsterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSemester,
);

export const AcademicSemesterRoutes = router;
