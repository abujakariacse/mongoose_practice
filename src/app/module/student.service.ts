import { Student } from './student.interface';
import { StudentModel } from './student.model';

// Service function take argument from controller function and create a data using StudentModel.create(argument). Then return the result
const createUserToDB = async (student: Student) => {
  const result = StudentModel.create(student);
  return result;
};

// We have to return the function to access from controller function into an object
export const StudentServices = {
  createUserToDB,
};
