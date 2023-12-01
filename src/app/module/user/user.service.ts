import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserToDB = async (password: string, studentData: TStudent) => {
  // Create a user obeject to define user properties
  const userData: Partial<TUser> = {};

  // set manully generated id
  userData.id = '2030100001';

  // set user role
  userData.role = 'student';

  // set user password
  userData.password = password || (config.default_password as string);

  // Built in static method
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createUserToDB,
};
