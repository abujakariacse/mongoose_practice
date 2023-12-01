import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// User will hit route and route will call controller function

router.get('/', StudentController.getStudents);

router.get('/:studentId', StudentController.findASingleStudent);

router.delete('/:studentId', StudentController.deletedStudent);

// We have to export router to access from from app.ts file. We will export normally cause router its own an object. So we don't need to export within a object.
export const StudentRoutes = router;
