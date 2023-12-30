import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferdCorse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

const updateOfferdCorse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseIntoDB(
    id,
    req?.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered course updated successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferdCorse,
  updateOfferdCorse,
};
