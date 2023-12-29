import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there is already a 'UPCOMING' | 'ONGOING' semester exist
  const alreadyAnUpcomingOrOngoingSemesterExist =
    await SemesterRegistration.findOne({
      $or: [
        {
          status: RegistrationStatus.UPCOMING,
        },
        {
          status: RegistrationStatus.ONGOING,
        },
      ],
    });
  if (alreadyAnUpcomingOrOngoingSemesterExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${alreadyAnUpcomingOrOngoingSemesterExist?.status} semester exist`,
    );
  }

  // Check acadmic semester is exist or not
  const isAcademicSemesterExists = AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semster doesn't exist");
  }

  // check request semester is already created
  const isSemsterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemsterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered',
    );
  }

  const result = (await SemesterRegistration.create(payload)).populate(
    'academicSemester',
  );
  return result;
};

const getAllRegisteredSemesters = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .fields()
    .pagination()
    .limit();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleRegisteredSemesterFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateRegisteredSemesterIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check request semester is exist or not
  const isSemesterExist = await SemesterRegistration.findById(id);
  if (!isSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not exist');
  }

  const currentSemesterStatus = isSemesterExist.status;
  const requestedStatus = payload?.status;

  //   check if the request semester is already ended
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING => ONGOING => ENDED

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const semesterSemesterServices = {
  createSemesterRegistrationIntoDB,
  getAllRegisteredSemesters,
  getSingleRegisteredSemesterFromDB,
  updateRegisteredSemesterIntoDB,
};
