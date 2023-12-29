import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterSemesterServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterSemesterServices.createSemesterRegistrationIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration Successful',
    data: result,
  });
});
const getRegisterdSemestersFromDB = catchAsync(async (req, res) => {
  const result = await semesterSemesterServices.getAllRegisteredSemesters(
    req?.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registered semesters retrived successfully',
    data: result,
  });
});

const getSingleRegisterdSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterSemesterServices.getSingleRegisteredSemesterFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registered semester retrived successfully',
    data: result,
  });
});
const updateRegisterdSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await semesterSemesterServices.updateRegisteredSemesterIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registered semester updated successfully',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getRegisterdSemestersFromDB,
  getSingleRegisterdSemester,
  updateRegisterdSemester,
};
