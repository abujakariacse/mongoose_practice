import { TAcademicSemester } from './academicSemester.interface';
import { Semester } from './academicSemester.model';

const createAcademicSemsterIntoDB = async (payload: TAcademicSemester) => {
  const result = await Semester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemsterIntoDB,
};
