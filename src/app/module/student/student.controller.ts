import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import studentValidationSchema from './student.validation.joi';

// Controller function will call service function and it will pass req data to the service functions. It will call service function and its own function. Example in below. Then It will response the data

// Get all students
const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudents();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students retrived succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Find a specific user
const findASingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.findStudent(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student retrived succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// Find a specific user
const deletedStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student deleted succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// We have to export the controller function to access from route into an object
export const StudentController = {
  getStudents,
  findASingleStudent,
  deletedStudent,
};
