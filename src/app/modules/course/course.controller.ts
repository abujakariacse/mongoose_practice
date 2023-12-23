import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course's Retrived Successfully",
    data: result,
  });
});

const getACourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCouseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrived Successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted Successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getCourses,
  getACourse,
  deleteCourse,
};
