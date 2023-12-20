import httpStatus from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const getFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFaculties();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties Retrived Successfully',
    data: result,
  });
});

const getFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.getAcademicFaculty(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Retrived Successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const facultyInfo = req.body;

  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    facultyInfo,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfull',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
};
