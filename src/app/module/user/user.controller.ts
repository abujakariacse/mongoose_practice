import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // We are using try catch to prevent unwanted error
  const { password, student } = req.body;
  const result = await UserServices.createUserToDB(password, student);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
