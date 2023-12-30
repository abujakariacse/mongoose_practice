import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offerCourseValidationSchema } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';
const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(
    offerCourseValidationSchema.createOfferedCourseValidationSchema,
  ),
  offeredCourseController.createOfferdCorse,
);

router.patch(
  '/:id',
  validateRequest(
    offerCourseValidationSchema.updateOfferedCourseValidationSchema,
  ),
  offeredCourseController.updateOfferdCorse,
);

export const OfferdCourseRoutes = router;
