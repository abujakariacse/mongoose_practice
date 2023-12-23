import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseControllers } from './course.controller';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/', courseControllers.getCourses);

router.get('/:id', courseControllers.getACourse);

router.delete('/:id', courseControllers.deleteCourse);

export const CourseRoutes = router;
