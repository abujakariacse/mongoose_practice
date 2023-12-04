import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemsterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createSemester,
};
