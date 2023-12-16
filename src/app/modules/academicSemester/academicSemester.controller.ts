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

const getSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesters();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester's Retrived Successfully",
    data: result,
  });
});

const getASemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.getSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrived Successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const semsterInfo = req.body;

  const result = await AcademicSemesterServices.updateAcademicSemsterIntoDB(
    semesterId,
    semsterInfo,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Updated Successfull',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createSemester,
  getSemesters,
  getASemester,
  updateSemester,
};
