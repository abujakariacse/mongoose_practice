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
router.get('/', offeredCourseController.getAllOfferedCourse);

router.get('/:id', offeredCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(
    offerCourseValidationSchema.updateOfferedCourseValidationSchema,
  ),
  offeredCourseController.updateOfferdCorse,
);

router.delete('/:id', offeredCourseController.deletedOfferedCourse);

export const OfferdCourseRoutes = router;
