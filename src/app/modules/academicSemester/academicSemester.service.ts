import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { Semester } from './academicSemester.model';

const createAcademicSemsterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await Semester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemsterIntoDB,
};
