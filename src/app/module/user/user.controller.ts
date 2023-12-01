import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // We are using try catch to prevent unwanted error
  try {
    const { password, student } = req.body;

    const result = await UserServices.createUserToDB(password, student);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
