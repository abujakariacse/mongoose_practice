import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.patch('/:id', semesterRegistrationControllers.updateRegisterdSemester);

router.get('/', semesterRegistrationControllers.getRegisterdSemestersFromDB);

router.get('/:id', semesterRegistrationControllers.getSingleRegisterdSemester);

export const SemesterRegistrationRoutes = router;
