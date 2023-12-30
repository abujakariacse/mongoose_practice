import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOfferedCourse } from './offeredCourse.interface';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { hasTimeCoflict } from './offeredCourse.util';
import { RegistrationStatus } from '../semsterRegistration/semesterRegistration.constant';
import { OfferdCourse } from './offeredCourse.model';
import { SemesterRegistration } from '../semsterRegistration/semesterRegistration.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  //Check is registered semester exist
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Registered semester not found');
  }
  const academicSemester = isSemesterRegistrationExist.academicSemester;

  //Check is academic faculty exist
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }
  //Check is academic department exist
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExist) {
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

  const isDepartmentBelongToAcademicFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentBelongToAcademicFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${isAcademicDepartmentExist.name} is not belong to ${isAcademicFacultyExist.name}`,
    );
  }

  const isSectionDuplicated = await OfferdCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSectionDuplicated) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The section '${section}' you've entered is already exist with another offered course `,
    );
  }

  const assignedSchedules = await OfferdCourse.find({
    semesterRegistration,
    faculty,
    days,
  });

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeCoflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The faculty is not available at that time. Please choose an another time slot or days',
    );
  }

  const result = await OfferdCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExist = await OfferdCourse.findOne({ _id: id });
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty  not found');
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (isSemesterRegistrationExist?.status !== RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't update this semester while it is ${isSemesterRegistrationExist?.status}`,
    );
  }

  const assignedSchedules = await OfferdCourse.find({
    semesterRegistration,
    faculty,
    days,
  });

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeCoflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The faculty is not available at that time. Please choose an another time slot or days',
    );
  }

  const result = await OfferdCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};
