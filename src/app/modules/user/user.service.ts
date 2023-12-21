import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUserToDB = async (password: string, payload: TStudent) => {
  // Create a user obeject to define user properties
  const userData: Partial<TUser> = {};

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // set user role
  userData.role = 'student';

  // set user password
  userData.password = password || (config.default_password as string);

  // Built in static method
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = (
      await (await Student.create(payload)).populate('admissionSemester')
    ).populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
    return newStudent;
  }
};

export const UserServices = {
  createUserToDB,
};
