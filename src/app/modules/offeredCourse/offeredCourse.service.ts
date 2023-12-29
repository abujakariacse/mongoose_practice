import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semsterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferdCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  //Check is registered semester exist
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Registered semester not found');
  }
  const academicSemester = isSemesterRegistrationExist.academicSemester;
  //Check is academic faculty exist
  const isAcademicFaculty = await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }
  //Check is academic department exist
  const isAcademicDepartment =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }
  //Check is course exist
  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  //Check is faculty exist
  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const result = await OfferdCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
};
