import { Student } from './student.interface';
import { StudentModel } from './student.model';

// Service function take argument from controller function and create a data using StudentModel.create(argument). Then return the result
const createUserToDB = async (studentData: Student) => {
  /* 
  // Built in static method
  const result = StudentModel.create(studentData); 
  */

  // Built in instance method
  const student = new StudentModel(studentData);
  const result = student.save();
  return result;
};

// Get all data
const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

// Get a specific user
const findStudent = async (studentId: string) => {
  const result = await StudentModel.findOne({ id: studentId });
  return result;
};

// Delete a specific user

// We have to return the function to access from controller function into an object
export const StudentServices = {
  createUserToDB,
  getAllStudents,
  findStudent,
};
