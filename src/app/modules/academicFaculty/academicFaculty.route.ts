import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidaionSchema,
  ),
  AcademicFacultyControllers.createFaculty,
);

router.get('/', AcademicFacultyControllers.getFaculties);

router.get('/:facultyId', AcademicFacultyControllers.getFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidaionSchema,
  ),
  AcademicFacultyControllers.updateFaculty,
);

export const AcademicFacultyRoutes = router;
