import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// Controller function will call service function and it will pass req data to the service functions. It will call service function and its own function. Example in below. Then It will response the data

// Get all students
const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudents();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students retrived succesfully',
    data: result,
  });
});

// Find a specific user
const findASingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.findStudent(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student retrived succesfully',
    data: result,
  });
});
// Find a specific user
const deletedStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted succesfully',
    data: result,
  });
});

// We have to export the controller function to access from route into an object
export const StudentController = {
  getStudents,
  findASingleStudent,
  deletedStudent,
};
